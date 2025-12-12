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
        cartaSeleccionada ?
           <VistaDetalle 
            carta={cartaSeleccionada} 
            noMostrar={() => setCartaSeleccionada(false)} 
          />
          
        : mostrarVistaCrear ?
        <VistaCrearCarta noMostrar={() => setMostrarVistaCrear(false)}/>
        : <VistaMazo seleccionarCarta={setCartaSeleccionada} 
                      mostrar={() => setMostrarVistaCrear(true)}
        />
      }
      
      
    </div>
  )
}

export default App;