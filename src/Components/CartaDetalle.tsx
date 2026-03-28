import './cartaDetalle.css'
import { MdClear } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

type props = {
  idCard: string;
  name: string;
  pictureUrl: string;
  attack: number;
  defense: number;
  lifePoints: number;
    habilidades_Especiales1: string;
    habilidades_Especiales2: string;
    habilidades_Especiales3: string;
    tipo: string;
  description: string;
  button: string;
  button2: string;
  noMostrar2:Function;
  onEliminarClick: () => void;
}

function CartaDetalle({
    name, idCard, pictureUrl, attack, defense, description, habilidades_Especiales1,
    habilidades_Especiales2, habilidades_Especiales3, tipo, lifePoints,
    button, button2, noMostrar2, onEliminarClick,
}: props) {

    const navigate = useNavigate();

  return (
    <div className='min-h-screen flex items-center justify-center p-4 bg-gray-200 backdrop-blur-sm fixed inset-0 z-50'>
        {/* Contenedor Principal: Adaptable como el de CrearCarta */}
        <div className='relative bg-white rounded-4xl shadow-xl shadow-purple-500 p-4 md:p-8 w-full max-w-5xl h-auto overflow-y-auto max-h-[95vh] flex flex-col lg:flex-row gap-8 items-center'>
            
            {/* SECCIÓN IZQUIERDA: Imagen y Botones */}
            <div className='flex flex-col items-center w-full lg:w-1/3'>
                <div
                    className='w-64 h-96 md:w-80 md:h-120 border border-gray-200 rounded-2xl bg-center bg-cover shadow-xl'
                    style={{backgroundImage: `url(${pictureUrl})`}}>
                    <h3 className='m-3 text-white font-bold text-xl bg-black/40 rounded-lg w-10 text-center'>
                        {idCard}
                    </h3>
                </div>

                <div className='flex gap-4 mt-6 w-full justify-center'>
                    <button 
                        onClick={onEliminarClick}
                        className='flex-1 max-w-[120px] rounded-xl border-2 border-gray-200 p-2 text-white font-semibold bg-[#5c0202] hover:bg-[#940404] hover:scale-105 transition-all duration-300 shadow-md'>
                        {button}
                    </button>
                    <button 
                        onClick={() => navigate(`/editar/${idCard}`)}
                        className='flex-1 max-w-[120px] rounded-xl border-2 border-gray-200 p-2 text-white font-semibold bg-purple-900 hover:bg-purple-700 hover:scale-105 transition-all duration-300 shadow-md'>
                        {button2}
                    </button>
                </div>  
            </div>

            {/* SECCIÓN DERECHA: Información (Equivalente al formulario) */}
            <div className='flex-1 w-full flex flex-col gap-4'>
                <h1 className='text-4xl md:text-5xl font-bold text-gradient-custom text-center lg:text-left'>
                    {name}
                </h1>

                <div className='flex items-center gap-2 text-xl'>
                    <span className="font-bold text-gradient-custom">Tipo:</span>
                    <span>{tipo}</span>
                </div>
                
                {/* Stats en Grid */}
                <div className='grid grid-cols-3 gap-2 md:gap-4'>
                    <div className='border-2 border-purple-800 rounded-xl p-2 text-center hover:shadow-purple-400 shadow-md transition-all'>
                        <p className="font-bold text-sm md:text-base">Ataque</p>
                        <p className="text-lg">{attack}</p>
                    </div>
                    <div className='border-2 border-purple-800 rounded-xl p-2 text-center hover:shadow-purple-400 shadow-md transition-all'>
                        <p className="font-bold text-sm md:text-base">Defensa</p>
                        <p className="text-lg">{defense}</p>
                    </div>
                    <div className='border-2 border-purple-800 rounded-xl p-2 text-center hover:shadow-purple-400 shadow-md transition-all'>
                        <p className="font-bold text-sm md:text-base">Vida</p>
                        <p className="text-lg">{lifePoints}</p>
                    </div>
                </div>

                {/* Habilidades */}
                <div className='flex flex-col gap-2'>
                    <p className="text-xl font-bold text-gradient-custom">Habilidades Especiales:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {[habilidades_Especiales1, habilidades_Especiales2, habilidades_Especiales3].map((hab, i) => (
                            <div key={i} className='border-2 border-purple-700 rounded-xl p-2 text-center text-sm shadow-sm hover:shadow-purple-500 transition-all'>
                                {hab}
                            </div>
                        ))}
                    </div>
                </div>

                <div className='flex flex-col gap-1'>
                    <p className="text-xl font-bold text-gradient-custom">Link de Imagen:</p>
                    <p className="text-sm break-all bg-gray-50 p-2 rounded-lg border border-gray-200">{pictureUrl}</p>
                </div>

                <div className='flex flex-col gap-1'>
                    <p className="text-xl font-bold text-gradient-custom">Descripción:</p>
                    <p className="text-base italic text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-200">{description}</p>
                </div>
            </div>

            {/* Botón Cerrar */}
            <button onClick={() => noMostrar2()}
                className='absolute top-4 right-4 bg-white border-2 border-gray-300 rounded-full p-1 hover:bg-gray-100 transition-all shadow-md z-10'>
                <MdClear size={30} className="text-black"/>
            </button>
        </div>
    </div>
  )
}
export default CartaDetalle;