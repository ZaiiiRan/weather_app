package responses

type hourElement struct {
	TempC     float64 `json:"temp_c"`
	WindDir   string  `json:"wind_dir"`
	WindKPH   float64 `json:"wind_kph"`
	Condition struct {
		Text  string `json:"text"`
		IsDay int8   `json:"is_day"`
	} `json:"condition"`
}
