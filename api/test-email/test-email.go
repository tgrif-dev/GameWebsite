package handler

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"

	"inversionGameWebsite/emails"
	"inversionGameWebsite/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var mongoClient *mongo.Client

type testRequest struct {
	Email string `json:"email"`
	Slug  string `json:"slug"`
}

func Handler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "POST only", http.StatusMethodNotAllowed)
		return
	}

	adminKey := os.Getenv("ADMIN_KEY")
	if adminKey == "" || r.Header.Get("X-Admin-Key") != adminKey {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	var req testRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	req.Email = strings.TrimSpace(strings.ToLower(req.Email))
	req.Slug = strings.TrimSpace(req.Slug)

	if req.Email == "" || req.Slug == "" {
		http.Error(w, "Email and slug required", http.StatusBadRequest)
		return
	}

	client, err := getMongoClient(r.Context())
	if err != nil {
		http.Error(w, "Database connection failed", http.StatusInternalServerError)
		return
	}

	dbName := os.Getenv("MONGODB_DB")
	if dbName == "" {
		dbName = "gamewebsite"
	}

	var post models.Post
	err = client.Database(dbName).Collection("posts").
		FindOne(r.Context(), bson.M{"slug": req.Slug}).Decode(&post)
	if err == mongo.ErrNoDocuments {
		http.Error(w, "Post not found", http.StatusNotFound)
		return
	}
	if err != nil {
		http.Error(w, "Query failed", http.StatusInternalServerError)
		return
	}

	subject, htmlBody, err := emails.RenderPost(post)
	if err != nil {
		http.Error(w, "Render failed", http.StatusInternalServerError)
		return
	}

	if err := sendEmail([]string{req.Email}, subject, htmlBody); err != nil {
		http.Error(w, fmt.Sprintf("Send failed: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"ok":true}`))
}

func sendEmail(to []string, subject string, htmlBody string) error {
	apiKey := os.Getenv("RESEND_API_KEY")
	if apiKey == "" {
		return fmt.Errorf("RESEND_API_KEY not set")
	}

	payload := map[string]interface{}{
		"from":    "Inversion <onboarding@resend.dev>",
		"to":      to,
		"subject": subject,
		"html":    htmlBody,
	}

	body, err := json.Marshal(payload)
	if err != nil {
		return err
	}

	req, err := http.NewRequest("POST", "https://api.resend.com/emails", bytes.NewReader(body))
	if err != nil {
		return err
	}
	req.Header.Set("Authorization", "Bearer "+apiKey)
	req.Header.Set("Content-Type", "application/json")

	resp, err := (&http.Client{Timeout: 15 * time.Second}).Do(req)
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

func getMongoClient(ctx context.Context) (*mongo.Client, error) {
	if mongoClient != nil {
		return mongoClient, nil
	}

	uri := os.Getenv("MONGODB_URI")
	if uri == "" {
		return nil, mongo.ErrClientDisconnected
	}

	cctx, cancel := context.WithTimeout(ctx, 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(cctx, options.Client().ApplyURI(uri))
	if err != nil {
		return nil, err
	}

	mongoClient = client
	return mongoClient, nil
}