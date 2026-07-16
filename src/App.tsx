import './App.css'
import { useEffect, useState } from 'react'

import VistaMazo from "./Screens/VistaMazo"
import VistaDetalle from './Screens/VistaDetalle'
import VistaCrearCarta from './Screens/VistaCrearCarta';
import PaginaInexistente from './Screens/PaginaInexistente';
import VistaEditar from './Screens/VistaEditar';
import CampoBatalla from './Screens/CampoBatalla';
import VistaGenerarCarta from './Screens/VistaGenerarCarta';
import VistaPlay from './Screens/VistaPlay'

import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';


function App() {

  const [mazo, setMazo] = useState<any[]>([])

  const navigate = useNavigate();
  const location = useLocation(); // 2. Obtener la ubicación actual

  const [cartaSeleccionada, setCartaSeleccionada] = useState(false);
  const [mostrarVistaCrear, setMostrarVistaCrear] = useState(false);

  // ESTADO DE CARGA PRINCIPAL
  const [loading, setLoading] = useState<boolean>(true);

  const getCarta = async () => {
    let urlAPI = 'https://educapi-v2.onrender.com/card';
    let conectado = false;

    // Bucle para que si falla la API, siga cargando y reintentando en segundo plano
    while (!conectado) {
      try {
        const respuesta = await fetch(urlAPI, {
          method: 'GET', 
          headers: {
            usersecretpasskey: 'Josl998465OS'
          }
        });

        if (!respuesta.ok) {
          throw new Error("Respuesta incorrecta del servidor");
        }

        const objeto = await respuesta.json();
        setMazo(objeto.data);
        console.log(objeto.data);
        
        // Si todo sale bien, salimos del bucle y apagamos la pantalla de carga
        conectado = true;
        setLoading(false);
      } catch (error) {
        console.log("La API falló, reintentando conexión en 3 segundos...", error);
        // Espera 3 segundos antes de volver a intentar el fetch
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    }
  }

  useEffect(() => {
    console.log("La ruta cambió a:", location.pathname);
    getCarta();
  }, []);


  const editarCartaGlobal = async (idCard: string, datosActualizados: any) => {
    
      const urlAPI = `https://educapi-v2.onrender.com/card/${idCard}`;
      
      // Unimos las habilidades en una sola cadena de texto separada por comas
      // Soportando tanto si vienen del componente de edición como hab1, hab2, hab3
      const lasHabilidades = [
        datosActualizados.attributes?.habilidades_Especiales1,
        datosActualizados.attributes?.habilidades_Especiales2,
        datosActualizados.attributes?.habilidades_Especiales3
      ].filter(id => id !== undefined && id !== "").join(",");

      const respuesta = await fetch(urlAPI, {
        method: 'PATCH', // Verifica si tu API usa PUT o PATCH
        headers: {
          'usersecretpasskey': 'Josl998465OS',
          'Content-Type': 'application/json'
        },
        // Enviamos el body estructurado correctamente para la API
        body: JSON.stringify({ 
          name: datosActualizados.name, 
          description: datosActualizados.description, 
          pictureUrl: datosActualizados.pictureUrl, 
          attack: Number(datosActualizados.attack), 
          defense: Number(datosActualizados.defense), 
          lifePoints: Number(datosActualizados.lifePoints), 
          attributes: { 
            tipo: datosActualizados.attributes.tipo, 
            // Enviamos el string mapeado que la API sí acepta
            habilidades_Especiales: lasHabilidades || datosActualizados.attributes.habilidades_Especiales
          } 
        })
      });
        
      const resultado = await respuesta.json();

      if (respuesta.status === 200 || respuesta.status === 204) {
        setMazo(mazo.map(carta => carta.idCard === idCard ? { ...carta, ...datosActualizados } : carta));
     
        await getCarta();
        navigate('/mazo'); 
        setCartaSeleccionada(resultado.data); 

        console.log("Carta actualizada con éxito");
      } else {
        console.error("Error de la API al editar:", resultado);
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
      navigate('/mazo');
    }
  };



  const seleccionarCartaDetalle = (carta: any) => {
    setCartaSeleccionada(carta);
    // Usamos el id de la carta, o en su defecto el número secuencial si es nueva
    const idRuta = carta.idCard || carta.numero;
    navigate(`/detalle/${idRuta}`);
};

  const navegarCrearCarta = () => {
    setMostrarVistaCrear(true);
    navigate(`/crear`);
  };

  const navegarCerrarCrearCarta = () => {
    setMostrarVistaCrear(false);
    mostrarVistaCrear;
    navigate(`/mazo`);
  }

  const agregarNuevaCarta = (nuevaCarta: any) => {
    const cartaNumero = {
       ...nuevaCarta,
        numero: mazo.length + 1 };
    setMazo([...mazo, cartaNumero]);
    setMostrarVistaCrear(false);
  };

  const irBatalla = (idCarta1: string, idCarta2: string) => {
    navigate (`/CampoBatalla/${idCarta1}/${idCarta2}`)
  }
  

  // RENDERIZADO CONDICIONAL DE CARGA ESTILO GRIS, MORADO Y ROSADO
  if (loading) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center'>
        <div className='text-5xl tracking-widest fuente_terror bg-gradient-to-b from-red-700 
          to-red-500 bg-clip-text text-transparent font-sans mt-2 p-2  font-bold flex text-center justify-center
          drop-shadow-xl drop-shadow-red-300 [-webkit-text-stroke:1px_white] animate-pulse uppercase px-4'>
          Entrando a la oscuridad...
        </div>
      </div>
    );
  }
  const recargarMazo = async () => {
    await getCarta(); // Esta función ya la tienes definida
  };

  return (
    <div>
      <main>
        <Routes>
          <Route path="/mazo" element={
            <VistaMazo  
              mazo={mazo} 
              setMazo={setMazo} 
              seleccionarCarta={setCartaSeleccionada} 
              verDetalle={seleccionarCartaDetalle} 
              mostrarCrear={navegarCrearCarta} 
              eliminarCarta={eliminarCartaGlobal}
              irBatalla={irBatalla}
            />
          } />
          <Route path="/detalle/:numero" element={<VistaDetalle carta={cartaSeleccionada} noMostrar={() => { setCartaSeleccionada(false); navigate('/mazo'); }} onEliminarDetalle={eliminarCartaGlobal} />} />
          <Route path="/crear" element={<VistaCrearCarta noMostrar={navegarCerrarCrearCarta} agregarCarta={agregarNuevaCarta} />} />
          <Route path="/editar/:numero" element={<VistaEditar carta={cartaSeleccionada} onEditar={editarCartaGlobal} />} />
          <Route path="*" element={<PaginaInexistente />} />
          <Route path="/CampoBatalla/:id1/:id2" element={<CampoBatalla />} />
          <Route path="/generar-carta-ia" element={<VistaGenerarCarta recargarMazo={recargarMazo} />} />
          <Route path='/' element={<VistaPlay/>} />
        </Routes>
      </main>
    </div>
  )
}

export default App;