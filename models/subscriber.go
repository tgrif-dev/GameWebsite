package models

type Subscriber struct {
	Email string `bson:"email" json:"email"`
}