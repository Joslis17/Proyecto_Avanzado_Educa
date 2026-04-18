import './vistaMazo.css'
import Carta from "../Components/Carta"
import { IoAddOutline } from "react-icons/io5";

type props = {
  seleccionarCarta: Function
  verDetalle: Function
  mostrarCrear: Function
  mazo: any[]
  setMazo: Function;
  eliminarCarta: Function;
  seleccionadas: string[]; // Nueva prop
  toggleSeleccion: (id: string) => void; // Nueva prop
}

function VistaMazo({ seleccionarCarta, verDetalle, mostrarCrear, mazo, eliminarCarta, seleccionadas, toggleSeleccion }: props) {
  return (
    <div >
      <h1 className='text-gradient-custom mt-2 p-2 text-5xl font-sans font-bold flex text-center justify-center'>
        ENTIDADES MALIGNAS
      </h1>
      <div className='flex justify-center max-w-8xl'>
        <div className=' flex flex-wrap justify-center p-2 gap-10 m-3  max-w-8xl' >
          {
            mazo.map(carta => (
              <Carta
                key={carta.idCard}
                carta={carta}
                seleccionarCarta2={seleccionarCarta}
                verDetalle={() => verDetalle(carta)}
                button='Eliminar'
                button2='Detalles'
                onEliminar={() => eliminarCarta(carta.idCard)}
                isSeleccionada={seleccionadas.includes(carta.idCard)} // Uso de includes
                totalSeleccionadas={seleccionadas.length}
                onLongPress={() => toggleSeleccion(carta.idCard)}
              />
            ))
          }
        </div>
      </div>
      <button onClick={() => mostrarCrear()}
        className='fixed top-5 right-10 bg-white border-3 border-gray-400/50 rounded-full p-1 m-2 z-40
         cursor-pointer hover:bg-gray-200 hover:scale-115 transition-all duration-400'>
        <IoAddOutline size={40} color={'#000000'} />
      </button>
    </div>
  )
}

export default VistaMazo