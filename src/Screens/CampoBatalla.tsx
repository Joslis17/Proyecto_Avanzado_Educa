import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Carta from '../Components/Carta'

import { Ghost, Swords, Shield, Heart } from 'lucide-react'

import habilidadesData from '../../habilidades.json';

function CampoBatalla() {
  const { id1, id2 } = useParams<{ id1: string; id2: string }>()
  const navigate = useNavigate()

  // Estados del Campo de Batalla estáticos originales
  const [carta1, setCarta1] = useState<any>(null)
  const [carta2, setCarta2] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const [batallaIniciada, setBatallaIniciada] = useState<boolean>(false);
  const [turnoActual, setTurnoActual] = useState<string>('C1');
  const [ganador, setGanador] = useState<string | null>(null);

  // --- ESTADOS DINÁMICOS PARA LA LÓGICA DE COMBATE ---
  const [vidaC1, setVidaC1] = useState<number>(0);
  const [vidaC2, setVidaC2] = useState<number>(0);
  
  const [ataqueC1, setAtaqueC1] = useState<number>(0);
  const [ataqueC2, setAtaqueC2] = useState<number>(0);

  const [defensaC1, setDefensaC1] = useState<number>(0);
  const [defensaC2, setDefensaC2] = useState<number>(0);

  const [miedoC1, setMiedoC1] = useState<number>(0);
  const [miedoC2, setMiedoC2] = useState<number>(0);

  // Valores base/iniciales fijados al cargar para la fórmula matemática
  const [ataqueBaseC1, setAtaqueBaseC1] = useState<number>(1);
  const [ataqueBaseC2, setAtaqueBaseC2] = useState<number>(1);

  // Valores máximos de vida inicial para calcular el porcentaje de la barra de salud
  const [maxVidaC1, setMaxVidaC1] = useState<number>(1);
  const [maxVidaC2, setMaxVidaC2] = useState<number>(1);

  // Función para restaurar los valores iniciales de las cartas
  const reiniciarEstadisticasCombate = (c1: any, c2: any, iniciarInmediatamente: boolean = false) => {
    if (!c1 || !c2) return;
    setVidaC1(c1.lifePoints || 100);
    setMaxVidaC1(c1.lifePoints || 100);
    setAtaqueC1(c1.attack || 50);
    setAtaqueBaseC1(c1.attack || 50);
    setDefensaC1(c1.defense || 30);
    setMiedoC1(0);

    setVidaC2(c2.lifePoints || 100);
    setMaxVidaC2(c2.lifePoints || 100);
    setAtaqueC2(c2.attack || 50);
    setAtaqueBaseC2(c2.attack || 50);
    setDefensaC2(c2.defense || 30);
    setMiedoC2(0);

    setTurnoActual('C1');
    setGanador(null);
    setBatallaIniciada(iniciarInmediatamente);
  };

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
        
        const c1 = objeto.data.find((c: any) => c.idCard === id1)
        const c2 = objeto.data.find((c: any) => c.idCard === id2)

        if (!c1 || !c2) {
          throw new Error("No se encontraron una o ambas cartas en el servidor.")
        }

        setCarta1(c1)
        setCarta2(c2)

        // Inicializamos las estadísticas mutables basadas en el JSON de la API
        setVidaC1(c1.lifePoints || 100);
        setMaxVidaC1(c1.lifePoints || 100);
        setAtaqueC1(c1.attack || 50);
        setAtaqueBaseC1(c1.attack || 50);
        setDefensaC1(c1.defense || 30);
        setMiedoC1(0);

        setVidaC2(c2.lifePoints || 100);
        setMaxVidaC2(c2.lifePoints || 100);
        setAtaqueC2(c2.attack || 50);
        setAtaqueBaseC2(c2.attack || 50);
        setDefensaC2(c2.defense || 30);
        setMiedoC2(0);

      } catch (err: any) {
        setError(err.message || "Error al conectar con la API")
      } finally {
        setLoading(false)
      }
    }

    buscarCartasEnAPI()
  }, [id1, id2])

  // --- LÓGICA DE COMBATE REVISADA Y CORREGIDA ---
  const ejecutarAtaque = (valorHabilidad: number, nombreHabilidad: string) => {
    console.log(`Usando habilidad: ${nombreHabilidad}`);
    if (ganador) return;

    const esJ1 = turnoActual === 'C1';
    const ataqueEmisorActual = esJ1 ? ataqueC1 : ataqueC2;
    const vidaReceptor = esJ1 ? vidaC2 : vidaC1;
    const setVidaReceptor = esJ1 ? setVidaC2 : setVidaC1;
    const setAtaqueEmisor = esJ1 ? setAtaqueC1 : setAtaqueC2;

    // 1. REGLA: Derrota automática si el ataque es 0
    if (ataqueEmisorActual <= 0) {
      setVidaReceptor(0);
      setGanador(esJ1 ? (carta2?.name || "Jugador 2") : (carta1?.name || "Jugador 1"));
      return;
    }

    setAtaqueEmisor(Math.max(0, ataqueEmisorActual - valorHabilidad));

    const defensaActual = esJ1 ? defensaC2 : defensaC1;
    const miedoActual = esJ1 ? miedoC2 : miedoC1;
    const ataqueBaseEmisor = esJ1 ? ataqueBaseC1 : ataqueBaseC2;

    let danoFinal = 0;

    // 2. REGLA: Si el miedo es mayor o igual a 100 (tope), daño crítico
    if (miedoActual >= 100) {
      danoFinal = 150; 
    } 
      // Si el miedo es mayor o igual a 50, daño moderado
    else if (miedoActual >= 50) {
      danoFinal = 50;
    }
    // 3. REGLA: Si la defensa es 0, ataque directamente a la vida (daño base)
    else if (defensaActual <= 0) {
      danoFinal = ataqueBaseEmisor;
    } 
    // 4. REGLA: Si la defensa es > 0, usamos la fórmula exacta del diagrama
    else {
      const valorActualizado = valorHabilidad >= 50 ? defensaActual : miedoActual;
      // Fórmula: DañoBase * (Ataque / (Ataque + ValorActualizado + 5))
      danoFinal = Math.floor(ataqueBaseEmisor * (valorHabilidad / (valorHabilidad + valorActualizado + 200)));
    }
    // Aplicamos el azar AL FINAL, después de que el daño ya fue decidido
    const variacion = 0.9 + Math.random() * 0.2; 
    danoFinal = Math.floor(danoFinal * variacion);

    // Asegurar que el daño sea al menos 0
    const danoReal = Math.max(0, danoFinal);
    const vidaResultante = Math.max(0, vidaReceptor - danoReal);
  
    setVidaReceptor(vidaResultante);

    // Actualizar estados secundarios
    if (valorHabilidad >= 50) {
      const setDefensaReceptor = esJ1 ? setDefensaC2 : setDefensaC1;
      setDefensaReceptor(Math.max(0, defensaActual - valorHabilidad));
    } else {
      const setMiedoReceptor = esJ1 ? setMiedoC2 : setMiedoC1;
      setMiedoReceptor(Math.min(100, miedoActual + valorHabilidad));
    } 

    if (vidaResultante <= 0) {
      setGanador(esJ1 ? (carta1?.name || "Jugador 1") : (carta2?.name || "Jugador 2"));
    } else {
      setTurnoActual(esJ1 ? 'C2' : 'C1');
    }
  };

  // Manejador dinámico inteligente para el botón de salida / detención / reinicio de vista
  const manejarBotonRojo = () => {
    if (!batallaIniciada) {
      // Caso 1: Antes de empezar, te saca a la vista del mazo
      navigate('/');
    } else if (batallaIniciada && !ganador) {
      // Caso 2: Durante el juego, interrumpe la pelea
      setGanador("Batalla Interrumpida");
    } else if (ganador) {
      // Caso 3: Terminada la pelea, limpia la mesa sin sacarte
      reiniciarEstadisticasCombate(carta1, carta2, false);
    }
  };

  // --- FUNCIÓN AUXILIAR: Mapea y devuelve los botones morados para cada habilidad ---
  const obtenerBotonesHabilidades = (carta: any) => {
    const cadenaHabilidades = carta?.attributes?.habilidades_Especiales || "";
    if (!cadenaHabilidades) return null;

    const idsHabilidades = cadenaHabilidades.split(',');
    const listaHabilidadesJSON = Array.isArray(habilidadesData) ? habilidadesData : [];

    return idsHabilidades.map((id: string, index: number) => {
      const h = listaHabilidadesJSON.find((hab: any) => hab.id.toString() === id.trim().toString());
      const nombreHabilidad = h ? h.nombre : "Habilidad vacía";
      const valorHabilidad = h ? Number(h.ataque) : 0;

      return (
        <button
          key={index}
          disabled={!!ganador}
          className={` px-5 py-3 border-2 border-purple-400 rounded-xl text-white font-semibold text-sm 
                    bg-purple-900 hover:bg-purple-700 transition-all duration-300 shadow-md ${ganador ? 'opacity-50' : ''}`}
          onClick={() => ejecutarAtaque(valorHabilidad, nombreHabilidad)}
        >
          {nombreHabilidad} 
        </button>
      );
    });
  };

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
  const renderStats = (miedo: number, ataque: number, defensa: number) => (
    <div className="flex justify-center gap-7 mb-4 bg-white/50 p-4 rounded-xl border border-gray-200 shadow-sm w-full">
      <div className="flex flex-col items-center">
        <Ghost className="w-8 h-8 text-blue-500 stroke-[1.5]" />
        <span className="text-blue-900 font-black text-sm">{miedo}</span>
      </div>
      <div className="flex flex-col items-center">
        <Swords className="w-8 h-8 text-red-500 stroke-[1.5]" />
        <span className="text-red-900 font-black text-sm">{ataque}</span>
      </div>
      <div className="flex flex-col items-center">
        <Shield className="w-8 h-8 text-green-600 stroke-[1.5]" />
        <span className="text-green-900 font-black text-sm">{defensa}</span>
      </div>
    </div>
  );

  return (
    <div className='min-h-screen bg-gray-200 p-4 flex flex-col items-center justify-between pb-12'>
        
        <h1 className='text-gradient-custom mt-4 p-2 text-5xl md:text-6xl font-sans font-black flex text-center justify-center uppercase tracking-widest drop-shadow-sm'>
            CAMPO DE BATALLA
        </h1>

        {/* Modal de Victoria / Interrupción */}
        {ganador && (
          <div className="bg-yellow-100 border-4 border-yellow-500 text-yellow-900 px-6 py-4 rounded-2xl shadow-2xl mb-6 text-center max-w-lg animate-bounce">
            <h3 className="text-2xl font-black uppercase">¡COMBATE TERMINADO!</h3>
            <p className="text-lg font-bold mt-1">
              {ganador === "Batalla Interrumpida" ? (
                <span>La batalla ha sido finalizada por el usuario.</span>
              ) : (
                <span>La carta <span className="underline">{ganador}</span> ha destruido a su oponente.</span>
              )}
            </p>
          </div>
        )}

        {/* Contenedor principal de los luchadores y el VS */}
        <div className='flex flex-row items-start justify-center gap-2 md:gap-20 my-auto max-w-7xl w-full px-2 overflow-x-auto'>
          
          {/* Contenedor Jugador 1 */}
          {carta1 && (
            <div className='flex flex-col items-center gap-4 transition-all duration-300 filter drop-shadow-md w-1/2 md:w-auto'>
              <span className='text-white font-black text-sm md:text-xl tracking-widest bg-purple-900 px-4 md:px-6 py-1.5 rounded-full shadow-md uppercase text-center'>
                JUGADOR 1
              </span>

              {batallaIniciada && renderStats(miedoC1, ataqueC1, defensaC1)}
              
              <div className="flex flex-row items-center gap-3">
                <div className={`p-1 md:p-2 rounded-3xl transition-all duration-300 shadow-lg ${
                  batallaIniciada && turnoActual === 'C1' && !ganador
                    ? 'bg-red-600 shadow-2xl shadow-red-700 scale-105 border-4 border-red-500 ' 
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
                    ocultarBotones={true}
                  />
                </div>

                {/* BARRA LATERAL DE VIDA */}
                {batallaIniciada && (
                  <div className="flex flex-col items-center bg-white p-2 rounded-xl border border-gray-300 h-[280px] w-12 justify-between shadow-sm">
                    <Heart className="w-8 h-8 text-red-600 stroke-[1.5]" />
                    <div className="w-4 bg-gray-200 rounded-full h-full flex flex-col justify-end overflow-hidden border border-gray-300">
                      <div className="bg-red-600 w-full transition-all duration-500 rounded-b-full" style={{ height: `${(vidaC1 / maxVidaC1) * 100}%` }}></div>
                    </div>
                    <span className="text-[10px] font-bold text-gray-700">{vidaC1}</span>
                  </div>
                )}
              </div>

              {batallaIniciada && turnoActual === 'C1' && !ganador && (
                <>
                  <span className="text-red-800 font-black text-sm md:text-lg bg-gray-100 px-4 py-1 rounded-full animate-bounce shadow-sm">
                    ¡Tu Turno!
                  </span>
                  
                  <div className="flex flex-row flex-wrap gap-2 justify-center w-full max-w-[320px] mt-2">
                    {obtenerBotonesHabilidades(carta1)}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Divisor VS */}
          <div className='text-center select-none py-2 align-self-center self-center px-1 md:px-4'>
            <h2 className='text-pink-800 font-black text-4xl md:text-8xl italic tracking-tighter drop-shadow-md animate-pulse uppercase'>
              VS
            </h2>
          </div>

          {/* Contenedor Jugador 2 */}
          {carta2 && (
            <div className='flex flex-col items-center gap-4 transition-all duration-300 filter drop-shadow-md w-1/2 md:w-auto'>
              <span className='text-white font-black text-sm md:text-xl tracking-widest bg-pink-600 px-4 md:px-6 py-1.5 rounded-full shadow-md uppercase text-center'>
                JUGADOR 2
              </span>

              {batallaIniciada && renderStats(miedoC2, ataqueC2, defensaC2)}

              <div className="flex flex-row items-center gap-3">
                {/* BARRA LATERAL DE VIDA */}
                {batallaIniciada && (
                  <div className="flex flex-col items-center bg-white p-2 rounded-xl border border-gray-300 h-[280px] w-12 justify-between shadow-sm">
                    <Heart className="w-8 h-8 text-red-600 stroke-[1.5]" />
                    <div className="w-4 bg-gray-200 rounded-full h-full flex flex-col justify-end overflow-hidden border border-gray-300">
                      <div className="bg-red-600 w-full transition-all duration-500 rounded-b-full" style={{ height: `${(vidaC2 / maxVidaC2) * 100}%` }}></div>
                    </div>
                    <span className="text-[10px] font-bold text-gray-700">{vidaC2}</span>
                  </div>
                )}

                <div className={`p-1 md:p-2 rounded-3xl transition-all duration-300 shadow-lg ${
                  batallaIniciada && turnoActual === 'C2' && !ganador
                    ? 'bg-red-600 shadow-2xl shadow-red-700 scale-105 border-4 border-red-500 ' 
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
                    ocultarBotones={true}
                  />
                </div>
              </div>

              {batallaIniciada && turnoActual === 'C2' && !ganador && (
                <>
                  <span className="text-red-800 font-black text-sm md:text-lg bg-gray-100 px-4 py-1 rounded-full animate-bounce shadow-sm">
                    ¡Tu Turno!
                  </span>
                  
                  <div className="flex flex-row flex-wrap gap-2 justify-center w-full max-w-[320px] mt-2">
                    {obtenerBotonesHabilidades(carta2)}
                  </div>
                </>
              )}
            </div>
          )}
          
        </div>

        {/* CONTROLES INFERIORES DINÁMICOS */}
        <div className='flex gap-6 justify-center mt-8'>
          <button 
            onClick={manejarBotonRojo} 
            className='mt-8 px-10 py-3.5 bg-[#5c0202] hover:bg-[#940404] text-white font-black uppercase tracking-wider rounded-xl shadow-md transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-gray-200'
          >
            {batallaIniciada && !ganador ? 'Terminar Batalla' : 'Salir'}
          </button>
          
          {/* Botón Morado de "Empezar Batalla" (Vista Inicial Limpia) */}
          {!batallaIniciada && !ganador && (
            <button 
              onClick={() => setBatallaIniciada(true)}
              className='mt-8 px-10 py-3.5 bg-purple-900 hover:bg-purple-700 text-white font-black uppercase tracking-wider rounded-xl shadow-md transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-gray-200'
            >
              Empezar Batalla
            </button>
          )}

          {/* NUEVO BOTÓN: "Volver a Empezar" (Solo se muestra cuando la batalla ha concluido) */}
          {ganador && (
            <button 
              onClick={() => reiniciarEstadisticasCombate(carta1, carta2, true)}
              className='mt-8 px-10 py-3.5 bg-purple-900 hover:bg-purple-700 text-white font-black uppercase tracking-wider rounded-xl shadow-md transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-gray-200 animate-pulse shadow-purple-500/50'
            >
              Volver a Empezar
            </button>
          )}
        </div>
    </div>
  )
}

export default CampoBatalla;