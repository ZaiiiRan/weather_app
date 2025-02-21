package responses

type forecastDay struct {
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
	Hour []hourElement `json:"hour"`
	Date string        `json:"date"`
}
