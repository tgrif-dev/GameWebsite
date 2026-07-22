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

var client = &http.Client{Timeout: 10 * time.Second}

func Handler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "text/plain")

	projectID := os.Getenv("UNITY_PROJECT_ID")
	envID := os.Getenv("UNITY_ENV_ID")
	keyID := os.Getenv("UNITY_KEY_ID")
	secret := os.Getenv("UNITY_SECRET_KEY")
	boardID := os.Getenv("UNITY_LEADERBOARD_ID")

	fmt.Fprintf(w, "project set: %v\n", projectID != "")
	fmt.Fprintf(w, "env set: %v\n", envID != "")
	fmt.Fprintf(w, "key set: %v\n", keyID != "")
	fmt.Fprintf(w, "secret set: %v\n", secret != "")
	fmt.Fprintf(w, "board: %s\n\n", boardID)

	if projectID == "" || envID == "" || keyID == "" || secret == "" || boardID == "" {
		fmt.Fprintln(w, "STOPPED: a variable is missing")
		return
	}

	tokenURL := fmt.Sprintf("https://services.api.unity.com/auth/v1/token-exchange?projectId=%s&environmentId=%s", projectID, envID)
	tokenReq, _ := http.NewRequest(http.MethodPost, tokenURL, nil)
	tokenReq.SetBasicAuth(keyID, secret)
	tokenReq.Header.Set("Content-Type", "application/json")

	tokenRes, err := client.Do(tokenReq)
	if err != nil {
		fmt.Fprintf(w, "TOKEN REQUEST ERROR: %v\n", err)
		return
	}
	defer tokenRes.Body.Close()

	tokenBody, _ := io.ReadAll(tokenRes.Body)
	fmt.Fprintf(w, "token status: %d\n", tokenRes.StatusCode)

	if tokenRes.StatusCode != http.StatusOK {
		fmt.Fprintf(w, "token body: %s\n", string(tokenBody))
		return
	}

	var parsed tokenResponse
	if err := json.Unmarshal(tokenBody, &parsed); err != nil {
		fmt.Fprintf(w, "TOKEN PARSE ERROR: %v\nbody: %s\n", err, string(tokenBody))
		return
	}

	fmt.Fprintf(w, "token received: %v\n\n", parsed.AccessToken != "")

	scoresURL := fmt.Sprintf(
		"https://services.api.unity.com/leaderboards/v1/projects/%s/environments/%s/leaderboards/%s/scores?limit=25",
		projectID, envID, boardID,
	)

	scoresReq, _ := http.NewRequest(http.MethodGet, scoresURL, nil)
	scoresReq.Header.Set("Authorization", "Bearer "+parsed.AccessToken)

	scoresRes, err := client.Do(scoresReq)
	if err != nil {
		fmt.Fprintf(w, "SCORES REQUEST ERROR: %v\n", err)
		return
	}
	defer scoresRes.Body.Close()

	scoresBody, _ := io.ReadAll(scoresRes.Body)
	fmt.Fprintf(w, "scores status: %d\n", scoresRes.StatusCode)
	fmt.Fprintf(w, "scores body: %s\n", string(scoresBody))
}