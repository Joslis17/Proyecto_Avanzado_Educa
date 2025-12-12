import './cartaDetalle.css'
/* import Fondo from '../assets/Imagenes/Componentes/Fondo_de_carta.jpg' */

import { MdClear } from "react-icons/md";

type props = {
  numero: number;
  nombre: string;
  imagen:string,
  habilidades_Especiales1:string,
  habilidades_Especiales2: string,
  habilidades_Especiales3:string,
  tipo: string;
  ataque?: number;
  defensa: number;
  descripcion: string;
  vida: number;
  button: string;
  button2: string;
  rareza?: string;
  noMostrar2:Function

}

function CartaDetalle({
  habilidades_Especiales1,
  habilidades_Especiales2,
  habilidades_Especiales3,
  nombre,
  numero,
  imagen,
  ataque,
  defensa,
  descripcion,
  tipo,
  vida,
  button,
  button2,
  rareza,
  noMostrar2,
}: props
) {
  return (
    <div  className='min-h-screen flex items-center justify-center'>

        <div className=' flex items-center justify-center rounded-4xl shadow-xl shadow-purple-500  p-5 bg-white'>
            
            <div>

                <div
                    className='  mx-10 my-2 w-80 h-130 border border-white rounded-2xl bg-center bg-cover    
                         shadow-xl shadow-gray-400 hover:shadow-gray-700 transition-shadow duration-400'
                    style={{backgroundImage: `url(${imagen})`}}>

                        <h3 className=' m-3 text-white font-bold text-2xl bg-gray-400/40 rounded-xl w-12 text-center'>
                            {numero}
                        </h3>

                        
                    </div>

                        <div className='align-center justify-center flex mt-10'>
                            <button 
                                className='border-3 rounded-[10px] border-gray-200 p-1 mx-2 my-1 cursor-pointer text-white h-13 w-28
                                font-semibold text-lg bg-[#5c0202] hover:bg-[#940404] hover:scale-110 transition-background,scale,shadow 
                                duration-400 shadow-lg hover:shadow-[#940404] shadow-gray-300'>
                                {button}
                            </button>
                            <button 
                                className='border-3 rounded-[10px] border-gray-200 p-1 mx-2 my-1 cursor-pointer text-white h-13 w-33
                                font-semibold text-lg bg-purple-900 hover:bg-purple-700 hover:scale-110 transition-background,scale,shadow 
                                duration-400 shadow-lg hover:shadow-purple-500 shadow-gray-300'>
                                {button2}
                            </button>
                        </div>  


            </div>
            <div className='w-160 h-160 my-2 mx-10 border-3 border-gray-300 rounded-4xl shadow-lg shadow-gray-400
             py-5 bg-gray-300/50 hover:shadow-gray-700 transition-shadow duration-400'>

                <h1 className='mb-3 p-1 relative text-5xl font-bold flex text-center justify-center text-gradient-custom '>
                    {nombre}
                </h1>
                <div className='flex mx-10 mb-5'>
                    <p className="relative text-2xl font-bold text-gradient-custom ">
                        Tipo:
                    </p>
                    <p className="relative text-[22px] px-5 ">
                        {tipo}
                    </p>
                </div>
                
                <div className='flex my-2 justify-around'>
                    <div className='mx-2 border-3 border-purple-700 rounded-2xl p-2 flex hover:scale-105 transition-scale,shadow 
                                duration-400 shadow-lg hover:shadow-purple-500'>
                        <p className="relative text-xl font-bold m-1">
                        Ataque:
                        </p>
                        <p className="relative m-1 text-xl">
                            {ataque}
                        </p>
                    </div>
                    <div className='mx-2 border-3 border-purple-700 rounded-2xl p-2 flex hover:scale-105 transition-scale,shadow 
                                duration-400 shadow-lg hover:shadow-purple-500'>
                        <p className="relative text-xl font-bold m-1">
                            Defensa:
                        </p>
                        <p className="relative m-1 text-xl">
                            {defensa}
                        </p>
                    </div>
                    <div className='mx-2 border-3 border-purple-700 rounded-2xl p-2 flex hover:scale-105 transition-scale,shadow 
                                duration-400 shadow-lg hover:shadow-purple-500'>
                        <p className="relative text-xl font-bold m-1">
                           Vida:
                        </p>
                        <p className="relative m-1 text-xl">
                            {vida}
                        </p>`
                    </div>
                    
                </div>

                <div className=' mx-5 my-10'>
                    <p className="relative text-2xl font-bold text-gradient-custom ">
                        Habilidades Especiales:
                    </p>
                    <div className="flex  my-2 text-xl">
                        <div className='m-2 border-3 border-purple-700 rounded-2xl p-2 flex hover:scale-105 transition-scale,shadow 
                                duration-400 shadow-lg hover:shadow-purple-500'>
                            {habilidades_Especiales1}
                        </div>
                        <div className='m-2 border-3 border-purple-700 rounded-2xl p-2 flex hover:scale-105 transition-scale,shadow 
                                duration-400 shadow-lg hover:shadow-purple-500'>
                            {habilidades_Especiales2}
                        </div>
                        <div className='m-2 border-3 border-purple-700 rounded-2xl p-2 flex hover:scale-105 transition-scale,shadow 
                                duration-400 shadow-lg hover:shadow-purple-500'>
                            {habilidades_Especiales3}
                        </div>
                        
                    </div>
                </div>
                <div className='flex mx-5 my-10'>
                    <p className="relative text-2xl font-bold text-gradient-custom ">
                        Rarezas:
                    </p>
                    <p className="relative px-2 text-[22px]">
                        {rareza}
                    </p>
                </div>

                <div className=' mx-5 my-10'>
                    <p className="relative text-2xl font-bold text-gradient-custom ">
                        Descripcion:
                    </p>
                    <p className="relative px-2 text-[22px]">
                        {descripcion}
                    </p>
                </div>
            </div>

            <button  onClick={() => noMostrar2()}
                className='absolute top-15 right-15 bg-white border-3 border-gray-400/50 rounded-full p-1 m-2
                cursor-pointer hover:bg-gray-200 hover:scale-115 transition-background,scale duration-400'>
                <MdClear size={40} color={'#000000'}/>
            </button>

        </div>

    </div>
    
  )
}

export default CartaDetalle