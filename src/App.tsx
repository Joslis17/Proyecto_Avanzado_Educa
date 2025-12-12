import './App.css'
import { useState } from 'react'

import VistaMazo from "./Pantallas/VistaMazo"
import VistaDetalle from './Pantallas/VistaDetalle'

function App() {

  const [cartaSeleccionada, setCartaSeleccionada] = useState(false);

  return (
    <div>
      {
        cartaSeleccionada
        ? <VistaDetalle 
            carta={cartaSeleccionada} 
            noMostrar={() => setCartaSeleccionada(false)} 
          />
        : <VistaMazo seleccionarCarta={setCartaSeleccionada} />
      }
    </div>
  )
}

export default App