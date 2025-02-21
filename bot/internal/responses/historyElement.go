package responses

type historyElement struct {
	Forecast struct {
		Forecastday []forecastDay `json:"forecastday"`
	} `json:"forecast"`
}
