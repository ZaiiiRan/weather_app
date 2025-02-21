package responses

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
			Forecastday []forecastDay `json:"forecastday"`
		} `json:"forecast"`
	} `json:"forecast"`
	History []historyElement `json:"history"`
}
