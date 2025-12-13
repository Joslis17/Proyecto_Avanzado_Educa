import './App.css'
import { useState } from 'react'

import VistaMazo from "./Pantallas/VistaMazo"
import VistaDetalle from './Pantallas/VistaDetalle'
import VistaCrearCarta from './Pantallas/VistaCrearCarta';

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
