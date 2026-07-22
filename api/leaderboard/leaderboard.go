package handler

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"
)

type unityEntry struct {
	PlayerID string  `json:"playerId"`
	Rank     int     `json:"rank"`
	Score    float64 `json:"score"`
}

type unityScores struct {
	Results []unityEntry `json:"results"`
	Total   int          `json:"total"`
}

type publicEntry struct {
	Rank int     `json:"rank"`
	Name string  `json:"name"`
	Time float64 `json:"time"`
}

type publicResponse struct {
	Entries []publicEntry `json:"entries"`
	Total   int           `json:"total"`
}

var client = &http.Client{Timeout: 10 * time.Second}

func shortID(id string) string {
	runes := []rune(id)
	if len(runes) <= 6 {
		return string(runes)
	}
	return string(runes[:6])
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

	url := fmt.Sprintf(
		"https://services.api.unity.com/leaderboards/v1/projects/%s/environments/%s/leaderboards/%s/scores?limit=20",
		projectID, envID, boardID,
	)

	req, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		http.Error(w, "Leaderboard unavailable", http.StatusInternalServerError)
		return
	}
	req.SetBasicAuth(keyID, secret)

	res, err := client.Do(req)
	if err != nil {
		http.Error(w, "Leaderboard unavailable", http.StatusBadGateway)
		return
	}
	defer res.Body.Close()

	if res.StatusCode < 200 || res.StatusCode > 299 {
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
		name := shortID(entry.PlayerID)
		if name == "" {
			name = "unknown"
		}
		entries = append(entries, publicEntry{
			Rank: entry.Rank + 1,
			Name: name,
			Time: entry.Score,
		})
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Cache-Control", "public, max-age=60")
	json.NewEncoder(w).Encode(publicResponse{Entries: entries, Total: scores.Total})
}