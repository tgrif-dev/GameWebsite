package handler

import (
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

const maxRecipients = 50

type broadcastRequest struct {
	Slug string `json:"slug"`
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

	var req broadcastRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	req.Slug = strings.TrimSpace(req.Slug)
	if req.Slug == "" {
		http.Error(w, "Slug required", http.StatusBadRequest)
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

	db := client.Database(dbName)

	var post models.Post
	err = db.Collection("posts").
		FindOne(r.Context(), bson.M{"slug": req.Slug, "published": true}).Decode(&post)
	if err == mongo.ErrNoDocuments {
		http.Error(w, "Post not found or not published", http.StatusNotFound)
		return
	}
	if err != nil {
		http.Error(w, "Query failed", http.StatusInternalServerError)
		return
	}

	cursor, err := db.Collection("subscribers").Find(r.Context(), bson.M{})
	if err != nil {
		http.Error(w, "Query failed", http.StatusInternalServerError)
		return
	}
	defer cursor.Close(r.Context())

	var subscribers []models.Subscriber
	if err := cursor.All(r.Context(), &subscribers); err != nil {
		http.Error(w, "Decode failed", http.StatusInternalServerError)
		return
	}

	recipients := make([]string, 0, len(subscribers))
	for _, subscriber := range subscribers {
		if subscriber.Email != "" {
			recipients = append(recipients, subscriber.Email)
		}
	}

	if len(recipients) == 0 {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"ok":true,"sent":0}`))
		return
	}

	if len(recipients) > maxRecipients {
		http.Error(w, fmt.Sprintf("Refusing to send to %d recipients (limit %d)", len(recipients), maxRecipients), http.StatusBadRequest)
		return
	}

	subject, htmlBody, err := emails.RenderPost(post)
	if err != nil {
		http.Error(w, "Render failed", http.StatusInternalServerError)
		return
	}

	if err := emails.SendBatch(recipients, subject, htmlBody); err != nil {
		http.Error(w, fmt.Sprintf("Send failed: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(fmt.Sprintf(`{"ok":true,"sent":%d}`, len(recipients))))
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

	client, err := mongo.Connect(cctx, options.Client().ApplyURI(uri).SetMaxPoolSize(5))
	if err != nil {
		return nil, err
	}

	mongoClient = client
	return mongoClient, nil
}