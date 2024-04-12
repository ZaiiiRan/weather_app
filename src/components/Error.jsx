import './Error.css'

export default function Error({error}) {
    return (
        <div className={`Error ${error ? 'show' : ''}`}>
            <div>Ошибка при загрузке данных</div>
        </div>
    )
}