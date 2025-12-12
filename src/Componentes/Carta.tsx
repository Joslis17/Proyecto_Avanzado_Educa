import './carta.css'

type props = {
  numero: number;
  nombre: string;
  imagen: string; 
  tipo: string;
  ataque?: number;
  defensa: number;
  descripcion: string;
  vida: number;
  rareza?: string;
  habilidades_Especiales1:string,
  habilidades_Especiales2: string,
  habilidades_Especiales3:string,
  button: string;
  button2: string;
  
  seleccionarCarta2: Function

}

function Carta({
  imagen,
  nombre,
  numero,
  tipo,
  ataque,
  defensa,
  descripcion,
  vida,
  rareza,
  habilidades_Especiales1,
  habilidades_Especiales2,
  habilidades_Especiales3,
  button,
  button2,
  seleccionarCarta2
}: props) {

  return (
    <div className='bg-white p-4 rounded-2xl shadow-lg shadow-gray-400 hover:scale-106 transition-scale duration-400'>
      
      <div className='w-60 h-110 border border-white rounded-2xl bg-center bg-cover m-5 
      shadow-[0_0_20px_rgba(110,110,110)] hover:shadow-purple-900 
      transition-shadow duration-400 cursor-pointer' 
      onClick={() => seleccionarCarta2({
            imagen,
            numero,
            nombre,
            tipo,
            ataque,
            defensa,
            descripcion,
            vida,
            rareza,
            habilidades_Especiales1,
            habilidades_Especiales2,
            habilidades_Especiales3,
          })}
            style={{backgroundImage: `url(${imagen})`}}>

        <h3 className=' m-3 text-white font-bold text-2xl bg-gray-400/40 rounded-xl w-12 text-center'>
          {numero}
        </h3>

        <h3 className='text-center my-5 text-white font-bold mt-85 text-2xl bg-gray-400/40 '>
        {nombre}
        </h3>
      </div>

      <div className='align-center justify-center flex mt-10'>
          <button 
            className='border-3 rounded-[10px] border-gray-200 p-1 mx-2 my-1 cursor-pointer text-white h-13 w-28
            font-semibold text-lg bg-[#5c0202] hover:bg-[#940404] hover:scale-110 transition-background,scale,shadow 
            duration-400 shadow-lg hover:shadow-[#940404] shadow-gray-300'>
            {button}
          </button>
          <button onClick={() => seleccionarCarta2({
            imagen,
            numero,
            nombre,
            tipo,
            ataque,
            defensa,
            descripcion,
            vida,
            rareza,
            habilidades_Especiales1,
            habilidades_Especiales2,
            habilidades_Especiales3,
          })}
            className='border-3 rounded-[10px] border-gray-200 p-1 mx-2 my-1 cursor-pointer text-white h-13 w-33
              font-semibold text-lg bg-purple-900 hover:bg-purple-700 hover:scale-110 transition-background,scale,shadow 
              duration-400 shadow-lg hover:shadow-purple-500 shadow-gray-300'>
            {button2}
          </button>
      </div>    

  </div>
  );
}

export default Carta