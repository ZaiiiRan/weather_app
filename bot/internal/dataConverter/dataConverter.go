package dataConverter

import (
	"bot/internal/responses"
	"strings"
	"time"
	"fmt"
	"math"
)

func ConvertCurrentWeather(weatherResp *responses.WeatherResponse, city string) string {
	sunrise, _ := time.Parse("3:04 PM", weatherResp.Forecast.Forecast.Forecastday[0].Astro.Sunrise)
	sunset, _ := time.Parse("3:04 PM", weatherResp.Forecast.Forecast.Forecastday[0].Astro.Sunset)

	return fmt.Sprintf("Город: %s\nТекущая погода: %s\n🌡️Текущая температура: %d°C\n🌡️Ощущается как: %d°C\n🌡️Минимальная температура за день: %d°C\n🌡️Максимальная температура за день: %d°C\n💨Направление ветра: %s\n💨Скорость ветра %.1f км/ч\nАтмосферное давление: %d гПа\n💧Влажность: %d\n🌅Восход: %s\n🌇Закат: %s",
		city,
		getSkyEmoji(weatherResp.Forecast.Current.Condition.Text),
		int(math.Round(weatherResp.Forecast.Current.TempC)),
		int(math.Round(weatherResp.Forecast.Current.FeelsLike)),
		int(math.Round(weatherResp.Forecast.Forecast.Forecastday[0].Day.MinTemp)),
		int(math.Round(weatherResp.Forecast.Forecast.Forecastday[0].Day.MaxTemp)),
		convertWindDirection(weatherResp.Forecast.Current.WindDir),
		weatherResp.Forecast.Current.WindKPH,
		weatherResp.Forecast.Current.Pressure,
		int(math.Round(weatherResp.Forecast.Current.Humidity)),
		sunrise.Format("15:04"),
		sunset.Format("15:04"))
}

func ConvertHoursWeather(weatherResp *responses.WeatherResponse, city string) string {
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

func ConvertDailyWeather(weatherResp *responses.WeatherResponse, city string) string {
	if len(weatherResp.Forecast.Forecast.Forecastday) > 3 {
		date1, _ := time.Parse("2006-01-02", weatherResp.Forecast.Forecast.Forecastday[2].Date)
		date2, _ := time.Parse("2006-01-02", weatherResp.Forecast.Forecast.Forecastday[3].Date)

		return fmt.Sprintf("Город: %s\nПозавчера: %s\n\t\t\t🌡️ %d°C / %d°C\n\t\t\t💨 %s\t\t\t%.1f км/ч\n\nВчера: %s\n\t\t\t🌡️ %d°C / %d°C\n\t\t\t💨 %s\t\t\t%.1f км/ч\n\nСегодня: %s\n\t\t\t🌡️ %d°C / %d°C\n\t\t\t💨 %s\t\t\t%.1f км/ч\n\nЗавтра: %s\n\t\t\t🌡️ %d°C / %d°C\n\t\t\t💨 %s\t\t\t%.1f км/ч\n\n%s: %s\n\t\t\t🌡️ %d°C / %d°C\n\t\t\t💨 %s\t\t\t%.1f км/ч\n\n%s: %s\n\t\t\t🌡️ %d°C / %d°C\n\t\t\t💨 %s\t\t\t%.1f км/ч",
			city,
			getSkyEmoji(weatherResp.History[1].Forecast.Forecastday[0].Day.Condition.Text),
			int(math.Round(weatherResp.History[1].Forecast.Forecastday[0].Day.MaxTemp)),
			int(math.Round(weatherResp.History[1].Forecast.Forecastday[0].Day.MinTemp)),
			convertWindDirection(weatherResp.History[1].Forecast.Forecastday[0].Hour[12].WindDir),
			weatherResp.History[1].Forecast.Forecastday[0].Hour[12].WindKPH,
			getSkyEmoji(weatherResp.History[0].Forecast.Forecastday[0].Day.Condition.Text),
			int(math.Round(weatherResp.History[0].Forecast.Forecastday[0].Day.MaxTemp)),
			int(math.Round(weatherResp.History[0].Forecast.Forecastday[0].Day.MinTemp)),
			convertWindDirection(weatherResp.History[0].Forecast.Forecastday[0].Hour[12].WindDir),
			weatherResp.History[0].Forecast.Forecastday[0].Hour[12].WindKPH,
			getSkyEmoji(weatherResp.Forecast.Forecast.Forecastday[0].Day.Condition.Text),
			int(math.Round(weatherResp.Forecast.Forecast.Forecastday[0].Day.MaxTemp)),
			int(math.Round(weatherResp.Forecast.Forecast.Forecastday[0].Day.MinTemp)),
			convertWindDirection(weatherResp.Forecast.Forecast.Forecastday[0].Hour[12].WindDir),
			weatherResp.Forecast.Forecast.Forecastday[0].Hour[12].WindKPH,
			getSkyEmoji(weatherResp.Forecast.Forecast.Forecastday[1].Day.Condition.Text),
			int(math.Round(weatherResp.Forecast.Forecast.Forecastday[1].Day.MaxTemp)),
			int(math.Round(weatherResp.Forecast.Forecast.Forecastday[1].Day.MinTemp)),
			convertWindDirection(weatherResp.Forecast.Forecast.Forecastday[1].Hour[12].WindDir),
			weatherResp.Forecast.Forecast.Forecastday[1].Hour[12].WindKPH,
			date1.Format("02.01"),
			getSkyEmoji(weatherResp.Forecast.Forecast.Forecastday[2].Day.Condition.Text),
			int(math.Round(weatherResp.Forecast.Forecast.Forecastday[2].Day.MaxTemp)),
			int(math.Round(weatherResp.Forecast.Forecast.Forecastday[2].Day.MinTemp)),
			convertWindDirection(weatherResp.Forecast.Forecast.Forecastday[2].Hour[12].WindDir),
			weatherResp.Forecast.Forecast.Forecastday[2].Hour[12].WindKPH,
			date2.Format("02.01"),
			getSkyEmoji(weatherResp.Forecast.Forecast.Forecastday[3].Day.Condition.Text),
			int(math.Round(weatherResp.Forecast.Forecast.Forecastday[3].Day.MaxTemp)),
			int(math.Round(weatherResp.Forecast.Forecast.Forecastday[3].Day.MinTemp)),
			convertWindDirection(weatherResp.Forecast.Forecast.Forecastday[3].Hour[12].WindDir),
			weatherResp.Forecast.Forecast.Forecastday[3].Hour[12].WindKPH)
	} else {
		date1, _ := time.Parse("2006-01-02", weatherResp.Forecast.Forecast.Forecastday[2].Date)

		return fmt.Sprintf("Город: %s\nПозавчера: %s\n\t\t\t🌡️ %d°C / %d°C\n\t\t\t💨 %s\t\t\t%.1f км/ч\n\nВчера: %s\n\t\t\t🌡️ %d°C / %d°C\n\t\t\t💨 %s\t\t\t%.1f км/ч\n\nСегодня: %s\n\t\t\t🌡️ %d°C / %d°C\n\t\t\t💨 %s\t\t\t%.1f км/ч\n\nЗавтра: %s\n\t\t\t🌡️ %d°C / %d°C\n\t\t\t💨 %s\t\t\t%.1f км/ч\n\n%s: %s\n\t\t\t🌡️ %d°C / %d°C\n\t\t\t💨 %s\t\t\t%.1f км/ч",
			city,
			getSkyEmoji(weatherResp.History[1].Forecast.Forecastday[0].Day.Condition.Text),
			int(math.Round(weatherResp.History[1].Forecast.Forecastday[0].Day.MaxTemp)),
			int(math.Round(weatherResp.History[1].Forecast.Forecastday[0].Day.MinTemp)),
			convertWindDirection(weatherResp.History[1].Forecast.Forecastday[0].Hour[12].WindDir),
			weatherResp.History[1].Forecast.Forecastday[0].Hour[12].WindKPH,
			getSkyEmoji(weatherResp.History[0].Forecast.Forecastday[0].Day.Condition.Text),
			int(math.Round(weatherResp.History[0].Forecast.Forecastday[0].Day.MaxTemp)),
			int(math.Round(weatherResp.History[0].Forecast.Forecastday[0].Day.MinTemp)),
			convertWindDirection(weatherResp.History[0].Forecast.Forecastday[0].Hour[12].WindDir),
			weatherResp.History[0].Forecast.Forecastday[0].Hour[12].WindKPH,
			getSkyEmoji(weatherResp.Forecast.Forecast.Forecastday[0].Day.Condition.Text),
			int(math.Round(weatherResp.Forecast.Forecast.Forecastday[0].Day.MaxTemp)),
			int(math.Round(weatherResp.Forecast.Forecast.Forecastday[0].Day.MinTemp)),
			convertWindDirection(weatherResp.Forecast.Forecast.Forecastday[0].Hour[12].WindDir),
			weatherResp.Forecast.Forecast.Forecastday[0].Hour[12].WindKPH,
			getSkyEmoji(weatherResp.Forecast.Forecast.Forecastday[1].Day.Condition.Text),
			int(math.Round(weatherResp.Forecast.Forecast.Forecastday[1].Day.MaxTemp)),
			int(math.Round(weatherResp.Forecast.Forecast.Forecastday[1].Day.MinTemp)),
			convertWindDirection(weatherResp.Forecast.Forecast.Forecastday[1].Hour[12].WindDir),
			weatherResp.Forecast.Forecast.Forecastday[1].Hour[12].WindKPH,
			date1.Format("02.01"),
			getSkyEmoji(weatherResp.Forecast.Forecast.Forecastday[2].Day.Condition.Text),
			int(math.Round(weatherResp.Forecast.Forecast.Forecastday[2].Day.MaxTemp)),
			int(math.Round(weatherResp.Forecast.Forecast.Forecastday[2].Day.MinTemp)),
			convertWindDirection(weatherResp.Forecast.Forecast.Forecastday[2].Hour[12].WindDir),
			weatherResp.Forecast.Forecast.Forecastday[2].Hour[12].WindKPH)
	}
}

func convertWindDirection(windDirection string) string {
	switch windDirection {
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