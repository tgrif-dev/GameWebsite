package handler

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"time"
)

type tokenResponse struct {
	AccessToken string `json:"accessToken"`
}

type unityEntry struct {
	PlayerID   string  `json:"playerId"`
	PlayerName string  `json:"playerName"`
	Rank       int     `json:"rank"`
	Score      float64 `json:"score"`
}

type unityScores struct {
	Results []unityEntry `json:"results"`
}

type publicEntry struct {
	Rank  int     `json:"rank"`
	Name  string  `json:"name"`
	Score float64 `json:"score"`
}

var client = &http.Client{Timeout: 10 * time.Second}

func exchangeToken(projectID, envID, keyID, secret string) (string, error) {
	url := fmt.Sprintf("https://services.api.unity.com/auth/v1/token-exchange?projectId=%s&environmentId=%s", projectID, envID)

	req, err := http.NewRequest(http.MethodPost, url, nil)
	if err != nil {
		return "", err
	}
	req.SetBasicAuth(keyID, secret)
	req.Header.Set("Content-Type", "application/json")

	res, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer res.Body.Close()

	if res.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(res.Body)
		return "", fmt.Errorf("token exchange failed: %d %s", res.StatusCode, string(body))
	}

	var parsed tokenResponse
	if err := json.NewDecoder(res.Body).Decode(&parsed); err != nil {
		return "", err
	}
	return parsed.AccessToken, nil
}

func Handler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	projectID := os.Getenv("UNITY_PROJECT_ID")
	envID := os.Getenv("UNITY_ENV_ID")
	keyID := os.Getenv("UNITY_KEY_ID")
	secret := os.Getenv("UNITY_SECRET_KEY")
	boardID := os.Getenv("UNITY_LEADERBOARD_ID")

	if projectID == "" || envID == "" || keyID == "" || secret == "" || boardID == "" {
		http.Error(w, "Leaderboard not configured", http.StatusInternalServerError)
		return
	}

	token, err := exchangeToken(projectID, envID, keyID, secret)
	if err != nil {
		http.Error(w, "Leaderboard unavailable", http.StatusBadGateway)
		return
	}

	url := fmt.Sprintf(
		"https://services.api.unity.com/leaderboards/v1/projects/%s/environments/%s/leaderboards/%s/scores?limit=25",
		projectID, envID, boardID,
	)

	req, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		http.Error(w, "Leaderboard unavailable", http.StatusInternalServerError)
		return
	}
	req.Header.Set("Authorization", "Bearer "+token)

	res, err := client.Do(req)
	if err != nil {
		http.Error(w, "Leaderboard unavailable", http.StatusBadGateway)
		return
	}
	defer res.Body.Close()

	if res.StatusCode != http.StatusOK {
		http.Error(w, "Leaderboard unavailable", http.StatusBadGateway)
		return
	}

	var scores unityScores
	if err := json.NewDecoder(res.Body).Decode(&scores); err != nil {
		http.Error(w, "Leaderboard unavailable", http.StatusBadGateway)
		return
	}

	entries := make([]publicEntry, 0, len(scores.Results))
	for _, entry := range scores.Results {
		name := entry.PlayerName
		if name == "" {
			name = "Anonymous"
		}
		entries = append(entries, publicEntry{
			Rank:  entry.Rank + 1,
			Name:  name,
			Score: entry.Score,
		})
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Cache-Control", "public, max-age=60")
	json.NewEncoder(w).Encode(entries)
}