package bot

import (
	"bot/internal/api"

	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
)

type Bot struct {
	token          string
	isDebugging    bool
	api            *api.API
	waitingForCity map[int64]bool
	commandsConfig tgbotapi.SetMyCommandsConfig
	updateConfig   tgbotapi.UpdateConfig
	updates        tgbotapi.UpdatesChannel
	botInstance    *tgbotapi.BotAPI
}

func New(token string, isDebugging bool, api *api.API) *Bot {
	bot := &Bot{token: token, isDebugging: isDebugging, api: api}
	bot.waitingForCity = make(map[int64]bool)
	bot.setCommandsConfig()
	bot.setUpdateChannelConfig()
	return bot
}

func (b *Bot) Start() error {
	var err error
	b.botInstance, err = tgbotapi.NewBotAPI(b.token)
	if err != nil {
		return err
	}

	b.botInstance.Debug = b.isDebugging
	b.updates = b.botInstance.GetUpdatesChan(b.updateConfig)

	b.handleUpdate()

	return nil
}
