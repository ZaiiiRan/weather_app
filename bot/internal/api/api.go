package api

import (
	"bot/internal/responses"
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"os"
)

type API struct {
	url string
}

func New(url string) *API {
	return &API{url: url}
}

func (api *API) SaveCity(chatID int64, city string) error {
	url := fmt.Sprintf("%s/bot/city/save", api.url)
	data := map[string]interface{}{"chat_id": chatID, "city": city, "pass": os.Getenv("BOT_PASSWORD")}
	jsonData, err := json.Marshal(data)
	if err != nil {
		return api.formatEncodingError(err)
	}

	resp, err := http.Post(url, "application/json", bytes.NewBuffer(jsonData))
	if err != nil {
		return api.formatSendingRequestError(err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return api.formatNotOkStatus(resp.StatusCode)
	}

	return nil
}

func (api *API) GetCity(chatID int64) (string, error) {
	url := fmt.Sprintf("%s/bot/city/get", api.url)
	data := map[string]interface{}{"chat_id": chatID, "pass": os.Getenv("BOT_PASSWORD")}
	jsonData, err := json.Marshal(data)
	if err != nil {
		return "", api.formatEncodingError(err)
	}

	resp, err := http.Post(url, "application/json", bytes.NewBuffer(jsonData))
	if err != nil {
		return "", api.formatSendingRequestError(err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK && resp.StatusCode != http.StatusNotFound {
		return "", api.formatNotOkStatus(resp.StatusCode)
	}

	if resp.StatusCode == http.StatusNotFound {
		return "", nil
	}

	var cityResp responses.CityResponse
	if err := json.NewDecoder(resp.Body).Decode(&cityResp); err != nil {
		return "", errors.New("ошибка при обработке ответа")
	}

	return cityResp.City, nil
}

func (api *API) GetWeather(city string) (*responses.WeatherResponse, error) {
	url := fmt.Sprintf("%s/weather/%s", api.url, city)
	resp, err := http.Get(url)
	if err != nil {
		return nil, errors.New("ошибка при получении данных о погоде")
	}
	defer resp.Body.Close()

	if resp.StatusCode == http.StatusBadRequest {
		return nil, errors.New("ошибка: город не найден")
	}

	var weatherResp responses.WeatherResponse
	if err := json.NewDecoder(resp.Body).Decode(&weatherResp); err != nil {
		return nil, errors.New("ошибка при обработке данных о погоде")
	}

	return &weatherResp, nil
}

func (api *API) formatEncodingError(err error) error {
	return fmt.Errorf("ошибка при кодировании данных: %s", err)
}

func (api *API) formatSendingRequestError(err error) error {
	return fmt.Errorf("ошибка при отправке запроса: %s", err)
}

func (api *API) formatNotOkStatus(statusCode int) error {
	return fmt.Errorf("ошибка: статус код %d", statusCode)
}
