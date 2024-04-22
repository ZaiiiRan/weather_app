import './ChangeLocation.css'
import { useState } from 'react'

export default function ChangeLocation({setCity, isDay = true}) {
    const [isHovered, setIsHovered] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)
    const [text, setText] = useState('')
    const [findedCities, setFindedCities] = useState([])
    return (
        <div className={`ChangeLocationButton ${isExpanded ? 'show' : ''}`} style={{
            backgroundColor: (isDay) ? 'rgba(0, 0, 0, 0.178)' : 'rgba(255, 255, 255, 0.178)',
            transform: isHovered && !isExpanded ? 'scale(110%)' : 'none',
        }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={(event) => {
                    if (event.target.closest('.ChangeLocationInput')) return
                    setIsExpanded(!isExpanded)
            }}>
            <div className='ChangeLocationIcon'>
                <img className='ChangeLocation-icon' src="/icons/geo.png" draggable="false" alt="geo icon" />
            </div>
            <div className='ChangeLocationInput-block'>
                <input className='ChangeLocationInput' placeholder='Город' type="text" autoComplete='off' style={{
                    backgroundColor: (isDay) ? 'rgba(0, 0, 0, 0.178)' : 'rgba(255, 255, 255, 0.178)'
                }} disabled={!isHovered} onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        let city = ''
                        if (text.includes('-')) {
                            const words = text.split('-')
                            for (let i = 0; i < words.length; i++) {
                                words[i] = words[i][0].toUpperCase() + words[i].slice(1, words[i].length).toLowerCase()
                                city += words[i]
                                if (i !== words.length - 1) city += '-'
                            }
                        }
                        else city = text[0].toUpperCase() + text.slice(1, text.length).toLowerCase()
                        setCity(city)
                        setText('')
                        event.target.value = ''
                        setFindedCities([])
                    }
                }} onChange={(event) => setText(event.target.value)}/>
                <div className='ChangeLocationInput-submit' style={{
                    backgroundColor: (isDay) ? 'rgba(0, 0, 0, 0.178)' : 'rgba(255, 255, 255, 0.178)',
                }} onClick={ () => {
                    let city = ''
                        if (text.includes('-')) {
                            const words = text.split('-')
                            for (let i = 0; i < words.length; i++) {
                                words[i] = words[i][0].toUpperCase() + words[i].slice(1, words[i].length).toLowerCase()
                                city += words[i]
                                if (i !== words.length - 1) city += '-'
                            }
                        }
                        else city = text[0].toUpperCase() + text.slice(1, text.length).toLowerCase()
                        setCity(city)
                        setFindedCities([])
                }}>ОК</div>
            </div>
        </div>
    )
}