import './App.css'
import { useEffect, useState } from 'react'

import VistaMazo from "./Screens/VistaMazo"
import VistaDetalle from './Screens/VistaDetalle'
import VistaCrearCarta from './Screens/VistaCrearCarta';


import { Routes, Route, useNavigate, Await } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  const [mazo, setMazo] = useState([
    {
    idCard: "1", name: "El Payaso it", pictureUrl: "https://dmn-dallas-news-prod.cdn.arcpublishing.com/resizer/v2/DLG2TE7OJQIEWY27KKDLAGNKC4.jpg?auth=d706ae708ec1ad6c11d309b3a45da12566762a48596fd3b71b5e109be6ed78e7&quality=80&width=1200&height=1200&smart=true",
    attributes: {
      tipo: "Entidad Cosmica",
      habilidades_Especiales1: "Puede cambiar de forma.",
      habilidades_Especiales2: 'Manipular la realidad',
      habilidades_Especiales3: 'Regeneracion casi Ilimitada'
    },
    attack: 70, defense: 55, lifePoints: 100,
    description: "Un payaso terrorífico que se alimenta del miedo, y crea ilusiones muy reales para atrapar a sus víctimas."
  },
  {
    idCard: "2", name: "La Monja", pictureUrl: "https://i.pinimg.com/736x/28/0f/7c/280f7ca3d1a22c208a2798e2b2bdf4a8.jpg",
    attributes: {
      tipo: 'Demonio Alto Nivel',
      habilidades_Especiales1: 'Control Sobre la Oscuridad',
      habilidades_Especiales2: 'Posee humanos y objetos',
      habilidades_Especiales3: 'Invoca precencia menores'
    },
    attack: 100, defense: 90, lifePoints: 100,
    description: 'Es un demonio que disfruta atormentar a sus víctimas, Puede moverse entre sombras y alterar la realidad '
  },
  {
    idCard: "3", name: "Anabelle", pictureUrl: "https://m.media-amazon.com/images/I/51SQvcfnZSL.jpg",
    attributes: {
      tipo: 'Entidad Demoniaca',
      habilidades_Especiales1: 'Mover Objetos.',
      habilidades_Especiales2: 'Povoca sucesos paranormales',
      habilidades_Especiales3: 'Atrae entidades demoniacas'
    },
    attack: 80, defense: 85, lifePoints: 100,
    description: 'Una muñeca poseída por una entidad demoníaca que utiliza el miedo y la desesperación para debilitar a sus víctimas.'
  },
  {
    idCard: "4", name: "Freddy Krueger", pictureUrl: "https://i.pinimg.com/170x/40/b1/ae/40b1aec0ebdb40f8900c1dcdc541e562.jpg",
    attributes: {
      tipo: 'Entidad Demoniaca',
      habilidades_Especiales1: 'Controla los sueños',
      habilidades_Especiales2: 'Lastima físicamente',
      habilidades_Especiales3: 'Cuchillas en sus guantes'
    },
    attack: 50, defense: 45, lifePoints: 100,
    description: 'Un espíritu vengativo que habita en los sueños, donde tiene un poder ilimitado. Usa su guante de cuchillas para atacarlas.'
  }
  ]);

  const eliminarCartaGlobal = async(numero: string) => {
    setMazo(mazo.filter(carta => carta.idCard !== numero));
    setCartaSeleccionada(false); // Cerramos el detalle al eliminar

    let urlAPI = `https://educapi-v2.onrender.com/card/145`;

    const respuesta = await fetch(urlAPI,{
      method: 'DELETE', 
      headers: {
        //Josl998465OS
        usersecretpasskey:'Josl998465OS',
        "Content-Type": "application/json"
      }
    });
    console.log(respuesta)
};

  const [cartaSeleccionada, setCartaSeleccionada] = useState(false);
  const [mostrarVistaCrear, setMostrarVistaCrear] = useState(false);

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
    getCarta();
  }, []);

  return (
    <div>
      {/* {
        !cartaSeleccionada && !mostrarVistaCrear ?
        <VistaMazo 
          mazo={mazo} // Pasamos el mazo del estado de App
          setMazo={setMazo}
          seleccionarCarta={setCartaSeleccionada} 
          mostrar={() => setMostrarVistaCrear(true)}/>
        : cartaSeleccionada && !mostrarVistaCrear ?
          <VistaDetalle 
            carta={cartaSeleccionada} 
            noMostrar={() => setCartaSeleccionada(false)}
            onEliminarDetalle={eliminarCartaGlobal} />
        : //!cartaSeleccionada && mostrarVistaCrear ?
            <VistaCrearCarta 
            noMostrar={() => setMostrarVistaCrear(false)} 
            agregarCarta={agregarNuevaCarta}/>
            
            
      } */}
      
      <main>
        <Routes>
          <Route path="/" element={<VistaMazo  mazo={mazo} setMazo={setMazo} seleccionarCarta={setCartaSeleccionada} verDetalle={seleccionarCartaDetalle} mostrarCrear={navegarCrearCarta}/> } />
          <Route path="/detalle/:numero" element={<VistaDetalle carta={cartaSeleccionada} noMostrar={() => { setCartaSeleccionada(false); navigate('/'); }} onEliminarDetalle={eliminarCartaGlobal} />} />
          <Route path="/crear" element={<VistaCrearCarta noMostrar={navegarCerrarCrearCarta} agregarCarta={agregarNuevaCarta} />} />
        </Routes>
      </main>
      
    </div>
  )
}

export default App;
