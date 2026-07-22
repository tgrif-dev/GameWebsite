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

	scoresURL := fmt.Sprintf(
		"https://services.api.unity.com/leaderboards/v1/projects/%s/environments/%s/leaderboards/%s/scores?limit=25",
		projectID, envID, boardID,
	)

	fmt.Fprintln(w, "=== ATTEMPT 1: Basic auth directly ===")

	basicReq, _ := http.NewRequest(http.MethodGet, scoresURL, nil)
	basicReq.SetBasicAuth(keyID, secret)

	basicRes, err := client.Do(basicReq)
	if err != nil {
		fmt.Fprintf(w, "request error: %v\n", err)
	} else {
		basicBody, _ := io.ReadAll(basicRes.Body)
		basicRes.Body.Close()
		fmt.Fprintf(w, "status: %d\n", basicRes.StatusCode)
		fmt.Fprintf(w, "body: %s\n", string(basicBody))
	}

	fmt.Fprintln(w, "\n=== ATTEMPT 2: exchanged bearer token ===")

	tokenURL := fmt.Sprintf("https://services.api.unity.com/auth/v1/token-exchange?projectId=%s&environmentId=%s", projectID, envID)
	tokenReq, _ := http.NewRequest(http.MethodPost, tokenURL, nil)
	tokenReq.SetBasicAuth(keyID, secret)
	tokenReq.Header.Set("Content-Type", "application/json")

	tokenRes, err := client.Do(tokenReq)
	if err != nil {
		fmt.Fprintf(w, "token error: %v\n", err)
		return
	}
	tokenBody, _ := io.ReadAll(tokenRes.Body)
	tokenRes.Body.Close()

	var parsed tokenResponse
	json.Unmarshal(tokenBody, &parsed)

	bearerReq, _ := http.NewRequest(http.MethodGet, scoresURL, nil)
	bearerReq.Header.Set("Authorization", "Bearer "+parsed.AccessToken)

	bearerRes, err := client.Do(bearerReq)
	if err != nil {
		fmt.Fprintf(w, "request error: %v\n", err)
		return
	}
	bearerBody, _ := io.ReadAll(bearerRes.Body)
	bearerRes.Body.Close()

	fmt.Fprintf(w, "status: %d\n", bearerRes.StatusCode)
	fmt.Fprintf(w, "body: %s\n", string(bearerBody))

	fmt.Fprintln(w, "\n=== TOKEN PAYLOAD ===")
	fmt.Fprintf(w, "%s\n", string(tokenBody))
}