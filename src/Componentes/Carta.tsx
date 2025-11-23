import './carta.css'
import Fondo from '../assets/Imagenes/Componentes/Fondo_de_carta.jpg'

type props = {
  numero: number;
  nombre: string;
  imagen: string;
  /* tipo: string;
  ataque?: number;
  defensa: number;
  descripcion: string;
  vida: number; */
  button: string;
  button2: string;

}

function Carta({
  imagen,
  nombre,
  numero,
  /* ataque=0,
  defensa,
  descripcion,
  tipo,
  vida, */
  button,
  button2,
}: props) {
  return (
    <div className='w-60 h-105 border border-gray-100 box-border-200  rounded-2xl bg-center bg-cover' 
              style={{backgroundImage: `url(${Fondo})`}}>

      <h3 className=' m-3 text-white font-bold text-lg'>
        {numero}
      </h3>
      <img src={imagen} alt={nombre} className='rounded-2xl border-2 border-t-blue-950 border-r-blue-950
             w-50 h-75 mx-4 '/>

      <h3 className='text-center my-5 text-white font-bold '>
        {nombre}
      </h3>

      <div className='align-center justify-center flex'>
        <button className='bg-gray-100 border rounded-md border-gray-300 px-3 py-2.5 mx-2 my-5 cursor-pointer 
              text-white bg-center bg-cover'
              style={{backgroundImage: `url(${Fondo})`}}>
        {button}
        </button>
        <button className='bg-gray-100 border rounded-md border-gray-300 px-3 py-2.5 mx-2 my-5 cursor-pointer 
                text-white bg-center bg-cover'
                style={{backgroundImage: `url(${Fondo})`}}>
          {button2}
        </button>
      </div>
      
      {/* <div>
        <p>Tipo: {tipo}</p>
        <p>Ataque: {ataque}</p>
        <p>Defensa: {defensa}</p>
        <p>Vida: {vida}</p>
        <p>{descripcion}</p>
      </div> */}

    </div>
  );
}

export default Carta