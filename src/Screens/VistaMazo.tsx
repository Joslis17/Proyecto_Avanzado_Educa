import './vistaMazo.css'
import Carta from "../Components/Carta"
import { IoAddOutline } from "react-icons/io5";
import { useState } from 'react'

type props = {
  seleccionarCarta: Function
  irBatalla: Function
  verDetalle: Function
  mostrarCrear: Function
  mazo: any[]
  setMazo: Function;
  eliminarCarta: Function;
}

function VistaMazo({ seleccionarCarta, verDetalle, mostrarCrear, mazo, eliminarCarta, irBatalla }: props) {

  const [seleccionadas, setSeleccionadas] = useState<string[]>([]);
  
   const toggleSeleccion = (id: string) => {
    setSeleccionadas(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) // Si ya está, la quitamos
        : [...prev, id] // Si no está, la agregamos
    );
  };

  const manejarPelea = () => {
    if (seleccionadas.length !== 2) {
      alert(" Error: Debes seleccionar exactamente dos cartas para iniciar una pelea.");
    } else {
      const cartasPeleando = mazo.filter(c => seleccionadas.includes(c.idCard));
      irBatalla(cartasPeleando[0].idCard,cartasPeleando[1].idCard)
    }
  };

  return (
    <div >
      <h1 className='text-gradient-custom mt-2 p-2 text-5xl font-sans font-bold flex text-center justify-center'>
        ENTIDADES MALIGNAS
      </h1>
      
      <div >
     
        {seleccionadas.length > 0 && (
          <button
            className={`fixed top-5 right-40 text-white font-bold py-3 px-6 rounded-2xl border-gray-200 shadow-2xl z-50 transition-all duration-300
              ${seleccionadas.length === 2 
                ? 'bg-purple-900 hover:bg-purple-700 hover:scale-110 hover:shadow-purple-500' 
                : ' bg-[#5c0202] hover:bg-[#940404] hover:scale-110'}`}
            onClick={manejarPelea}
          >
            {seleccionadas.length === 2 ? '¡PELEAR AHORA!' : `SELECCIONADAS: ${seleccionadas.length}`}
          </button>
        )}
      </div >


      <div className='flex justify-center max-w-8xl'>
        <div className='flex flex-wrap justify-center p-2 gap-10 m-3 max-w-8xl'>
          {
            mazo.map((carta, index) => {
              // Si no tiene idCard (carta creada localmente), le asignamos una llave única combinada
              const llaveUnica = carta.idCard || `temporal-${index}`;

              return (
                <Carta
                  key={llaveUnica}
                  carta={carta}
                  seleccionarCarta2={seleccionarCarta}
                  verDetalle={() => verDetalle(carta)}
                  button='Eliminar'
                  button2='Detalles'
                  onEliminar={() => eliminarCarta(carta.idCard)}
                  isSeleccionada={seleccionadas.includes(carta.idCard)}
                  totalSeleccionadas={seleccionadas.length}
                  onLongPress={() => toggleSeleccion(carta.idCard)}
                />
              );
            })
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