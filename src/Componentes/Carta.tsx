import './carta.css'

type props = {
  numero: number;
  nombre: string;
  imagen: string;
  button: string;
  button2: string;

}

function Carta({
  imagen,
  nombre,
  numero,
  button,
  button2,
}: props) {

  return (
    <div className='w-60 h-110 border border-white box-border-200  rounded-2xl bg-center bg-cover
             mx-5 my-8 shadow-[0_0_60px_rgba(120,150,210)]' 
            style={{backgroundImage: `url(${imagen})`}}
                >

      <h3 className=' m-3 text-white font-bold text-lg bg-gray-400/40 rounded-xl w-12 text-center'>
        {numero}
      </h3>

      <h3 className='text-center my-5 text-white font-bold mt-85 text-2xl bg-gray-400/40'>
       {nombre}
      </h3>

      <div className='align-center justify-center flex mt-10'>
        <button 
          className='bg-gray-100 border rounded-md border-gray-300 p-1 m-2 cursor-pointer 
          text-white bg-center bg-cover bg-gradient-to-r from-[#5c0202] to-red-700 h-10 w-25 text-lg'>
          {button}
        </button>
        <button className='bg-gray-100 border rounded-md border-gray-300 p-1 m-2 cursor-pointer 
         text-white bg-center bg-cover bg-gradient-to-r from-green-400 to-green-900 h-10 w-30 text-lg'>
          {button2}
        </button>
      </div>
        
    </div>
  );
}

export default Carta