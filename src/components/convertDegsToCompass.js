export default function convertDegsToCompass(degs) {
    if (degs >= 0 && degs < 22) return 'С'
    else if (degs >= 22 && degs <= 67) return 'С-В'
    else if (degs > 67 && degs < 112) return 'В'
    else if (degs >= 112 && degs <= 157) return 'Ю-В'
    else if (degs > 157 && degs < 202) return 'Ю'
    else if (degs >= 202 && degs <= 247) return 'Ю-З'
    else if (degs > 247 && degs < 292) return 'З'
    else if (degs >= 292 && degs <= 337) return 'С-З'
    else return 'С'  
}