import './vistaCrearCarta.css'
import CrearCarta from '../Components/CrearCarta';

type props = {
    noMostrar:Function
    agregarCarta: (carta: any) => void
    
}

function VistaCrearCarta({noMostrar, agregarCarta}:props) {
  
  return (
    <div>
        <CrearCarta 
        agregarCarta={agregarCarta} 
        noSeMuestra={noMostrar}
        />
    </div>
  )
}

export default VistaCrearCarta