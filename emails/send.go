package emails

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"
)

const fromAddress = "Inversion <onboarding@resend.dev>"

func Send(to string, subject string, htmlBody string) error {
	payload := map[string]interface{}{
		"from":    fromAddress,
		"to":      []string{to},
		"subject": subject,
		"html":    htmlBody,
	}
	return post("https://api.resend.com/emails", payload)
}

func SendBatch(recipients []string, subject string, htmlBody string) error {
	if len(recipients) == 0 {
		return nil
	}

	batch := make([]map[string]interface{}, 0, len(recipients))
	for _, recipient := range recipients {
		batch = append(batch, map[string]interface{}{
			"from":    fromAddress,
			"to":      []string{recipient},
			"subject": subject,
			"html":    htmlBody,
		})
	}

	return post("https://api.resend.com/emails/batch", batch)
}

func post(url string, payload interface{}) error {
	apiKey := os.Getenv("RESEND_API_KEY")
	if apiKey == "" {
		return fmt.Errorf("RESEND_API_KEY not set")
	}

	body, err := json.Marshal(payload)
	if err != nil {
		return err
	}

	req, err := http.NewRequest("POST", url, bytes.NewReader(body))
	if err != nil {
		return err
	}
	req.Header.Set("Authorization", "Bearer "+apiKey)
	req.Header.Set("Content-Type", "application/json")

	resp, err := (&http.Client{Timeout: 20 * time.Second}).Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 300 {
		var out bytes.Buffer
		out.ReadFrom(resp.Body)
		return fmt.Errorf("resend %d: %s", resp.StatusCode, out.String())
	}

	return nil
}