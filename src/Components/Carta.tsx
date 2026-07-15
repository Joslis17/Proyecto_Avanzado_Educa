import { useState, useRef } from 'react';
import './carta.css'

type props = {
  carta: any;
  button: any;
  button2: any;
  seleccionarCarta2: Function,
  verDetalle?: () => void,
  onEliminar?: () => void,
  isSeleccionada: boolean, // Nueva prop
  onLongPress: () => void  // Nueva prop
  totalSeleccionadas: number
  ocultarBotones?: boolean;
}

function Carta({ 
  carta,
  button,
  button2, 
  seleccionarCarta2, 
  verDetalle, 
  onEliminar, 
  isSeleccionada, 
  onLongPress, 
  totalSeleccionadas,
  ocultarBotones = false }: props) {
  
const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null); 
  
  const [isPressing, setIsPressing] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false); 
  const [blockClick, setBlockClick] = useState(false);

  const colorClase = totalSeleccionadas === 2 
    ? 'border-4 border-violet-700 shadow-violet-600 shadow-xl hover:shadow-violet-800 hover:shadow-2xl transition-all duration-300' 
    : 'border-2 border-red-700 shadow-red-400 shadow-xl hover:shadow-red-800 hover:shadow-2xl transition-all duration-300';

  const handleMouseDown = () => {
    setBlockClick(false);
    setIsPressing(true);
    setShowFeedback(false);

    feedbackTimerRef.current = setTimeout(() => {
      setShowFeedback(true);
    }, 500);

    timerRef.current = setTimeout(() => {
      onLongPress();
      setIsPressing(false);
      setShowFeedback(false);
      setBlockClick(true);
    }, 2000);
  };

  const handleMouseUp = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    
    setIsPressing(false);
    setShowFeedback(false);
  };

  return (
    <div 
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} 
      className={`bg-white p-3 rounded-2xl shadow-lg transition-all duration-500 
        ${isSeleccionada 
          ? `border-3 scale-105 ${colorClase}`
          : 'shadow-gray-400 hover:scale-106 shadow-xl hover:shadow-purple-700 transition-all duration-300'} 
        ${isPressing ? 'opacity-70 scale-95' : 'opacity-100'}`}
    >
      <div 
        className='relative w-50 h-90 border border-white rounded-2xl bg-center bg-cover m-auto my-4 
        shadow-[5px_5px_25px_rgba(110,110,110)] transition-shadow duration-400 cursor-pointer overflow-hidden'
        onClick={() => {
          if (!blockClick) {
            seleccionarCarta2({
              imagen: carta.pictureUrl,
              numero: carta.idCard,
              nombre: carta.name,
              tipo: carta.attributes.tipo,
              ataque: carta.attack,
              defensa: carta.defense,
              descripcion: carta.description,
              vida: carta.lifePoints,
              URL: carta.pictureUrl,
              habilidades_Especiales1: carta.attributes.habilidades_Especiales1,
              habilidades_Especiales2: carta.attributes.habilidades_Especiales2,
              habilidades_Especiales3: carta.attributes.habilidades_Especiales3,
            });
            verDetalle?.();
          }
          setBlockClick(false); 
        }}
        style={{backgroundImage: `url(${carta.pictureUrl})`}}>

        <h3 className='absolute top-3 left-3 text-white font-bold text-lg bg-gray-400/40 rounded-xl px-2 text-center'>
          {carta.idCard}
        </h3>

        <h3 className='absolute bottom-0 left-0 right-0 p-3 text-white font-bold text-xl bg-gradient-to-t from-white/60 to-transparent text-center break-words'>
          {carta.name}
        </h3>
      </div>

      {/* RENDERIZADO CONDICIONAL: Si ocultarBotones es true, este div no se genera en el DOM */}
      {!ocultarBotones && (
        <div className='flex items-center aling-center justify-center gap-1'>
            <button 
              disabled={isSeleccionada}
              className='border-3 rounded-[10px] border-gray-200 p-1 mx-2 my-1 cursor-pointer text-white h-12 w-25
              font-semibold text-md bg-red-800 hover:bg-red-600 hover:scale-110 transition-all shadow-lg shadow-gray-400
              hover:shadow-red-500 duration-300 flex items-center justify-center'
              onClick={(e) => { e.stopPropagation(); onEliminar?.(); }}
              >
              {button}
            </button>
            <button 
              disabled={isSeleccionada}
              onClick={(e) => {
                e.stopPropagation();
                seleccionarCarta2({...carta});
                verDetalle?.();
              }}
              className='border-3 rounded-[10px] border-gray-200 p-1 mx-2 my-1 cursor-pointer text-white h-12 w-25
                font-semibold text-md bg-purple-900 hover:bg-purple-700 hover:scale-110 transition-all shadow-lg shadow-gray-400
                hover:shadow-purple-500 duration-300 flex items-center justify-center'>
              {button2}
            </button>
        </div>    
      )}
      
      {showFeedback && (
        <div className={`text-center text-sm font-black  animate-pulse uppercase tracking-tighter
          ${isSeleccionada ? 'text-red-700' : 'text-purple-700'}`}>
          {isSeleccionada ? '¡Deseleccionando...!' : '¡Seleccionando...!'}
        </div>
      )}
    </div>
  );
}

export default Carta;