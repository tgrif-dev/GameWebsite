package handler

import (
	"net/http"
)

func handler(w http.ResponseWriter, r *http.Request){

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("ok"))
}