import './Loader.css'

export default function Loader({loaded}) {
    return (
        <div className={`Loader-wrapper ${loaded ? '' : 'show'}`}>
            <div className='loader'></div>
        </div>
    )
}