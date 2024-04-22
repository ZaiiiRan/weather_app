import { useState } from 'react'
import './Error.css'
import './NotFound.css'

const url = 'http://192.168.1.64:3030'

export default function NotFound({notFound, setCity}) {
    const [findedCities, setFindedCities] = useState([])
    const [text, setText] = useState('')
    return (
        <div className={`Error ${notFound ? 'show' : ''}`}>
            <img className='error-icon' src="/icons/notFound.png" alt="connection-error-icon" draggable={false}/>
            <div>Город не найден</div>
            <div className='notFoundInput-inputs'>
            <div className='notFoundInput-container'>
                <input className='notFoundInput' type="text" placeholder='Введите название города' autoComplete='off' onKeyDown={(event) => {
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
                }} onChange={(event) => {
                    setText(event.target.value)
                    if (event.target.value !== '')
                        fetch(`${url}/city/${event.target.value}`)
                        .then(resp => resp.json())
                        .then(data => setFindedCities(data))
                    else setFindedCities([])
                }} />
                <div className='notFoundInput-button' onClick={() => {
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
                }}>Поиск</div>
            </div>
            <div className='notFoundInput-container'>
                <div className={`notFound_filter ${findedCities.length === 0 ? '' : 'show'}`}>
                    {findedCities.map(item => {
                        return <div className='notFound_filter-item' key={item.city} onClick={() => {
                            setCity(item.city)
                            setText('')
                            setFindedCities([])
                        }}>{item.city}</div>
                    })}
                </div>
            </div>
            </div>
            
        </div>
    )
}