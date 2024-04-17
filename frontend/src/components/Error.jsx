import './Error.css'

export default function Error({error}) {
    return (
        <div className={`Error ${error ? 'show' : ''}`}>
            <img className='error-icon' src="/icons/no-signal.png" alt="connection-error-icon" draggable={false}/>
            <div>Ошибка при загрузке данных</div>
        </div>
    )
}