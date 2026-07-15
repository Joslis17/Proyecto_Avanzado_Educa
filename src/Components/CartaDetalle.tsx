import './cartaDetalle.css'
import { MdClear } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import habilidadesData from '../../habilidades.json';
import { Swords, Shield, Heart } from 'lucide-react'


type props = {
  idCard: string;
  name: string;
  pictureUrl: string;
  attack: number;
  defense: number;
  lifePoints: number;
  tipo: string;
  description: string;
  button: any;
  button2: any;
  noMostrar2: Function;
  onEliminarClick: () => void;
  attributes?: {
    tipo?: string;
    habilidades_Especiales?: string;
  };
}

function CartaDetalle({
    name, idCard, pictureUrl, attack, defense, description, tipo, lifePoints,
    button, button2, noMostrar2, onEliminarClick, attributes
}: props) {

    const navigate = useNavigate();
    const listaHabilidadesJSON = Array.isArray(habilidadesData) ? habilidadesData : [];

    const obtenerNombreHabilidad = (id: string) => {
        const habilidad = listaHabilidadesJSON.find((h: any) => h.id.toString() === id.trim().toString());
        return habilidad ? habilidad.nombre : "Habilidad vacía";
    };

    const cadenaHabilidades = attributes?.habilidades_Especiales || "";
    const listaHabilidadesIds = typeof cadenaHabilidades === 'string' && cadenaHabilidades ? cadenaHabilidades.split(',') : [];

  return (
    <div className='min-h-screen flex items-center justify-center p-4 bg-gray-200 backdrop-blur-sm fixed inset-0 z-50 text-black'>
        <div className='relative bg-white rounded-4xl shadow-xl shadow-purple-500 p-4 md:p-8 w-full max-w-5xl h-auto overflow-y-auto max-h-[95vh] '>
            
            <div className='flex flex-col lg:flex-row gap-4 lg:gap-8 items-center justify-center'>
                <div className='flex flex-col items-center w-full lg:w-1/3'>
                    <div
                        className='w-64 h-96 md:w-80 md:h-115 border border-gray-200 rounded-3xl bg-center bg-cover shadow-xl shadow-gray-400'
                        style={{backgroundImage: `url(${pictureUrl})`}}>
                        <h3 className='m-3 text-white font-bold text-xl bg-white/20 rounded-xl h-9 w-15 text-center justify-center items-center flex backdrop-blur-sm shadow-md'>
                            {idCard}
                        </h3>
                    </div>
                </div>
                <div className='flex-1 w-full flex flex-col gap-4'>
                    <h1 className='text-4xl md:text-5xl font-bold text-gradient-custom text-center lg:text-left'>
                        {name}
                    </h1>
                    
                    <div className='grid grid-cols-4 m-3 gap-2 text-center justify-center items-center'>
                        <div className='flex items-center gap-2 text-xl'>
                            <span className="font-bold text-gradient-custom">Tipo:</span>
                            <span>{tipo || "No definido"}</span>
                        </div>
                        <div className='flex gap-5 text-xl justify-center items-center border-2 border-gray-400 rounded-xl p-1 h-15 w-90 shadow-md
                        hover:shadow-gray-400 transition-all duration-300'>
                            <div className='flex border-2 border-purple-800 rounded-xl p-1 text-center shadow-md h-10 w-25 hover:scale-105 transition-all duration-300 hover:shadow-purple-400'>
                                <Swords size={25} className="text-red-500" />
                                <p className="text-lg ml-2">{attack}</p>
                            </div>
                            <div className='flex border-2 border-purple-800 rounded-xl p-1 text-center shadow-md h-10 w-25 hover:scale-105 transition-all duration-300 hover:shadow-purple-400  '>
                                <Shield size={25} className="text-blue-500" />
                                <p className="text-lg ml-2">{defense}</p>
                            </div>
                            <div className='flex border-2 border-purple-800 rounded-xl p-1 text-center shadow-md h-10 w-25 hover:scale-105 transition-all duration-300 hover:shadow-purple-400'>
                                <Heart size={25} className="text-green-500" />
                                <p className="text-lg ml-2">{lifePoints}</p>
                            </div>
                        </div>

                    </div>

                    <div className='flex flex-col gap-2'>
                        <p className="text-xl font-bold text-purple-600">Habilidades Especiales:</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {listaHabilidadesIds.length > 0 ? (
                                listaHabilidadesIds.map((habId, i) => (
                                    <div key={i} className='border-2 border-purple-700 rounded-xl p-2 text-center text-md shadow-lg hover:shadow-gray-400 transition-all duration-300'>
                                        {obtenerNombreHabilidad(habId)}
                                    </div>
                                ))
                            ) : (
                                <div className='col-span-3 border-2 border-dashed border-gray-300 rounded-lg p-2 text-center text-sm italic text-gray-500 hover:shadow-gray-400 transition-all duration-300'>
                                    Sin habilidades asignadas
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <p className="text-xl font-bold text-purple-600">Link de Imagen:</p>
                        <div className='p-1.5 border-2 rounded-xl border-purple-700 text-sm h-12 overflow-y-auto bg-gray-50 break-all shadow-md hover:shadow-gray-400 transition-all duration-300'>
                            {pictureUrl || "Esperando URL..."}
                        </div>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <p className="text-xl font-bold text-purple-600">Descripción:</p>
                        <p className=" italic text-gray-700 bg-gray-50 p-3 rounded-lg
                        text-sm border-2 border-gray-200 overflow-y-auto h-15 shadow-md hover:shadow-gray-400 transition-all duration-300">
                            {description}
                        </p>
                    </div>
                </div>
            </div>

            <button onClick={() => noMostrar2()}
                className='absolute top-4 right-4 bg-white border-3 border-gray-400 rounded-full p-1 hover:bg-gray-100 hover:scale-105 transition-all shadow-md z-10 cursor-pointer'>
                <MdClear size={30} className="text-black"/>
            </button>
            
            <div className='flex gap-4 mt-2 w-full justify-center'>
                <button 
                    onClick={onEliminarClick}
                    className='border-3 rounded-[10px] border-gray-200 p-1 mx-2 my-1 cursor-pointer text-white h-12 w-25
                    font-semibold text-md bg-red-800 hover:bg-red-600 hover:scale-110 transition-all shadow-lg shadow-gray-400
                    hover:shadow-red-500 duration-300 flex items-center justify-center'>
                    {button}
                </button>
                <button 
                    onClick={() => navigate(`/editar/${idCard}`)}
                    className='border-3 rounded-[10px] border-gray-200 p-1 mx-2 my-1 cursor-pointer text-white h-12 w-25
                    font-semibold text-md bg-purple-900 hover:bg-purple-700 hover:scale-110 transition-all shadow-lg shadow-gray-400
                    hover:shadow-purple-500 duration-300 flex items-center justify-center'>
                    {button2}
                </button>
            </div> 
             
        </div>
        
    </div>
  )
}

export default CartaDetalle;