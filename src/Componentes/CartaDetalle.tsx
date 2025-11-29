import './CartaDetalle.css'
import Fondo from '../assets/Imagenes/Componentes/Fondo_de_carta.jpg'

let fondo={
    backgroundImage: `url(${Fondo})`
}

type props = {
  numero: number;
  nombre: string;
  imagen: string;
  tipo: string;
  ataque?: number;
  defensa: number;
  descripcion: string;
  vida: number;
  button: string;
  button2: string;

}

function CartaDetalle({
  imagen,
  nombre,
  numero,
  ataque=0,
  defensa,
  descripcion,
  tipo,
  vida,
  button,
  button2,
}: props
) {
  return (
    <div>

        
        <div className=' flex items-center justify-center'>

            <div className='w-60 h-105 border border-gray-100 box-border-200  rounded-2xl bg-center bg-cover m-20 shadow-[0_0_60px_rgb(120,150,210,10)]' 
                style={fondo}
                >
                <h3 className=' m-3 text-white font-bold text-lg'>
                    {numero}
                </h3>
                <img src={imagen} alt={nombre} className='rounded-2xl border-2 border-t-blue-950 border-r-blue-950
                        w-50 h-75 mx-4 '/>

                <h3 className='text-center my-5 text-white font-bold '>
                    {nombre}
                </h3>

                <div className='align-center justify-center flex'>
                    <button className='bg-gray-100 border rounded-md border-gray-300 px-3 py-2.5 mx-5 my-5 cursor-pointer 
                        text-white bg-center bg-cover'
                        style={fondo}>
                    {button}
                    </button>
                    <button className='bg-gray-100 border rounded-md border-gray-300 px-3 py-2.5 mx-5 my-5 cursor-pointer 
                            text-white bg-center bg-cover'
                            style={fondo}>
                    {button2}
                    </button>
                </div>
        
            </div>

            <div className='w-150 h-120 m-5 p-10 border-3 border-t-blue-900 border-r-blue-900 shadow-[0_0_60px_rgb(120,150,210)] rounded-4xl '
                style={fondo}>

                <p className="relative text-2xl font-bold text-blue-200">
                    Tipo:
                </p>
                <p className="relative text-gray-300 mt-2">
                    {tipo}
                </p>
                <p className="relative text-2xl font-bold text-blue-200">
                    Ataque:
                </p>
                <p className="relative text-gray-300 mt-2">
                    {ataque}
                </p>
                <p className="relative text-2xl font-bold text-blue-200">
                    Defensa:
                </p>
                <p className="relative text-gray-300 mt-2">
                    {defensa}
                </p>
                <p className="relative text-2xl font-bold text-blue-200">
                    Vida:
                </p>
                <p className="relative text-gray-300 mt-2">
                    {vida}
                </p>
                <p  className="relative text-2xl font-bold text-blue-200">
                    Descripcion:
                </p>
                <p className="relative text-gray-300 mt-2">
                    {descripcion}
                </p>
            </div>

        </div>

    </div>
    
  )
}

export default CartaDetalle