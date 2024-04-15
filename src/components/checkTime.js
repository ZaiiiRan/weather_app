export default function checkTime(sunriseUTC, sunsetUTC, currentTime)  {
    const sunrise = new Date(sunriseUTC * 1000).getTime()
    const sunset = new Date (sunsetUTC * 1000).getTime()
    return currentTime >= sunrise && currentTime <= sunset
}