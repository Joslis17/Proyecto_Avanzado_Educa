import './vistaMazo.css'
import Carta from "../Components/Carta"
import { IoAddOutline } from "react-icons/io5";
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { MdClear } from "react-icons/md";
import { Trash2, FileText, CheckSquare, Skull, Undo2, Info

} from 'lucide-react'

import ModalAyuda from '../Components/ModalAyuda';

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

  const [mostrarAyuda, setMostrarAyuda] = useState(false);

  const [seleccionadas, setSeleccionadas] = useState<string[]>([]);
  const navigate = useNavigate();
  
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

  const botonEliminar = <Trash2 size={20} className="text-white" />
  const botonDetalles = <FileText size={20} className="text-white" />

  return (
    <div >
      <h1 className='fuente_terror bg-gradient-to-b from-red-700 to-red-500 bg-clip-text text-transparent font-sans mt-2 p-2 text-6xl font-bold flex text-center justify-center
      drop-shadow-xl drop-shadow-red-300 [-webkit-text-stroke:1px_white]
      '>
        Mazo de Cartas
      </h1>
      
      <div>
     
        {seleccionadas.length > 0 && (
          <button
            className={`flex justify-center text-center items-center fixed top-5 right-50 text-white
               font-bold p1 h-13 w-13 rounded-2xl border-gray-200 shadow-2xl z-50 transition-all duration-300
              ${seleccionadas.length === 2 
                ? 
                'border border-gray-300 bg-purple-800 hover:bg-purple-600 hover:scale-110 hover:shadow-purple-500' 
                : 
                'border border-gray-300 bg-red-700'}`}
            onClick={manejarPelea}
          >
            {seleccionadas.length === 2 
            ? <Skull size={30} className="text-white" />
            : <CheckSquare size={30} className="text-white" />}
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
                  ocultarBotones={false}
                  key={llaveUnica}
                  carta={carta}
                  seleccionarCarta2={seleccionarCarta}
                  verDetalle={() => verDetalle(carta)}
                  button= {botonEliminar}
                  button2= {botonDetalles}
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
      {mostrarAyuda && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className=" bg-gradient-to-b from-red-950 to-black border border-red-900 absolute
             bg-white p-6 rounded-xl shadow-xl w-full max-w-3xl flex flex-col justify-center">
              
              <ModalAyuda />
              <button onClick={() => setMostrarAyuda(false)} 
                className='absolute top-4 right-4 bg-white border-3 border-gray-400 rounded-full p-1 hover:bg-gray-100 hover:scale-105 transition-all shadow-md z-10 cursor-pointer'>
                  <MdClear size={30} className="text-black"/>
              </button>
            </div>
          </div>
        )}
      <button onClick={() => mostrarCrear()}
        className='fixed top-5 right-10 border-3 border-white rounded-full p-1 m-2 z-40
         cursor-pointer hover:bg-white/10 hover:scale-115 transition-all duration-400 shadow-lg hover:shadow-gray-700'>
        <IoAddOutline size={40} color={'white'} />
      </button>
      <button 
        onClick={() => navigate('/generar-carta-ia')}
        className='fixed top-5 right-30 bg-gradient-to-r from-blue-950 to-slate-900 text-white
        cursor-pointer rounded-lg p-3 shadow-lg shadow-gray-700 hover:scale-110 transition-all border 
        border-white'>
        I.A.
      </button>
      <button 
          onClick={() => setMostrarAyuda(true)}
          className='fixed top-5 left-30 bg-gradient-to-r from-blue-900 to-slate-900 text-white
        cursor-pointer rounded-lg p-2 shadow-lg shadow-gray-700 hover:scale-110 transition-all border 
        border-white'>
            <Info size={30} className="text-white" />
        </button>
        <button 
          onClick={() =>  navigate('/')}
          className='fixed top-5 left-10 bg-gradient-to-r from-blue-900 to-slate-900 text-white
        cursor-pointer rounded-lg p-2 shadow-lg shadow-gray-700 hover:scale-110 transition-all border 
        border-white'>
            <Undo2 size={30} className="text-white" />
        </button>
    </div>
  )
}

export default VistaMazo