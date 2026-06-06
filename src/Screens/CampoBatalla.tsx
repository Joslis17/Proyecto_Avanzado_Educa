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

  // --- LÓGICA REUTILIZABLE PARA EXTRAER LOS NOMBRES DE LAS 3 HABILIDADES REALES ---
  const obtenerHabilidadesCarta = (carta: any) => {
    const cadenaIds = carta?.attributes?.habilidades_Especiales || "";
    const ids = cadenaIds ? cadenaIds.split(',') : [];
    return ids.map((id: string) => {
      const h = habilidadesData.find((hab: any) => hab.id.toString() === id.trim().toString());
      return h ? h.nombre : "Habilidad Vacía";
    });
  };

  const habilidadesC1 = obtenerHabilidadesCarta(carta1);
  const habilidadesC2 = obtenerHabilidadesCarta(carta2);


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
            <div className='flex flex-col items-center gap-4 transition-all duration-300 hover:scale-105 filter drop-shadow-md'>
              <span className='text-white font-black text-xl tracking-widest bg-purple-900 px-6 py-1.5 rounded-full shadow-md uppercase'>
                JUGADOR 1
              </span>
              
              {/* Contenedor que cambia a borde Rojo si es su turno */}
              <div className={`p-2 rounded-3xl transition-all duration-300 shadow-lg ${
                batallaIniciada && turnoActual === 'C1'
                  ? 'bg-red-600 shadow-2xl shadow-red-500 scale-105 border-4 border-red-500 animate-pulse'
                  : 'bg-white border-2 border-purple-500/20'
              }`}>
                
                {/* TRUCO LÓGICO: Si la batalla inició, inyectamos una clase para ocultar los botones nativos de la carta */}
                <div className={batallaIniciada ? '[&_button]:hidden pb-4' : ''}>
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
              </div>

              {/* LÓGICA DE SUS 3 BOTONES DE HABILIDADES: Solo se muestran si inició la batalla y es el turno de C1 */}
              {batallaIniciada && turnoActual === 'C1' ? (
                <div className='flex flex-col gap-2 w-full mt-2 animate-fadeIn px-2'>
                  {habilidadesC1.map((nombreHab, index) => (
                    <button
                      key={index}
                      className='border-2 rounded-[10px] border-gray-200 p-2 text-white font-bold text-sm bg-purple-900 hover:bg-purple-700 hover:scale-105 transition-all shadow-md uppercase tracking-wider'
                      onClick={() => console.log(`Jugador 1 usó: ${nombreHab}`)}
                    >
                      {nombreHab}
                    </button>
                  ))}
                </div>
              ) : batallaIniciada && (
                /* Si la batalla inició pero NO es su turno, dejamos un espacio vacío bloqueado o no mostramos nada */
                <div className='h-[120px]' /> 
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
            <div className='flex flex-col items-center gap-4 transition-all duration-300 hover:scale-105 filter drop-shadow-md'>
              <span className='text-white font-black text-xl tracking-widest bg-pink-600 px-6 py-1.5 rounded-full shadow-md uppercase'>
                JUGADOR 2
              </span>
              
              {/* Contenedor que cambia a borde Rojo si es su turno */}
              <div className={`p-2 rounded-3xl transition-all duration-300 shadow-lg ${
                batallaIniciada && turnoActual === 'C2'
                  ? 'bg-red-600 shadow-2xl shadow-red-500 scale-105 border-4 border-red-500 animate-pulse'
                  : 'bg-white border-2 border-pink-500/20'
              }`}>
                
                {/* TRUCO LÓGICO: Si la batalla inició, inyectamos una clase para ocultar los botones nativos de la carta */}
                <div className={batallaIniciada ? '[&_button]:hidden pb-4' : ''}>
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
              </div>

              {/* LÓGICA DE SUS 3 BOTONES DE HABILIDADES: Solo se muestran si inició la batalla y es el turno de C2 */}
              {batallaIniciada && turnoActual === 'C2' ? (
                <div className='flex flex-col gap-2 w-full mt-2 animate-fadeIn px-2'>
                  {habilidadesC2.map((nombreHab, index) => (
                    <button
                      key={index}
                      className='border-2 rounded-[10px] border-gray-200 p-2 text-white font-bold text-sm bg-pink-600 hover:bg-pink-500 hover:scale-105 transition-all shadow-md uppercase tracking-wider'
                      onClick={() => console.log(`Jugador 2 usó: ${nombreHab}`)}
                    >
                      {nombreHab}
                    </button>
                  ))}
                </div>
              ) : batallaIniciada && (
                /* Si la batalla inició pero NO es su turno, dejamos un espacio vacío para mantener la simetría visual */
                <div className='h-[120px]' />
              )}
            </div>
          )}
          
        </div>

        <div className='flex gap-6 justify-center mt-8'>
          {/* Botón para regresar con el estilo Morado de tu pantalla principal */}
        <button 
          onClick={() => navigate('/')} 
          className='mt-8 px-10 py-3.5 bg-[#5c0202] hover:bg-[#940404] text-white font-black uppercase tracking-wider rounded-xl shadow-md transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-gray-200'
        >\
          Terminar Batalla
        </button>
        <button 
          onClick={() => {
            if (!batallaIniciada) {
              // Iniciamos la batalla y mostramos la primera configuración de turno
              setBatallaIniciada(true);
            } else {
              // Cambiar turno como interruptor alternador continuo
              if (turnoActual === 'C1') {
                setTurnoActual('C2');
              } else {
                setTurnoActual('C1');
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

export default CampoBatalla