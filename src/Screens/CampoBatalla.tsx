import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Carta from '../Components/Carta'

import habilidadesData from '../../habilidades.json';

function CampoBatalla() {
  const { id1, id2 } = useParams<{ id1: string; id2: string }>()
  const navigate = useNavigate()

  // Estados del Campo de Batalla (Como en las diapos)
  const [carta1, setCarta1] = useState<any>(null)
  const [carta2, setCarta2] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const [batallaIniciada, setBatallaIniciada] = useState<boolean>(false);
  const [turnoActual, setTurnoActual] = useState<string>('C1');

  useEffect(() => {
    const buscarCartasEnAPI = async () => {
      setLoading(true)
      setError(null)
      try {
        const urlAPI = 'https://educapi-v2.onrender.com/card'
        const respuesta = await fetch(urlAPI, {
          method: 'GET',
          headers: { usersecretpasskey: 'Josl998465OS' }
        })
        const objeto = await respuesta.json()
        
        // Buscamos las cartas correspondientes en los datos devueltos
        const c1 = objeto.data.find((c: any) => c.idCard === id1)
        const c2 = objeto.data.find((c: any) => c.idCard === id2)

        if (!c1 || !c2) {
          throw new Error("No se encontraron una o ambas cartas en el servidor.")
        }

        setCarta1(c1)
        setCarta2(c2)
      } catch (err: any) {
        setError(err.message || "Error al conectar con la API")
      } finally {
        setLoading(false)
      }
    }

    buscarCartasEnAPI()
  }, [id1, id2])

  // Renderizados Condicionales de control
  if (loading) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center bg-gray-200 text-purple-900 gap-4'>
        <div className='text-3xl font-black tracking-widest animate-pulse uppercase'>
         Cargando Arena de Batalla...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center bg-gray-200 text-gray-800 gap-6 p-4 text-center'>
        <div className='bg-white border-2 border-purple-500 p-8 rounded-2xl max-w-md shadow-xl'>
          <p className='text-purple-600 text-2xl font-black uppercase tracking-wider mb-2'> Error de Carga</p>
          <p className='text-gray-600 font-medium mb-6'>{error}</p>
          <button 
            onClick={() => navigate('/')} 
            className='px-6 py-2 bg-purple-900 hover:bg-purple-700 text-white font-bold rounded-lg transition-transform hover:scale-105'
          >
            Regresar al Mazo
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-200 p-4 flex flex-col items-center justify-between pb-12'>
        
        {/* Título de la vista utilizando la clase gradiente custom */}
        <h1 className='text-gradient-custom mt-4 p-2 text-5xl md:text-6xl font-sans font-black flex text-center justify-center uppercase tracking-widest drop-shadow-sm'>
            CAMPO DE BATALLA
        </h1>

        {/* Contenedor principal de los luchadores y el VS */}
        <div className='flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 my-auto max-w-6xl w-full px-4'>
          
          {/* Contenedor Jugador 1 (Morado) */}
          {carta1 && (
            <div className='flex flex-col items-center gap-4 transition-all duration-300 filter drop-shadow-md'>
              <span className='text-white font-black text-xl tracking-widest bg-purple-900 px-6 py-1.5 rounded-full shadow-md uppercase'>
                JUGADOR 1
              </span>
              
              {/* INTERRUPTOR DE COLOR: Si la batalla inició y es su turno, se pone rojo */}
              <div className={`p-2 rounded-3xl transition-all duration-300 shadow-lg ${
                batallaIniciada && turnoActual === 'C1' 
                  ? 'bg-red-600 shadow-2xl shadow-red-500 scale-105 border-4 border-red-500 ' 
                  : 'bg-white border-2 border-purple-500/20'
              }`}>
                <Carta 
                  carta={carta1} 
                  button="Eliminar" 
                  button2="Detalles" 
                  seleccionarCarta2={() => {}} 
                  isSeleccionada={false} 
                  onLongPress={() => {}} 
                  totalSeleccionadas={2} 
                />
              </div>

              {/* Mensaje indicador debajo de la carta */}
              {batallaIniciada && turnoActual === 'C1' && (
                <span className="text-red-800 font-black text-lg bg-pink-100 px-4 py-1 rounded-full animate-bounce shadow-sm">
                   ¡Tu Turno!
                </span>
              )}
            </div>
          )}

          {/* Divisor VS (Rosado) */}
          <div className='text-center select-none py-2'>
            <h2 className='text-pink-800 font-black text-7xl md:text-8xl italic tracking-tighter drop-shadow-md animate-pulse uppercase'>
              VS
            </h2>
          </div>

          {/* Contenedor Jugador 2 (Rosa fuerte / fucsia) */}
          {carta2 && (
            <div className='flex flex-col items-center gap-4 transition-all duration-300 filter drop-shadow-md'>
              <span className='text-white font-black text-xl tracking-widest bg-pink-600 px-6 py-1.5 rounded-full shadow-md uppercase'>
                JUGADOR 2
              </span>

              {/* INTERRUPTOR DE COLOR: Si la batalla inició y es su turno, se pone rojo */}
              <div className={`p-2 rounded-3xl transition-all duration-300 shadow-lg ${
                batallaIniciada && turnoActual === 'C2' 
                  ? 'bg-red-600 shadow-2xl shadow-red-500 scale-105 border-4 border-red-500 ' 
                  : 'bg-white border-2 border-pink-500/20'
              }`}>
                <Carta 
                  carta={carta2} 
                  button="Eliminar" 
                  button2="Detalles"
                  seleccionarCarta2={() => {}} 
                  isSeleccionada={false} 
                  onLongPress={() => {}} 
                  totalSeleccionadas={2} 
                />
              </div>

              {/* Mensaje indicador debajo de la carta */}
              {batallaIniciada && turnoActual === 'C2' && (
                <span className="text-red-800 font-black text-lg bg-pink-100 px-4 py-1 rounded-full animate-bounce shadow-sm">
                   ¡Tu Turno!
                </span>
              )}
            </div>
          )}
          
        </div>

        <div className='flex gap-6 justify-center mt-8'>
          {/* Botón para regresar con el estilo Morado de tu pantalla principal */}
          <button 
            onClick={() => navigate('/')} 
            className='mt-8 px-10 py-3.5 bg-[#5c0202] hover:bg-[#940404] text-white font-black uppercase tracking-wider rounded-xl shadow-md transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-gray-200'
          >
            Terminar Batalla
          </button>
          
          <button 
            onClick={() => {
              if (!batallaIniciada) {
                // --- TU LÓGICA EXISTENTE PARA MOSTRAR LAS HABILIDADES AL EMPEZAR ---
                const idsCarta1 = carta1?.attributes?.habilidades_Especiales?.split(',') || [];
                const idsCarta2 = carta2?.attributes?.habilidades_Especiales?.split(',') || [];

                const nombresCarta1 = idsCarta1.map((id: string) => {
                  const h = habilidadesData.find((hab: any) => hab.id.toString() === id.trim().toString());
                  return h ? h.nombre : "Habilidad vacía";
                });

                const nombresCarta2 = idsCarta2.map((id: string) => {
                  const h = habilidadesData.find((hab: any) => hab.id.toString() === id.trim().toString());
                  return h ? h.nombre : "Habilidad vacía";
                });

                console.log(`Habilidades de ${carta1?.name}:`, nombresCarta1);
                console.log(`Habilidades de ${carta2?.name}:`, nombresCarta2);
                
                // Iniciamos la batalla
                setBatallaIniciada(true);
              } else {
                // --- NUEVA LÓGICA: CAMBIAR EL TURNO COMO UN INTERRUPTOR ---
                if (turnoActual === 'C1') {
                  setTurnoActual('C2'); // Si era el turno de la 1, pasa a la 2
                } else {
                  setTurnoActual('C1'); // Si era el turno de la 2, pasa a la 1
                }
              }
            }}
            className='mt-8 px-10 py-3.5 bg-purple-900 hover:bg-purple-700 text-white font-black uppercase tracking-wider rounded-xl shadow-md transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-gray-200'
          >
            {batallaIniciada ? 'Siguiente Turno' : 'Empezar Batalla'}
          </button>
        </div>
    </div>
  )
}

export default CampoBatalla;