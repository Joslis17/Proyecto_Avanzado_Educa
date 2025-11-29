import './cartaDetalle.css'
import Fondo from '../assets/Imagenes/Componentes/Fondo_de_carta.jpg'
import PayasoIt from '../assets/Imagenes/Cartas/Payaso_It.jpg'

let fondo={
    backgroundImage: `url(${Fondo})`
}

type props = {
  numero: number;
  nombre: string;
  habilidades_Especiales: string;
  tipo: string;
  ataque?: number;
  defensa: number;
  descripcion: string;
  vida: number;
  button: string;
  button2: string;
  button3?: string;
  rareza?: string;

}

function CartaDetalle({
  habilidades_Especiales,
  nombre,
  numero,
  ataque=0,
  defensa,
  descripcion,
  tipo,
  vida,
  button,
  button2,
  button3,
  rareza
}: props
) {
  return (
    <div className='min-h-screen flex items-center justify-center'>

        <div className=' flex items-center justify-center'>

            <div className='w-70 h-120 border border-white box-border-200  rounded-2xl bg-center bg-cover
             mx-20 my-8 shadow-[0_0_60px_rgba(120,150,210)]' 
            style={{backgroundImage: `url(${PayasoIt})`}}
                >

                <h3 className=' m-3 text-white font-bold text-lg bg-gray-400/40 rounded-xl w-12 text-center'>
                    {numero}
                </h3>

                <h3 className='text-center my-5 text-white font-bold mt-95 text-2xl bg-gray-400/40'>
                    {nombre}
                </h3>

                <div className='align-center justify-center flex mt-10'>
                    <button className='bg-gray-100 border rounded-md border-gray-300 px-3 py-2.5 mx-5 my-5 cursor-pointer 
                        text-white bg-center bg-cover bg-gradient-to-r from-[#5c0202] to-red-700'>
                    {button}
                    </button>
                    <button className='bg-gray-100 border rounded-md border-gray-300 px-3 py-2.5 mx-5 my-5 cursor-pointer 
                            text-white bg-center bg-cover bg-gradient-to-r from-green-400 to-green-900'>
                    {button2}
                    </button>
                </div>
        
            </div>

            <div className='w-150 h-140 m-5 border-3 border-t-gray-400 border-r-gray-400 shadow-[0_0_60px_rgba(120,150,210)]
             rounded-4xl ] bg-center bg-cover py-5'
                style={fondo}>

                <h1 className='my-5 p-1 relative text-2xl font-bold text-yellow-500 flex text-center justify-center bg-gray-300/12'>
                    CARTA 1
                </h1>
                <div className='flex mx-10 mb-5'>
                    <p className="relative text-2xl font-bold text-yellow-500">
                        Tipo:
                    </p>
                    <p className="relative text-xl text-gray-300 px-5 ">
                        {tipo}
                    </p>
                </div>
                
                <div className='flex my-2 justify-around'>
                    <div className='mx-2 border border-yellow-400 rounded-2xl p-2 flex '>
                        <p className="relative text-xl font-bold text-white m-1">
                        Ataque:
                        </p>
                        <p className="relative text-gray-300 m-1 text-xl">
                            {ataque}
                        </p>
                    </div>
                    <div className='mx-2 border border-yellow-400 rounded-2xl p-2 flex'>
                        <p className="relative text-xl font-bold text-white m-1">
                            Defensa:
                        </p>
                        <p className="relative text-gray-300 m-1 text-xl">
                            {defensa}
                        </p>
                    </div>
                    <div className='mx-2 border border-yellow-400 rounded-2xl p-2 flex'>
                        <p className="relative text-xl font-bold text-white m-1">
                           Vida:
                        </p>
                        <p className="relative text-gray-300 m-1 text-xl">
                            {vida}
                        </p>`
                    </div>
                    
                </div>

                <div className=' mx-5 my-10'>
                    <p className="relative text-2xl font-bold text-yellow-400">
                        Habilidades Especiales:
                    </p>
                    <p className="relative text-gray-300 text-xl">
                        {habilidades_Especiales}
                    </p>
                </div>
                <div className='flex mx-5 my-10'>
                    <p className="relative text-2xl font-bold text-yellow-400">
                        Rarezas:
                    </p>
                    <p className="relative text-gray-300 px-2 text-xl">
                        {rareza}
                    </p>
                </div>

                <div className=' mx-5 my-10'>
                    <p className="relative text-2xl font-bold text-yellow-400">
                        Descripcion:
                    </p>
                    <p className="relative text-gray-300 px-2 text-xl">
                        {descripcion}
                    </p>
                </div>
            </div>

        </div>

        
        <button className='text-white fixed top-5 right-5 bg-gray-400/40 rounded-full w-10 h-10'>
            {button3}
        </button>

    </div>
    
  )
}

export default CartaDetalle