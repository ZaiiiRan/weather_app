export default async function LoadImgs() {
    const images = [
        '/img/day.jpg',
        '/img/night.jpg',
        '/icons/Cloudy_Moon.png',
        '/icons/Cloudy_Sunny.png',
        '/icons/Cloudy.png',
        '/icons/Foggy.png',
        '/icons/geo.png',
        '/icons/Humidity.png',
        '/icons/Lightning_Moon.png',
        '/icons/Lightning.png',
        '/icons/Moon.png',
        '/icons/no-signal.png',
        '/icons/notFound.png',
        '/icons/pressure.png',
        '/icons/Rain.png',
        '/icons/Shower.png',
        '/icons/Snow.png',
        '/icons/Sunny.png',
        '/icons/Sunrise.png',
        '/icons/Sunset.png',
        '/icons/Temperature.png',
        '/icons/wind.png'
    ]
    
    await Promise.all(images.map(src => new Promise((resolve, reject) => {
        const img = new Image()
        img.src = src
        img.onload = resolve
        img.onerror = reject
    })))
}