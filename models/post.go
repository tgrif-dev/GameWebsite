package models


type Post struct {
	Slug        string    `bson:"slug" json:"slug"`
	Title       string    `bson:"title" json:"title"`
	Excerpt     string    `bson:"excerpt" json:"excerpt"`
	CoverImage  string    `bson:"coverImage" json:"coverImage"`
	Tags        []string  `bson:"tags" json:"tags"`
	PublishedAt string `bson:"publishedAt" json:"publishedAt"`
	Published   bool      `bson:"published" json:"-"`
	Body        string    `bson:"body" json:"body"`
}