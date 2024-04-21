import './ChangeLocation.css'
import { useState } from 'react'

export default function ChangeLocation({setCity, isDay = true}) {
    const [isHovered, setIsHovered] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)
    const [text, setText] = useState('')
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
                }} disabled={!isHovered} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} onKeyDown={(event) => {
                    if (isFocused && event.key === 'Enter') {
                        setCity(text)
                        setText('')
                    }
                }} onChange={(event) => setText(event.target.value)}/>
                <div className='ChangeLocationInput-submit' style={{
                    backgroundColor: (isDay) ? 'rgba(0, 0, 0, 0.178)' : 'rgba(255, 255, 255, 0.178)',
                }} onClick={ () => {setCity(text); setText('')}}>ОК</div>
            </div>
        </div>
    )
}