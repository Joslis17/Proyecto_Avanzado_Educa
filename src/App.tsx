import './App.css'
import { useEffect, useState } from 'react'

import VistaMazo from "./Screens/VistaMazo"
import VistaDetalle from './Screens/VistaDetalle'
import VistaCrearCarta from './Screens/VistaCrearCarta';
import PaginaInexistente from './Screens/PaginaInexistente';
import VistaEditar from './Screens/VistaEditar';

import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';


function App() {

  const [mazo, setMazo] = useState<any[]>([])
  const [seleccionadas, setSeleccionadas] = useState<string[]>([]);

  const navigate = useNavigate();
  const location = useLocation(); // 2. Obtener la ubicación actual

  const [cartaSeleccionada, setCartaSeleccionada] = useState(false);
  const [mostrarVistaCrear, setMostrarVistaCrear] = useState(false);

  const getCarta = async () => {
    let urlAPI = 'https://educapi-v2.onrender.com/card';

    const respuesta = await fetch(urlAPI,{
      method: 'GET', 
      headers: {
        //Josl998465OS
        usersecretpasskey:'Josl998465OS'
      }
    });
    const objeto = await respuesta.json();
    setMazo(objeto.data);
    console.log(objeto.data);
  }
  useEffect(() => {
    console.log("La ruta cambió a:", location.pathname);
    getCarta();
  }, [location]);

  const toggleSeleccion = (id: string) => {
    setSeleccionadas(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) // Si ya está, la quitamos
        : [...prev, id] // Si no está, la agregamos
    );
  };

  const manejarPelea = () => {
    if (seleccionadas.length !== 2) {
      alert("⚠️ Error: Debes seleccionar exactamente dos cartas para iniciar una pelea.");
    } else {
      const cartasPeleando = mazo.filter(c => seleccionadas.includes(c.idCard));
      alert(`⚔️ ¡Iniciando duelo entre ${cartasPeleando[0].name} y ${cartasPeleando[1].name}!`);
      // Aquí podrías navegar a una pantalla de combate si la tienes
    }
  };

  const editarCartaGlobal = async (idCard: string, datosActualizados: any) => {
    
      const urlAPI = `https://educapi-v2.onrender.com/card/${idCard}`;
      const respuesta = await fetch(urlAPI, {
        method: 'PATCH', // Verifica si tu API usa PUT o PATCH
        headers: {
          'usersecretpasskey': 'Josl998465OS',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: datosActualizados.name, description: datosActualizados.description, pictureUrl: datosActualizados.pictureUrl, attack: datosActualizados.attack, defense: datosActualizados.defense, lifePoints: datosActualizados.lifePoints, attributes: { tipo: datosActualizados.attributes.tipo, habilidades_Especiales1: datosActualizados.attributes.habilidades_Especiales1, habilidades_Especiales2: datosActualizados.attributes.habilidades_Especiales2, habilidades_Especiales3: datosActualizados.attributes.habilidades_Especiales3 } })
      });
        
        const resultado = await respuesta.json();

      if (respuesta.status === 200 || respuesta.status === 204) {
        setMazo(mazo.map(carta => carta.idCard === idCard ? { ...carta, ...datosActualizados } : carta));
     
        await getCarta();
        navigate('/'); 
        setCartaSeleccionada(resultado.data); 

        console.log("Carta actualizada con éxito");
      } else {
        alert("Error al guardar los cambios en el servidor");
      }
  };


  const eliminarCartaGlobal = async (numero: string) => {
    let urlAPI = `https://educapi-v2.onrender.com/card/${numero}`;

    const respuesta = await fetch(urlAPI, {
      method: 'DELETE',
      headers: {
        'usersecretpasskey': 'Josl998465OS' 
        // Eliminamos "Content-Type": "application/json"
      }
    });

    if (respuesta.status === 200 || respuesta.status === 204) {
      setMazo(mazo.filter(carta => carta.idCard !== numero));
      setSeleccionadas(seleccionadas.filter(id => id !== numero));
      navigate('/');
    }
  };



  const seleccionarCartaDetalle = (carta: any) => {
    setCartaSeleccionada(carta);
    navigate(`/detalle/${carta.idCard}`);
  };

  const navegarCrearCarta = () => {
    setMostrarVistaCrear(true);
    navigate(`/crear`);
  };

  const navegarCerrarCrearCarta = () => {
    setMostrarVistaCrear(false);
    mostrarVistaCrear;
    navigate(`/`);
  }

  const agregarNuevaCarta = (nuevaCarta: any) => {

    const cartaNumero = {
       ...nuevaCarta,
        numero: mazo.length + 1 };
    setMazo([...mazo, cartaNumero]);

    setMostrarVistaCrear(false);
  };
  

  return (
    <div>
      <main>
        {/* El botón ahora aparece si hay al menos 1 carta, pero valida al hacer click */}
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

        <Routes>
          <Route path="/" element={
            <VistaMazo  
              mazo={mazo} 
              setMazo={setMazo} 
              seleccionarCarta={setCartaSeleccionada} 
              verDetalle={seleccionarCartaDetalle} 
              mostrarCrear={navegarCrearCarta} 
              eliminarCarta={eliminarCartaGlobal}
              seleccionadas={seleccionadas}
              toggleSeleccion={toggleSeleccion}
            />
          } />
          <Route path="/detalle/:numero" element={<VistaDetalle carta={cartaSeleccionada} noMostrar={() => { setCartaSeleccionada(false); navigate('/'); }} onEliminarDetalle={eliminarCartaGlobal} />} />
          <Route path="/crear" element={<VistaCrearCarta noMostrar={navegarCerrarCrearCarta} agregarCarta={agregarNuevaCarta} />} />
          <Route path="/editar/:numero" element={<VistaEditar carta={cartaSeleccionada} onEditar={editarCartaGlobal} />} />
          <Route path="*" element={<PaginaInexistente />} />
        </Routes>
      </main>
      
    </div>
  )
}

export default App;
