package bot

import (
	"bot/internal/dataConverter"
	"bot/internal/responses"
	"fmt"
	"log"

	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
)

func (b *Bot) handleUpdate() {
	for update := range b.updates {
		if update.Message == nil {
			continue
		}

		if update.Message.IsCommand() {
			b.handleCommand(update)
		} else {
			b.handleMessage(update)
		}
	}
}

func (b *Bot) handleCommand(update tgbotapi.Update) {
	msg := tgbotapi.NewMessage(update.Message.Chat.ID, "")

	switch update.Message.Command() {
	case "start":
		b.handleStartCommand(&msg)
	case "setcity":
		b.handleSetCity(&msg, update.Message.Chat.ID)
	case "current":
		b.getCurrentWeather(&msg, update.Message.Chat.ID)
	case "hours":
		b.getHoursWeather(&msg, update.Message.Chat.ID)
	case "daily":
		b.getDailyWeather(&msg, update.Message.Chat.ID)
	case "help":
		b.handleHelp(&msg)
	default:
		b.handleUnknownAction(&msg)
	}

	b.botInstance.Send(msg)
}

func (b *Bot) handleMessage(update tgbotapi.Update) {
	msg := tgbotapi.NewMessage(update.Message.Chat.ID, "")

	switch update.Message.Text {
	case "Текущая погода":
		b.handleSetCity(&msg, update.Message.Chat.ID)
	case "Погода на 24 часа":
		b.getCurrentWeather(&msg, update.Message.Chat.ID)
	case "Погода на несколько дней":
		b.getHoursWeather(&msg, update.Message.Chat.ID)
	case "Установить город":
		b.getDailyWeather(&msg, update.Message.Chat.ID)
	case "Помощь":
		b.handleHelp(&msg)
	default:
		b.handleDefaultMessage(&msg, update.Message.Text, update.Message.Chat.ID)
	}

	b.botInstance.Send(msg)
}

func (b *Bot) handleStartCommand(msg *tgbotapi.MessageConfig) {
	msg.Text = "Привет! Я бот погоды"
	b.botInstance.Send(b.commandsConfig)
}

func (b *Bot) handleHelp(msg *tgbotapi.MessageConfig) {
	msg.Text = "Команды бота:\n\n/setcity <Город>\t\t\t - Установка города\n\n/current\t\t\t - Получение данных о текущей погоде в установленном городе\n\n/hours\t\t\t - Получение данных о погоде в установленном городе на следующие 24 часа\n\n/daily\t\t\t - Получение данных о погоде в установленном городе за несколько дней"
}

func (b *Bot) handleUnknownAction(msg *tgbotapi.MessageConfig) {
	msg.Text = "Я не знаю эту команду :("
}

func (b *Bot) handleSetCity(msg *tgbotapi.MessageConfig, chatID int64) {
	msg.Text = "Укажите город следующим сообщением"
	b.waitingForCity[chatID] = true
}

func (b *Bot) getCurrentWeather(msg *tgbotapi.MessageConfig, chatID int64) {
	city, err := b.getCity(msg, chatID)
	if err != nil {
		return
	}

	weather, err := b.getWeather(msg, city)
	if err != nil {
		return
	}

	msg.Text = dataConverter.ConvertCurrentWeather(weather, city)
}

func (b *Bot) getHoursWeather(msg *tgbotapi.MessageConfig, chatID int64) {
	city, err := b.getCity(msg, chatID)
	if err != nil {
		return
	}

	weather, err := b.getWeather(msg, city)
	if err != nil {
		return
	}

	msg.Text = dataConverter.ConvertHoursWeather(weather, city)
}

func (b *Bot) getDailyWeather(msg *tgbotapi.MessageConfig, chatID int64) {
	city, err := b.getCity(msg, chatID)
	if err != nil {
		return
	}

	weather, err := b.getWeather(msg, city)
	if err != nil {
		return
	}

	msg.Text = dataConverter.ConvertDailyWeather(weather, city)
}

func (b *Bot) handleDefaultMessage(msg *tgbotapi.MessageConfig, text string, chatID int64) {
	if b.waitingForCity[chatID] {
		b.saveCity(msg, text, chatID)
	} else {
		b.handleUnknownAction(msg)
	}
}

func (b *Bot) saveCity(msg *tgbotapi.MessageConfig, city string, chatID int64) {
	err := b.api.SaveCity(chatID, city)
	if err != nil {
		log.Printf("Ошибка при сохранении города: %v", err)
		msg.Text = "Произошла ошибка при установке города"
	} else {
		msg.Text = fmt.Sprintf("Город установлен: %s", city)
	}
	b.waitingForCity[chatID] = false
}

func (b *Bot) getCity(msg *tgbotapi.MessageConfig, chatID int64) (string, error) {
	city, err := b.api.GetCity(chatID)
	if err != nil {
		msg.Text = "Произошла ошибка при получении данных о выбранном городе"
		return "", err
	}
	if city == "" {
		msg.Text = "Город не установлен. Используйте команду /setcity для установки"
		return "", err
	}
	return city, nil
}

func (b *Bot) getWeather(msg *tgbotapi.MessageConfig, city string) (*responses.WeatherResponse, error) {
	weather, err := b.api.GetWeather(city)
	if err != nil {
		msg.Text = "Произошла " + err.Error()
		return nil, err
	}

	return weather, nil
}
