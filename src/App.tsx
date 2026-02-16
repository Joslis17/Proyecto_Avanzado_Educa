import './App.css'
import { useState } from 'react'

import VistaMazo from "./Screens/VistaMazo"
import VistaDetalle from './Screens/VistaDetalle'
import VistaCrearCarta from './Screens/VistaCrearCarta';

function App() {

  const [cartaSeleccionada, setCartaSeleccionada] = useState(false);
  const [mostrarVistaCrear, setMostrarVistaCrear] = useState(false);

  return (
    <div>
      {
        !cartaSeleccionada && !mostrarVistaCrear ?
        <VistaMazo seleccionarCarta={setCartaSeleccionada} 
          mostrar={() => setMostrarVistaCrear(true)}/>
        : cartaSeleccionada && !mostrarVistaCrear ?
          <VistaDetalle 
            carta={cartaSeleccionada} 
            noMostrar={() => setCartaSeleccionada(false)} />
        : //!cartaSeleccionada && mostrarVistaCrear ?
            <VistaCrearCarta noMostrar={() => setMostrarVistaCrear(false)}/>
            
            
      }
      
      
    </div>
  )
}

export default App;
