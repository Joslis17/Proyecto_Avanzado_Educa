import './vistaMazo.css'
import Carta from "../Components/Carta"
import { IoAddOutline } from "react-icons/io5";
type TipoDeCarta = {
  idCard: string;
  name: string;
  pictureUrl: string;
  attack: number;
  defense: number;
  lifePoints: number;
  attributes: {
    habilidades_Especiales1: string;
    habilidades_Especiales2: string;
    habilidades_Especiales3: string;
    tipo: string;
  }
  description: string;
}

type props = {
  seleccionarCarta: Function
  verDetalle: Function
  mostrarCrear: Function
  mazo: TipoDeCarta[] // Recibimos el mazo de App
  setMazo: Function;   // Recibimos el setter de App
  eliminarCarta: Function; // Recibimos la función de eliminación de App

}

function VistaMazo({ seleccionarCarta, verDetalle, mostrarCrear, mazo, setMazo, eliminarCarta }: props) {
  
  const eliminarCarta2 = (numero: string) => {
    setMazo(mazo.filter(carta => carta.idCard !== numero));
  };
  
  return (
    <div >
      <h1 className='text-gradient-custom mt-2 p-2 text-5xl font-sans font-bold flex text-center justify-center'>
        ENTIDADES MALIGNAS
      </h1>
      <h2 className='flex text-center justify-center p-2 font-sans text-2xl font-medium border-b-3 border-gray-200 '>
        Mi Mazo de Cartas Terrorificas
      </h2>
      <div className='flex items-center justify-center'>
        <div className=' flex p-1.5 gap-5 m-3 ' >
          {
            mazo.map(carta => (
              <Carta
                key={carta.idCard}
                carta={carta}
                seleccionarCarta2={seleccionarCarta}
                verDetalle={() => verDetalle(carta)}
                button='Eliminar'
                button2='Detalles'
                onEliminar={() => {eliminarCarta(carta.idCard), eliminarCarta2(carta.idCard)}
                }
              />
            ))
          }
        </div>
      </div>
      <button onClick={() => mostrarCrear()}
        className='absolute top-10 right-10 bg-white border-3 border-gray-400/50 rounded-full p-1 m-2
         cursor-pointer hover:bg-gray-200 hover:scale-115 transition-background,scale duration-400'>
        <IoAddOutline size={40} color={'#000000'} />
      </button>
    </div>
  )
}

export default VistaMazo