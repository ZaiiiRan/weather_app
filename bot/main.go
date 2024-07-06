package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"math"
	"net/http"
	"os"
	"strings"
	"time"

	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
	"github.com/joho/godotenv"
)

const apiURL = "http://127.0.0.1:3031"

var waitingForCity = make(map[int64]bool)

type CityResponse struct {
	City string `json:"city"`
}
type HourElement struct {
	TempC     float64 `json:"temp_c"`
	WindDir   string  `json:"wind_dir"`
	WindKPH   float64 `json:"wind_kph"`
	Condition struct {
		Text  string `json:"text"`
		IsDay int8   `json:"is_day"`
	} `json:"condition"`
}
type ForecastDay struct {
	Astro struct {
		Sunrise string `json:"sunrise"`
		Sunset  string `json:"sunset"`
	} `json:"astro"`
	Day struct {
		Condition struct {
			Text  string `json:"text"`
			IsDay int8   `json:"is_day"`
		} `json:"condition"`
		MinTemp float64 `json:"mintemp_c"`
		MaxTemp float64 `json:"maxtemp_c"`
	} `json:"day"`
	Hour []HourElement `json:"hour"`
	Date string        `json:"date"`
}
type HistoryElement struct {
	Forecast struct {
		Forecastday []ForecastDay `json:"forecastday"`
	} `json:"forecast"`
}
type WeatherResponse struct {
	Forecast struct {
		Location struct {
			LocalTime string `json:"localtime"`
		} `json:"location"`
		Current struct {
			TempC     float64 `json:"temp_c"`
			WindDir   string  `json:"wind_dir"`
			WindKPH   float64 `json:"wind_kph"`
			Humidity  float64 `json:"humidity"`
			Pressure  int32   `json:"pressure_mb"`
			FeelsLike float64 `json:"feelslike_c"`
			IsDay     int8    `json:"is_day"`
			Condition struct {
				Text string `json:"text"`
			} `json:"condition"`
		} `json:"current"`
		Forecast struct {
			Forecastday []ForecastDay `json:"forecastday"`
		} `json:"forecast"`
	} `json:"forecast"`
	History []HistoryElement `json:"history"`
}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Ошибка загрузки .env файла: %s", err)
	}

	telegramToken := os.Getenv("TELEGRAM_TOKEN")

	bot, err := tgbotapi.NewBotAPI(telegramToken)
	if err != nil {
		log.Panic(err)
	}

	bot.Debug = true

	log.Printf("Авторизация %s", bot.Self.UserName)

	cmdCfg := tgbotapi.NewSetMyCommands(
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

	u := tgbotapi.NewUpdate(0)
	u.Timeout = 60

	updates := bot.GetUpdatesChan(u)

	for update := range updates {
		if update.Message == nil {
			continue
		}

		if update.Message.IsCommand() {
			msg := tgbotapi.NewMessage(update.Message.Chat.ID, "")
			switch update.Message.Command() {
			case "start":
				msg.Text = "Привет! Я бот погоды"
				bot.Send(cmdCfg)
			case "setcity":
				msg.Text = "Укажите город следующим сообщением"
				waitingForCity[update.Message.Chat.ID] = true
			case "current":
				city, err := getCity(update.Message.Chat.ID)
				if err == nil {
					if city == "" {
						msg.Text = "Город не установлен. Используйте команду /setcity для установки"
					} else {
						msg.Text = getCurrentWeather(city)
					}
				}
			case "hours":
				city, err := getCity(update.Message.Chat.ID)
				if err == nil {
					if city == "" {
						msg.Text = "Город не установлен. Используйте команду /setcity для установки"
					} else {
						msg.Text = getHoursWeather(city)
					}
				}
			case "daily":
				city, err := getCity(update.Message.Chat.ID)
				if err == nil {
					if city == "" {
						msg.Text = "Город не установлен. Используйте команду /setcity для установки"
					} else {
						msg.Text = getDailyWeather(city)
					}
				}
			case "help":
				msg.Text = "Команды бота:\n\n/setcity <Город>\t\t\t - Установка города\n\n/current\t\t\t - Получение данных о текущей погоде в установленном городе\n\n/hours\t\t\t - Получение данных о погоде в установленном городе на следующие 24 часа\n\n/daily\t\t\t - Получение данных о погоде в установленном городе за несколько дней"
			default:
				msg.Text = "Я не знаю эту команду :("
			}
			bot.Send(msg)
		} else {
			msg := tgbotapi.NewMessage(update.Message.Chat.ID, "")
			switch update.Message.Text {
			case "Текущая погода":
				city, err := getCity(update.Message.Chat.ID)
				if err == nil {
					if city == "" {
						msg.Text = "Город не установлен. Используйте команду /setcity для установки"
					} else {
						msg.Text = getCurrentWeather(city)
					}
				}
			case "Погода на 24 часа":
				city, err := getCity(update.Message.Chat.ID)
				if err == nil {
					if city == "" {
						msg.Text = "Город не установлен. Используйте команду /setcity для установки"
					} else {
						msg.Text = getHoursWeather(city)
					}
				}
			case "Погода на несколько дней":
				city, err := getCity(update.Message.Chat.ID)
				if err == nil {
					if city == "" {
						msg.Text = "Город не установлен. Используйте команду /setcity для установки"
					} else {
						msg.Text = getDailyWeather(city)
					}
				}
			case "Установить город":
				msg.Text = "Укажите город следующим сообщением"
				waitingForCity[update.Message.Chat.ID] = true
			case "Помощь":
				msg.Text = "Команды бота:\n\n/setcity <Город>\t\t\t - Установка города\n\n/current\t\t\t - Получение данных о текущей погоде в установленном городе\n\n/hours\t\t\t - Получение данных о погоде в установленном городе на следующие 24 часа\n\n/daily\t\t\t - Получение данных о погоде в установленном городе за несколько дней"
			default:
				if waitingForCity[update.Message.Chat.ID] {
					city := update.Message.Text
					err := saveCity(update.Message.Chat.ID, city)
					if err != nil {
						log.Printf("Ошибка при сохранении города: %v", err)
						msg.Text = "Произошла ошибка при установке города"
					} else {
						log.Printf("Город успешно установлен: %s", city)
						msg.Text = fmt.Sprintf("Город установлен: %s", city)
					}
					waitingForCity[update.Message.Chat.ID] = false
				} else {
					msg.Text = "Я не знаю эту команду :("
				}
			}
			bot.Send(msg)
		}
	}
}

func getCurrentWeather(city string) string {
	url := fmt.Sprintf("%s/weather/%s", apiURL, city)
	resp, err := http.Get(url)
	if err != nil {
		return "Ошибка при получении данных о текущей погоде"
	}
	defer resp.Body.Close()

	if resp.StatusCode == http.StatusBadRequest {
		return "Город не найден"
	}

	var weatherResp WeatherResponse
	if err := json.NewDecoder(resp.Body).Decode(&weatherResp); err != nil {
		return "Ошибка при обработке данных о текущей погоде"
	}

	sunrise, _ := time.Parse("3:04 PM", weatherResp.Forecast.Forecast.Forecastday[0].Astro.Sunrise)
	sunset, _ := time.Parse("3:04 PM", weatherResp.Forecast.Forecast.Forecastday[0].Astro.Sunset)

	return fmt.Sprintf("Город: %s\nТекущая погода: %s\n🌡️Текущая температура: %d°C\n🌡️Ощущается как: %d°C\n🌡️Минимальная температура за день: %d°C\n🌡️Максимальная температура за день: %d°C\n💨Направление ветра: %s\n💨Скорость ветра %.1f км/ч\nАтмосферное давление: %d гПа\n💧Влажность: %d\n🌅Восход: %s\n🌇Закат: %s",
		city,
		getSkyEmoji(weatherResp.Forecast.Current.Condition.Text),
		int(math.Round(weatherResp.Forecast.Current.TempC)),
		int(math.Round(weatherResp.Forecast.Current.FeelsLike)),
		int(math.Round(weatherResp.Forecast.Forecast.Forecastday[0].Day.MinTemp)),
		int(math.Round(weatherResp.Forecast.Forecast.Forecastday[0].Day.MaxTemp)),
		convertWindDir(weatherResp.Forecast.Current.WindDir),
		weatherResp.Forecast.Current.WindKPH,
		weatherResp.Forecast.Current.Pressure,
		int(math.Round(weatherResp.Forecast.Current.Humidity)),
		sunrise.Format("15:04"),
		sunset.Format("15:04"))
}

func getHoursWeather(city string) string {
	url := fmt.Sprintf("%s/weather/%s", apiURL, city)
	resp, err := http.Get(url)
	if err != nil {
		return "Ошибка при получении данных о часовой погоде"
	}
	defer resp.Body.Close()

	if resp.StatusCode == http.StatusBadRequest {
		return "Город не найден"
	}

	var weatherResp WeatherResponse
	if err := json.NewDecoder(resp.Body).Decode(&weatherResp); err != nil {
		return "Ошибка при обработке данных о часовой погоде"
	}

	var builder strings.Builder
	now, _ := time.Parse("2006-01-02T15:04:05Z", weatherResp.Forecast.Location.LocalTime)
	nowHour := now.Hour()

	for i := nowHour; i <= 23; i++ {
		timeStr := fmt.Sprintf("%02d:00", i)
		temp := int(math.Round(weatherResp.Forecast.Forecast.Forecastday[0].Hour[i].TempC))
		skyEmoji := getSkyEmoji(weatherResp.Forecast.Forecast.Forecastday[0].Hour[i].Condition.Text)
		builder.WriteString(fmt.Sprintf("%s:\t\t %d°C \t\t%s\n\n", timeStr, temp, skyEmoji))
	}

	for i := 0; i < nowHour; i++ {
		timeStr := fmt.Sprintf("%02d:00", i)
		temp := int(math.Round(weatherResp.Forecast.Forecast.Forecastday[1].Hour[i].TempC))
		skyEmoji := getSkyEmoji(weatherResp.Forecast.Forecast.Forecastday[1].Hour[i].Condition.Text)
		builder.WriteString(fmt.Sprintf("%s:\t\t %d°C \t\t%s\n\n", timeStr, temp, skyEmoji))
	}

	return fmt.Sprintf("Город: %s\n%s",
		city, builder.String())
}

func getDailyWeather(city string) string {
	url := fmt.Sprintf("%s/weather/%s", apiURL, city)
	resp, err := http.Get(url)
	if err != nil {
		return "Ошибка при получении данных о погоде"
	}
	defer resp.Body.Close()

	if resp.StatusCode == http.StatusBadRequest {
		return "Город не найден"
	}

	var weatherResp WeatherResponse
	if err := json.NewDecoder(resp.Body).Decode(&weatherResp); err != nil {
		return "Ошибка при обработке данных о погоде"
	}

	if len(weatherResp.Forecast.Forecast.Forecastday) > 3 {
		date1, _ := time.Parse("2006-01-02", weatherResp.Forecast.Forecast.Forecastday[2].Date)
		date2, _ := time.Parse("2006-01-02", weatherResp.Forecast.Forecast.Forecastday[3].Date)

		return fmt.Sprintf("Город: %s\nПозавчера: %s\n\t\t\t🌡️ %d°C / %d°C\n\t\t\t💨 %s\t\t\t%.1f км/ч\n\nВчера: %s\n\t\t\t🌡️ %d°C / %d°C\n\t\t\t💨 %s\t\t\t%.1f км/ч\n\nСегодня: %s\n\t\t\t🌡️ %d°C / %d°C\n\t\t\t💨 %s\t\t\t%.1f км/ч\n\nЗавтра: %s\n\t\t\t🌡️ %d°C / %d°C\n\t\t\t💨 %s\t\t\t%.1f км/ч\n\n%s: %s\n\t\t\t🌡️ %d°C / %d°C\n\t\t\t💨 %s\t\t\t%.1f км/ч\n\n%s: %s\n\t\t\t🌡️ %d°C / %d°C\n\t\t\t💨 %s\t\t\t%.1f км/ч",
			city,
			getSkyEmoji(weatherResp.History[1].Forecast.Forecastday[0].Day.Condition.Text),
			int(math.Round(weatherResp.History[1].Forecast.Forecastday[0].Day.MaxTemp)),
			int(math.Round(weatherResp.History[1].Forecast.Forecastday[0].Day.MinTemp)),
			convertWindDir(weatherResp.History[1].Forecast.Forecastday[0].Hour[12].WindDir),
			weatherResp.History[1].Forecast.Forecastday[0].Hour[12].WindKPH,
			getSkyEmoji(weatherResp.History[0].Forecast.Forecastday[0].Day.Condition.Text),
			int(math.Round(weatherResp.History[0].Forecast.Forecastday[0].Day.MaxTemp)),
			int(math.Round(weatherResp.History[0].Forecast.Forecastday[0].Day.MinTemp)),
			convertWindDir(weatherResp.History[0].Forecast.Forecastday[0].Hour[12].WindDir),
			weatherResp.History[0].Forecast.Forecastday[0].Hour[12].WindKPH,
			getSkyEmoji(weatherResp.Forecast.Forecast.Forecastday[0].Day.Condition.Text),
			int(math.Round(weatherResp.Forecast.Forecast.Forecastday[0].Day.MaxTemp)),
			int(math.Round(weatherResp.Forecast.Forecast.Forecastday[0].Day.MinTemp)),
			convertWindDir(weatherResp.Forecast.Forecast.Forecastday[0].Hour[12].WindDir),
			weatherResp.Forecast.Forecast.Forecastday[0].Hour[12].WindKPH,
			getSkyEmoji(weatherResp.Forecast.Forecast.Forecastday[1].Day.Condition.Text),
			int(math.Round(weatherResp.Forecast.Forecast.Forecastday[1].Day.MaxTemp)),
			int(math.Round(weatherResp.Forecast.Forecast.Forecastday[1].Day.MinTemp)),
			convertWindDir(weatherResp.Forecast.Forecast.Forecastday[1].Hour[12].WindDir),
			weatherResp.Forecast.Forecast.Forecastday[1].Hour[12].WindKPH,
			date1.Format("02.01"),
			getSkyEmoji(weatherResp.Forecast.Forecast.Forecastday[2].Day.Condition.Text),
			int(math.Round(weatherResp.Forecast.Forecast.Forecastday[2].Day.MaxTemp)),
			int(math.Round(weatherResp.Forecast.Forecast.Forecastday[2].Day.MinTemp)),
			convertWindDir(weatherResp.Forecast.Forecast.Forecastday[2].Hour[12].WindDir),
			weatherResp.Forecast.Forecast.Forecastday[2].Hour[12].WindKPH,
			date2.Format("02.01"),
			getSkyEmoji(weatherResp.Forecast.Forecast.Forecastday[3].Day.Condition.Text),
			int(math.Round(weatherResp.Forecast.Forecast.Forecastday[3].Day.MaxTemp)),
			int(math.Round(weatherResp.Forecast.Forecast.Forecastday[3].Day.MinTemp)),
			convertWindDir(weatherResp.Forecast.Forecast.Forecastday[3].Hour[12].WindDir),
			weatherResp.Forecast.Forecast.Forecastday[3].Hour[12].WindKPH)
	} else {
		date1, _ := time.Parse("2006-01-02", weatherResp.Forecast.Forecast.Forecastday[2].Date)

		return fmt.Sprintf("Город: %s\nПозавчера: %s\n\t\t\t🌡️ %d°C / %d°C\n\t\t\t💨 %s\t\t\t%.1f км/ч\n\nВчера: %s\n\t\t\t🌡️ %d°C / %d°C\n\t\t\t💨 %s\t\t\t%.1f км/ч\n\nСегодня: %s\n\t\t\t🌡️ %d°C / %d°C\n\t\t\t💨 %s\t\t\t%.1f км/ч\n\nЗавтра: %s\n\t\t\t🌡️ %d°C / %d°C\n\t\t\t💨 %s\t\t\t%.1f км/ч\n\n%s: %s\n\t\t\t🌡️ %d°C / %d°C\n\t\t\t💨 %s\t\t\t%.1f км/ч",
			city,
			getSkyEmoji(weatherResp.History[1].Forecast.Forecastday[0].Day.Condition.Text),
			int(math.Round(weatherResp.History[1].Forecast.Forecastday[0].Day.MaxTemp)),
			int(math.Round(weatherResp.History[1].Forecast.Forecastday[0].Day.MinTemp)),
			convertWindDir(weatherResp.History[1].Forecast.Forecastday[0].Hour[12].WindDir),
			weatherResp.History[1].Forecast.Forecastday[0].Hour[12].WindKPH,
			getSkyEmoji(weatherResp.History[0].Forecast.Forecastday[0].Day.Condition.Text),
			int(math.Round(weatherResp.History[0].Forecast.Forecastday[0].Day.MaxTemp)),
			int(math.Round(weatherResp.History[0].Forecast.Forecastday[0].Day.MinTemp)),
			convertWindDir(weatherResp.History[0].Forecast.Forecastday[0].Hour[12].WindDir),
			weatherResp.History[0].Forecast.Forecastday[0].Hour[12].WindKPH,
			getSkyEmoji(weatherResp.Forecast.Forecast.Forecastday[0].Day.Condition.Text),
			int(math.Round(weatherResp.Forecast.Forecast.Forecastday[0].Day.MaxTemp)),
			int(math.Round(weatherResp.Forecast.Forecast.Forecastday[0].Day.MinTemp)),
			convertWindDir(weatherResp.Forecast.Forecast.Forecastday[0].Hour[12].WindDir),
			weatherResp.Forecast.Forecast.Forecastday[0].Hour[12].WindKPH,
			getSkyEmoji(weatherResp.Forecast.Forecast.Forecastday[1].Day.Condition.Text),
			int(math.Round(weatherResp.Forecast.Forecast.Forecastday[1].Day.MaxTemp)),
			int(math.Round(weatherResp.Forecast.Forecast.Forecastday[1].Day.MinTemp)),
			convertWindDir(weatherResp.Forecast.Forecast.Forecastday[1].Hour[12].WindDir),
			weatherResp.Forecast.Forecast.Forecastday[1].Hour[12].WindKPH,
			date1.Format("02.01"),
			getSkyEmoji(weatherResp.Forecast.Forecast.Forecastday[2].Day.Condition.Text),
			int(math.Round(weatherResp.Forecast.Forecast.Forecastday[2].Day.MaxTemp)),
			int(math.Round(weatherResp.Forecast.Forecast.Forecastday[2].Day.MinTemp)),
			convertWindDir(weatherResp.Forecast.Forecast.Forecastday[2].Hour[12].WindDir),
			weatherResp.Forecast.Forecast.Forecastday[2].Hour[12].WindKPH)
	}

}

func convertWindDir(windDir string) string {
	switch windDir {
	case "N":
		return "С"
	case "NNE":
		return "С"
	case "NE":
		return "С-В"
	case "ENE":
		return "В"
	case "E":
		return "В"
	case "ESE":
		return "В"
	case "SE":
		return "Ю-В"
	case "SSE":
		return "Ю"
	case "S":
		return "Ю"
	case "SSW":
		return "Ю"
	case "SW":
		return "Ю-З"
	case "WSW":
		return "З"
	case "W":
		return "З"
	case "WNW":
		return "З"
	case "NW":
		return "С-З"
	case "NNW":
		return "С"
	default:
		return ""
	}
}

func getSkyEmoji(condition string) string {
	condition = strings.TrimSpace(condition)
	var emoji string
	switch condition {
	case "Clear":
		emoji = "🌙"
	case "Sunny":
		emoji = "☀️"
	case "Partly cloudy":
		emoji = "⛅"
	case "Partly Cloudy":
		emoji = "⛅"
	case "Cloudy":
		emoji = "☁️"
	case "Overcast":
		emoji = "☁️"
	case "Rain":
		emoji = "🌧️"
	case "Patchy light drizzle":
		emoji = "🌧️"
	case "Light drizzle":
		emoji = "🌧️"
	case "Freezing drizzle":
		emoji = "🌧️"
	case "Patchy light rain":
		emoji = "🌧️"
	case "Light rain":
		emoji = "🌧️"
	case "Moderate rain":
		emoji = "🌧️"
	case "Moderate rain at times":
		emoji = "🌧️"
	case "Light rain shower":
		emoji = "🌧️"
	case "Light freezing rain":
		emoji = "🌧️"
	case "Patchy rain nearby":
		emoji = "🌧️"
	case "Light sleet":
		emoji = "🌧️"
	case "Light sleet showers":
		emoji = "🌧️"
	case "Heavy freezing drizzle":
		emoji = "🌧️"
	case "Moderate or heavy rain shower":
		emoji = "🌧️"
	case "Torrential rain shower":
		emoji = "🌧️"
	case "Moderate or heavy sleet":
		emoji = "🌧️"
	case "Patchy rain possible":
		emoji = "🌧️"
	case "Patchy freezing drizzle possible":
		emoji = "🌧️"
	case "Heavy rain at times":
		emoji = "🌧️"
	case "Heavy rain":
		emoji = "🌧️"
	case "Moderate or heavy freezing rain":
		emoji = "🌧️"
	case "Thunderstorm":
		emoji = "🌩️"
	case "Patchy light rain with thunder":
		emoji = "🌩️"
	case "Moderate or heavy rain with thunder":
		emoji = "🌩️"
	case "Patchy light snow with thunder":
		emoji = "🌩️"
	case "Moderate or heavy snow with thunder":
		emoji = "🌩️"
	case "Thundery outbreaks possible":
		emoji = "🌩️"
	case "Thundery outbreaks in nearby":
		emoji = "🌩️"
	case "Patchy snow possible":
		emoji = "🌨️"
	case "Snow":
		emoji = "🌨️"
	case "Patchy snow nearby":
		emoji = "🌨️"
	case "Patchy light snow":
		emoji = "🌨️"
	case "Moderate or heavy sleet showers":
		emoji = "🌨️"
	case "Light snow showers":
		emoji = "🌨️"
	case "Moderate or heavy snow showers":
		emoji = "🌨️"
	case "Light showers of ice pellets":
		emoji = "🌨️"
	case "Moderate or heavy showers of ice pellets":
		emoji = "🌨️"
	case "Light snow":
		emoji = "🌨️"
	case "Patchy moderate snow":
		emoji = "🌨️"
	case "Moderate snow":
		emoji = "🌨️"
	case "Patchy heavy snow":
		emoji = "🌨️"
	case "Heavy snow":
		emoji = "🌨️"
	case "Ice pellets":
		emoji = "🌨️"
	case "Blowing snow":
		emoji = "🌨️"
	case "Blizzard":
		emoji = "🌨️"
	case "Mist":
		emoji = "🌫️"
	case "Fog":
		emoji = "🌫️"
	case "Freezing fog":
		emoji = "🌫️"
	case "Dust":
		emoji = "🌫️"
	case "Smoke":
		emoji = "🌫️"
	default:
		emoji = ""
	}
	return emoji
}

func saveCity(chatID int64, city string) error {
	url := fmt.Sprintf("%s/saveCity", apiURL)
	data := map[string]interface{}{"chat_id": chatID, "city": city, "pass": os.Getenv("BOT_PASSWORD")}
	jsonData, err := json.Marshal(data)
	if err != nil {
		return err
	}

	resp, err := http.Post(url, "application/json", bytes.NewBuffer(jsonData))
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("статус код: %d", resp.StatusCode)
	}

	return nil
}

func getCity(chatID int64) (string, error) {
	url := fmt.Sprintf("%s/getCity", apiURL)
	data := map[string]interface{}{"chat_id": chatID, "pass": os.Getenv("BOT_PASSWORD")}
	jsonData, err := json.Marshal(data)
	if err != nil {
		return "", fmt.Errorf("ошибка при кодировании данных: %s", err)
	}

	resp, err := http.Post(url, "application/json", bytes.NewBuffer(jsonData))
	if err != nil {
		return "", fmt.Errorf("ошибка при отправке запроса: %s", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK && resp.StatusCode != http.StatusNotFound {
		return "", fmt.Errorf("статус код: %d", resp.StatusCode)
	}

	if resp.StatusCode == http.StatusNotFound {
		return "", nil
	}

	var cityResp CityResponse
	if err := json.NewDecoder(resp.Body).Decode(&cityResp); err != nil {
		return "", fmt.Errorf("ошибка при обработке ответа")
	}

	return cityResp.City, nil
}
