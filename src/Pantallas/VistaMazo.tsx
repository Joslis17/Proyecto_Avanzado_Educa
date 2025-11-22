import './VistaMazo.css'

import Carta from "../Componentes/Carta"
import Payaso_It from '../assets/Imagenes/Cartas/Payaso_It.jpg'
import La_Monja from '../assets/Imagenes/Cartas/La_Monja.jpg'

function VistaMazo() {
  return (
    <div className=' flex'>
        <h1>Mazo</h1>
        <div>
          <Carta
          numero={1}
          nombre="Payaso it"
          imagen= {Payaso_It}
          tipo="Payaso malvado"
          ataque={3000}
          defensa={2500}
          vida={80}
          descripcion="Un payaso terrorífico que se alimenta del miedo, y crea ilusiones muy reales para atrapar a sus víctimas."
          
        />
        <Carta
          numero={2}
          nombre="La Monja"
          imagen= {La_Monja}
          tipo="Demonio"
          ataque={3500}
          defensa={2000}
          vida={100}
          descripcion="Un demonio que usa la apariencia de una monja para engañar a sus víctimas y usa su fuerza física sobrenatural y la capacidad de poseer personas. "
        />
        </div>
    </div>
  )
}

export default VistaMazo