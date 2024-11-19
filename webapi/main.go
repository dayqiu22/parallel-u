package main

import (
	"net/http"
	"github.com/gin-gonic/gin"
)

type Snippet struct {
	Title string `json:"title"`
	Text  string `json:"text"`
}

var snippets = []Snippet{
	{Title: "Data Science Instructor", Text: "Directed student success by teaching 60+ students how to systematically deconstruct problems including a data analytics project using real-world datasets."},
}

func getSnippets(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, snippets)
}

func main() {
	router := gin.Default()
	router.GET("/get_snippets", getSnippets)

	router.Run("localhost:8080")
}
