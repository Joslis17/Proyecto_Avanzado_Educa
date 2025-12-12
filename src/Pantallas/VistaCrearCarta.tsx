import './vistaCrearCarta.css'
import { MdClear } from "react-icons/md";
import CrearCarta from '../Componentes/CrearCarta';

type props =
 {
    noMostrar:Function
}

function VistaCrearCarta({noMostrar}:props) {
  return (
    <div>
        <CrearCarta />

        <button  onClick={() => noMostrar()}
            className='absolute top-10 right-10 bg-white border-3 border-gray-400/50 rounded-full p-1 m-2
            cursor-pointer hover:bg-gray-200 hover:scale-115 transition-background,scale duration-400'>
            <MdClear size={40} color={'#000000'}/>
        </button>
    </div>
  )
}

export default VistaCrearCarta