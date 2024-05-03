import './ChangeLocation.css'
import { useState, useRef, useEffect } from 'react'

export default function ChangeLocation({setCity, isDay }) {
    const [isHovered, setIsHovered] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)
    const [text, setText] = useState('')
    const [findedCities, setFindedCities] = useState([])
    const inputRef = useRef(null)
    useEffect(() => {
        const suggestionsContainer = document.createElement('div')
        suggestionsContainer.className = 'suggestions-container'
        document.body.appendChild(suggestionsContainer)
        return () => {
            document.body.removeChild(suggestionsContainer)
        }
    }, [])
    useEffect(() => {
        const suggestionsContainer = document.querySelector('.suggestions-container')
        if (!isDay && !suggestionsContainer.className.includes('night')) suggestionsContainer.classList.add('night')
        else if (isDay && suggestionsContainer.className.includes('night')) suggestionsContainer.classList.remove('night')
        if (suggestionsContainer) {
            suggestionsContainer.innerHTML = ''
            findedCities.forEach(city => {
                const suggestionItem = document.createElement('div')
                suggestionItem.className = 'suggestion-item'
                if (!isDay && !suggestionItem.className.includes('night')) suggestionItem.classList.add('night')
                else if (isDay && suggestionItem.className.includes('night')) suggestionItem.classList.remove('night')
                suggestionItem.textContent = city.city
                suggestionItem.onclick = () => {
                    setCity(city.city)
                    setFindedCities([])
                }
                suggestionsContainer.appendChild(suggestionItem)
            })
        }
    }, [findedCities, setCity, isDay])
    const positionSuggestions = () => {
        const suggestionsContainer = document.querySelector('.suggestions-container')
        if (inputRef.current && suggestionsContainer) {
            const rect = inputRef.current.getBoundingClientRect()
            suggestionsContainer.style.position = 'absolute'
            suggestionsContainer.style.left = `${rect.left}px`
            suggestionsContainer.style.top = `${rect.bottom + 5}px`
            suggestionsContainer.style.zIndex = '15'
        }
    }
    useEffect(() => {
        setFindedCities([])
    }, [isExpanded])
    
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
                <input ref={inputRef} className='ChangeLocationInput' placeholder='Город' type="text" autoComplete='off' style={{
                    backgroundColor: (isDay) ? 'rgba(0, 0, 0, 0.178)' : 'rgba(255, 255, 255, 0.178)'
                }} disabled={!isHovered} onKeyDown={(event) => {
                    if (event.key === 'Enter' && text !== '') {
                        let city = ''
                        if (text.includes('-')) {
                            const words = text.split('-')
                            for (let i = 0; i < words.length; i++) {
                                words[i] = words[i][0].toUpperCase() + words[i].slice(1, words[i].length).toLowerCase()
                                city += words[i]
                                if (i !== words.length - 1) city += '-'
                            }
                        }
                        else if (text.includes(' ')) {
                            const words = text.split(' ')
                            for (let i = 0; i < words.length; i++) {
                                words[i] = words[i][0].toUpperCase() + words[i].slice(1, words[i].length).toLowerCase()
                                city += words[i]
                                if (i !== words.length - 1) city += ' '
                            }
                        }
                        else city = text[0].toUpperCase() + text.slice(1, text.length).toLowerCase()
                        setCity(city)
                        setText('')
                        event.target.value = ''
                        setFindedCities([])
                    }
                }} onChange={(event) => {
                    setText(event.target.value.trim())
                    if (event.target.value.trim() !== '')
                        fetch(`/city/${event.target.value.trim()}`)
                        .then(resp => resp.json())
                        .then(data => setFindedCities(data))
                    else setFindedCities([])
                    positionSuggestions()
                }}/>
                <div className='ChangeLocationInput-submit' style={{
                    backgroundColor: (isDay) ? 'rgba(0, 0, 0, 0.178)' : 'rgba(255, 255, 255, 0.178)',
                }} onClick={ () => {
                    if (text !== '') {
                        let city = ''
                        if (text.includes('-')) {
                            const words = text.split('-')
                            for (let i = 0; i < words.length; i++) {
                                words[i] = words[i][0].toUpperCase() + words[i].slice(1, words[i].length).toLowerCase()
                                city += words[i]
                                if (i !== words.length - 1) city += '-'
                            }
                        }
                        else if (text.includes(' ')) {
                            const words = text.split(' ')
                            for (let i = 0; i < words.length; i++) {
                                words[i] = words[i][0].toUpperCase() + words[i].slice(1, words[i].length).toLowerCase()
                                city += words[i]
                                if (i !== words.length - 1) city += ' '
                            }
                        }
                        else city = text[0].toUpperCase() + text.slice(1, text.length).toLowerCase()
                        setCity(city)
                        setFindedCities([])
                    }
                }}>ОК</div>
            </div>
        </div>
    )
}