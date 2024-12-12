package main

import (
	"context"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Snippet struct {
	Title string `json:"title"`
	Text  string `json:"text"`
}

var snippets = []Snippet{
	{Title: "Data Science Instructor", Text: "Directed student success by teaching 60+ students how to systematically deconstruct problems including a data analytics project using real-world datasets."},
}

var coll *mongo.Collection
var testUsername = "test"

func getSnippets(c *gin.Context) {
	var result bson.M
	err := coll.FindOne(context.TODO(), bson.D{{"username", testUsername}}).
		Decode(&result)
	if err == mongo.ErrNoDocuments {
		return
	}
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	}

	array, ok := result["snippets"]
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "snippets field not found"})
	}

	c.IndentedJSON(http.StatusOK, array)
}

func addSnippet(c *gin.Context) {
	title := c.Query("title")
	text := c.Query("text")

	if title == "" || text == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Title or text query parameters are required"})
		return
	}

	result, err := coll.UpdateOne(
		context.TODO(),
		bson.D{{"username", testUsername}},
		bson.D{{"$push", bson.D{{"snippets", bson.D{{"title", title}, {"text", text}}}}}},
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	}
	if result.ModifiedCount == 1 {
		c.IndentedJSON(http.StatusCreated, result)
		return
	}
}

func removeSnippetByTitle(c *gin.Context) {
	title := c.Query("title")
	if title == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Title query parameter is required"})
		return
	}

	result, err := coll.UpdateOne(
		context.TODO(),
		bson.D{{"username", testUsername}},
		bson.D{{"$pull", bson.D{{"snippets", bson.D{{"title", title}}}}}},
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	}
	if result.ModifiedCount == 1 {
		c.IndentedJSON(http.StatusOK, result)
		return
	}

	c.IndentedJSON(http.StatusNotFound, result)
}

func updateSnippet(c *gin.Context) {
	oldTitle := c.Query("oldTitle")
	newTitle := c.Query("newTitle")
	text := c.Query("text")

	if newTitle == "" || text == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Title or text query parameters are required"})
		return
	}

	result, err := coll.UpdateOne(
		context.TODO(),
		bson.D{{"username", testUsername}, {"snippets.title", oldTitle}},
		bson.D{{"$set", bson.D{{"snippets.$.title", newTitle}, {"snippets.$.text", text}}}},
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	}
	if result.ModifiedCount == 1 {
		c.IndentedJSON(http.StatusOK, result)
		return
	}

	c.IndentedJSON(http.StatusNotFound, snippets)
}

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	uri := os.Getenv("MONGODB_URI")
	client, err := mongo.Connect(context.TODO(), options.Client().
		ApplyURI(uri))
	if err != nil {
		panic(err)
	}

	defer func() {
		if err := client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	coll = client.Database("Parallel-U").Collection("Users")

	router := gin.Default()
	router.GET("/get_snippets", getSnippets)
	router.POST("/add_snippet", addSnippet)
	router.DELETE("/remove_snippet", removeSnippetByTitle)
	router.PUT("/update_snippet", updateSnippet)

	router.Run("localhost:8080")
}
