export default function convertWindDir(windDir) {
    switch (windDir) {
        case 'N': return 'С'
        case 'NNE': return 'С'
        case 'NE': return 'С-В'
        case 'ENE': return 'В'
        case 'E': return 'В'
        case 'ESE': return 'В'
        case 'SE': return 'Ю-В'
        case 'SSE': return 'Ю'
        case 'S': return 'Ю'
        case 'SSW': return 'Ю'
        case 'SW': return 'Ю-З'
        case 'WSW': return 'З'
        case 'W': return 'З'
        case 'WNW': return 'З'
        case 'NW': return 'С-З'
        case 'NNW': return 'С' 
    }
}