package main

import (
	"log"
	"os"
	"strconv"

	"bot/internal/api"
	"bot/internal/bot"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Ошибка загрузки .env файла: %s", err)
	}

	apiUrl := os.Getenv("API_URL")
	api := api.New(apiUrl)

	telegramToken := os.Getenv("TELEGRAM_TOKEN")
	debugModeString := os.Getenv("DEBUG_MODE")

	debugMode, err := strconv.ParseBool(debugModeString)
	if err != nil {
		log.Fatalf("Ошибка при определении режима дебаггинга")
	}

	bot := bot.New(telegramToken, debugMode, api)
	bot.Start()
}
