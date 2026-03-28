import './App.css'
import { useEffect, useState } from 'react'

import VistaMazo from "./Screens/VistaMazo"
import VistaDetalle from './Screens/VistaDetalle'
import VistaCrearCarta from './Screens/VistaCrearCarta';
import PaginaInexistente from './Screens/PaginaInexistente';
import VistaEditar from './Screens/VistaEditar';

import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';


function App() {

  const [mazo, setMazo] = useState<any[]>([
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



  const editarCartaGlobal = async (idCard: string, datosActualizados: any) => {
    
      const urlAPI = `https://educapi-v2.onrender.com/card/${idCard}`;
      const respuesta = await fetch(urlAPI, {
        method: 'PATCH', // Verifica si tu API usa PUT o PATCH
        headers: {
          'usersecretpasskey': 'Josl998465OS',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosActualizados)
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
        <Routes>
          <Route path="/" element={<VistaMazo  mazo={mazo} setMazo={setMazo} seleccionarCarta={setCartaSeleccionada} verDetalle={seleccionarCartaDetalle} mostrarCrear={navegarCrearCarta} eliminarCarta={eliminarCartaGlobal} />} />
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
