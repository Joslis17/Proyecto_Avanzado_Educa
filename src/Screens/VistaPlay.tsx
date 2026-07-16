import { useNavigate } from 'react-router-dom'
import './vistaPlay.css'

function VistaPlay() {
    const navigate = useNavigate()
  return (
    <div>
        <div className='flex flex-col justify-center items-center h-screen'>
            <div className='flex flex-col justify-center items-center border-3 border-red-600 h-120 w-300 rounded-4xl
            shadow-lg shadow-red-600'>
                <h1 className='fuente_terror bg-gradient-to-b from-red-700 to-red-500 bg-clip-text text-transparent
                    font-sans mt-2 p-2 text-9xl font-bold flex text-center justify-center
                    drop-shadow-xl drop-shadow-red-300 [-webkit-text-stroke:1px_white]
                    '>
                    ENTIDADES MALIGNAS
                </h1>
                <button 
                    onClick={() => navigate('/mazo')} 
                    className='w-60 h-15 text-white font-bold py-2 rounded-lg hover:bg-red-700 border-4 border-white
                    transition-all text-sm hover:scale-105 duration-300 shadow-lg hover:shadow-red-500
                    shadow-gray-500 m-10'>
                    PLAY
                </button>
                
            </div>
            
        </div>
        <p className="absolute bottom-4 right-4 text-gray-400 italic">
            Derechos de autor: Joslis Morelos
        </p>
    </div>
  )
}

export default VistaPlay