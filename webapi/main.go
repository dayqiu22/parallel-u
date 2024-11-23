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

func addSnippet(c *gin.Context) {
	var newSnippet Snippet
	title := c.Query("title")
	text := c.Query("text")

	if title == "" || text == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Title or text query parameters are required"})
		return
	}

	newSnippet.Title = title
	newSnippet.Text = text

	snippets = append(snippets, newSnippet)
	c.IndentedJSON(http.StatusCreated, newSnippet)
}

func removeSnippetByTitle(c *gin.Context) {
	title := c.Query("title")
	if title == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Title query parameter is required"})
		return
	}

	for i, snippet := range snippets {
		if snippet.Title == title {
			snippets = append(snippets[:i], snippets[i+1:]...)
			c.IndentedJSON(http.StatusOK, snippets)
			return
		}
	}

	c.IndentedJSON(http.StatusNotFound, snippets)
}

func updateSnippet(c *gin.Context) {
	oldTitle := c.Query("oldTitle")
	newTitle := c.Query("newTitle")
	text := c.Query("text")

	if newTitle == "" || text == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Title or text query parameters are required"})
		return
	}

	for i, snippet := range snippets {
		if snippet.Title == oldTitle {
			snippets[i].Title = newTitle
			snippets[i].Text = text
			c.IndentedJSON(http.StatusOK, snippets)
			return
		}
	}

	c.IndentedJSON(http.StatusNotFound, snippets)
}

func main() {
	router := gin.Default()
	router.GET("/get_snippets", getSnippets)
	router.POST("/add_snippet", addSnippet)
	router.DELETE("/remove_snippet", removeSnippetByTitle)
	router.PUT("/update_snippet", updateSnippet)

	router.Run("localhost:8080")
}
