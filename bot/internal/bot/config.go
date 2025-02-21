package bot

import (
	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
)

func (b *Bot) setCommandsConfig() {
	b.commandsConfig = tgbotapi.NewSetMyCommands(
		tgbotapi.BotCommand{
			Command:     "start",
			Description: "Начать работу",
		},
		tgbotapi.BotCommand{
			Command:     "current",
			Description: "Получить данные о текущей погоде в установленном городе",
		},
		tgbotapi.BotCommand{
			Command:     "hours",
			Description: "Получить данные о погоде в установленном городе на следующие 24 часа",
		},
		tgbotapi.BotCommand{
			Command:     "daily",
			Description: "Получить данные о погоде в установленном городе на несколько дней",
		},
		tgbotapi.BotCommand{
			Command:     "setcity",
			Description: "Установить город",
		},
		tgbotapi.BotCommand{
			Command:     "help",
			Description: "Помощь",
		},
	)
}

func (b *Bot) setUpdateChannelConfig() {
	b.updateConfig = tgbotapi.NewUpdate(0)
	b.updateConfig.Timeout = 60
}