package handler

import (
	"context"
	"encoding/json"
	"net/http"
	"os"
	"strings"
	"time"

	"inversionGameWebsite/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var mongoClient *mongo.Client

func Handler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, X-Admin-Key")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusNoContent)
		return
	}

	if r.Method != http.MethodGet && r.Method != http.MethodPost {
		http.Error(w, "GET or POST only", http.StatusMethodNotAllowed)
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

	collection := client.Database(dbName).Collection("posts")

	if r.Method == http.MethodPost {
		createPost(w, r, collection)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	slug := r.URL.Query().Get("slug")

	if slug != "" {
		var post models.Post
		err := collection.FindOne(r.Context(), bson.M{"slug": slug, "published": true}).Decode(&post)
		if err == mongo.ErrNoDocuments {
			http.Error(w, "Post not found", http.StatusNotFound)
			return
		}
		if err != nil {
			http.Error(w, "Query failed", http.StatusInternalServerError)
			return
		}
		json.NewEncoder(w).Encode(post)
		return
	}

	opts := options.Find().
		SetSort(bson.D{{Key: "publishedAt", Value: -1}}).
		SetProjection(bson.M{"body": 0})

	cursor, err := collection.Find(r.Context(), bson.M{"published": true}, opts)
	if err != nil {
		http.Error(w, "Query failed", http.StatusInternalServerError)
		return
	}
	defer cursor.Close(r.Context())

	posts := []models.Post{}
	if err := cursor.All(r.Context(), &posts); err != nil {
		http.Error(w, "Decode failed", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(posts)
}

func createPost(w http.ResponseWriter, r *http.Request, collection *mongo.Collection) {
	adminKey := os.Getenv("ADMIN_KEY")
	if adminKey == "" || r.Header.Get("X-Admin-Key") != adminKey {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	var post models.Post
	if err := json.NewDecoder(r.Body).Decode(&post); err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	post.Slug = strings.TrimSpace(strings.ToLower(post.Slug))
	post.Title = strings.TrimSpace(post.Title)
	post.Excerpt = strings.TrimSpace(post.Excerpt)
	post.CoverImage = strings.TrimSpace(post.CoverImage)

	if post.Slug == "" || post.Title == "" || post.Body == "" {
		http.Error(w, "Slug, title and body required", http.StatusBadRequest)
		return
	}

	if post.PublishedAt.IsZero() {
		post.PublishedAt = time.Now().UTC()
	}

	if post.Tags == nil {
		post.Tags = []string{}
	}

	post.Published = false

	_, err := collection.InsertOne(r.Context(), post)
	if mongo.IsDuplicateKeyError(err) {
		http.Error(w, "A post with that slug already exists", http.StatusConflict)
		return
	}
	if err != nil {
		http.Error(w, "Insert failed", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"slug": post.Slug})
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