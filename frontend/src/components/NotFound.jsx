import './Error.css'
import './NotFound.css'

export default function NotFound({notFound, setCity}) {
    return (
        <div className={`Error ${notFound ? 'show' : ''}`}>
            <img className='error-icon' src="/icons/notFound.png" alt="connection-error-icon" draggable={false}/>
            <div>Город не найден</div>
            <div className='notFoundInput-container'>
                <input className='notFoundInput' type="text" placeholder='Введите название города' autoComplete='off' onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        setCity(event.target.value)
                        event.target.value = ''
                    }
                }}/>
                <div className='notFoundInput-button'>Поиск</div>
            </div>
            
        </div>
    )
}