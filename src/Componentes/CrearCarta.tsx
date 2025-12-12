import './crearCarta.css'
import fotoNavideña from '../assets/Imagenes/Componentes/White Christmas_2.png'
/* 
type props ={
    numero: number;
  nombre: string;
  imagen:string,
  habilidades_Especiales1:string,
  habilidades_Especiales2: string,
  habilidades_Especiales3:string,
  tipo: string;
  ataque?: number;
  defensa: number;
  descripcion: string;
  vida: number;
  button: string;
  rareza?: string;
} */

function CrearCarta(/* 
     habilidades_Especiales1,
  habilidades_Especiales2,
  habilidades_Especiales3,
  nombre,
  numero,
  imagen,
  ataque,
  defensa,
  descripcion,
  tipo,
  vida,
  button,
  rareza, */
) {
  return (
    <div>
        <div  className='min-h-screen flex items-center justify-center'>

            <div className=' justify-center rounded-4xl 
             shadow-xl shadow-purple-500  p-10 bg-white w-290 h-160'>

              <div className='flex'>

                  <div className='mr-4'>
                      <h1 className='text-gradient-custom text-4xl font-bold p-2 my-2 '>
                        CREA TUS PROPIAS CARTAS
                      </h1>
                      <div className='border-4 border-purple-500 rounded-2xl p-3 overflow-hidden shadow-xl hover:shadow-purple-400 transition-shadow duration-500'>
                        <img src={fotoNavideña} alt="" 
                        className='w-60 h-85 rounded-4xl scale-125'
                        />
                      </div>
                  </div>
                
                <div className=''>

                  <div className='flex gap-3'>
                    <div className='flex my-3 p-3 border-3 border-purple-800 rounded-2xl hover:scale-105 transition-scale,shadow 
                                duration-400 shadow-lg hover:shadow-purple-500'>
                        <h2 className=' m-2 text-2xl'>
                          Nombre:
                        </h2>
                        <input type="text" placeholder='Ingresa el nombre' 
                        className=' Px-2 py-1 w-60 h-12 border rounded-lg border-gray-400 hover:bg-gray-100 hover:border-gray-500 hover:shadow-gray-300 shadow-lg'
                        />
                    </div>
                    <div className='flex my-3 p-3 border-3 border-purple-800 rounded-2xl hover:scale-105 transition-scale,shadow 
                                duration-400 shadow-lg hover:shadow-purple-500'>
                        <h2 className=' m-2 text-2xl'>
                          Tipo:
                        </h2>
                        <input type="text" placeholder='Ingresa el tipo' 
                        className=' Px-2 py-1 w-60 h-12 border rounded-lg border-gray-400 hover:bg-gray-100 hover:border-gray-500 hover:shadow-gray-300 shadow-lg'
                        />
                    </div>
                  </div>

                  <div className='flex gap-4 '>

                    <div className='my-3 p-3 border-3 border-purple-800 rounded-2xl hover:scale-105 transition-scale,shadow 
                                duration-400 shadow-lg hover:shadow-purple-500'>
                      <h2 className=' m-1 text-2xl'>
                        Ataque
                      </h2>
                      <input type="text" placeholder='Ingresa el dato númerico' 
                      className='Px-2 py-1 w-60 h-12 border rounded-lg border-gray-400 hover:bg-gray-100 hover:border-gray-500 hover:shadow-gray-300 shadow-lg'
                      />
                    </div>

                    <div className='my-3 p-3 border-3 border-purple-800 rounded-2xl hover:scale-105 transition-scale,shadow 
                                duration-400 shadow-lg hover:shadow-purple-500'>
                      <h2 className=' m-2 text-2xl'>
                        Defensa
                      </h2>
                      <input type="text" placeholder='Ingresa el dato númerico' 
                      className=' Px-2 py-1 w-60 h-12 border rounded-lg border-gray-400 hover:bg-gray-100 hover:border-gray-500 hover:shadow-gray-300 shadow-lg'
                      />
                    </div>

                    <div className='my-3 p-3 border-3 border-purple-800 rounded-2xl hover:scale-105 transition-scale,shadow 
                                duration-400 shadow-lg hover:shadow-purple-500'>
                      <h2 className=' m-2 text-2xl'>
                        Vida
                      </h2>
                      <input type="text" placeholder='Ingresa el dato númerico' 
                      className=' Px-2 py-1 w-60 h-12 border rounded-lg border-gray-400 hover:bg-gray-100 hover:border-gray-500 hover:shadow-gray-300 shadow-lg'
                      />
                    </div>
                  </div>

                  <div className='my-3 p-3 border-3 border-purple-800 rounded-2xl hover:scale-105 transition-scale,shadow 
                                duration-400 shadow-lg hover:shadow-purple-500'>
                      <h2 className=' m-2 text-2xl flex justify-center'>
                        Habilidades Especiales:
                      </h2>
                      <div className='flex gap-4'>
                        <input type="text" placeholder='Ingresa la primera habilidad' 
                        className=' Px-2 py-1 w-60 h-12 border rounded-lg border-gray-400 hover:bg-gray-100 hover:border-gray-500 hover:shadow-gray-300 shadow-lg'
                        />
                        <input type="text" placeholder='Ingresa la segunda habilidad' 
                        className=' Px-2 py-1 w-60 h-12 border rounded-lg border-gray-400 hover:bg-gray-100 hover:border-gray-500 hover:shadow-gray-300 shadow-lg'
                        />
                        <input type="text" placeholder='Ingresa la tercera habilidad' 
                        className=' Px-2 py-1 w-60 h-12 border rounded-lg border-gray-400 hover:bg-gray-100 hover:border-gray-500 hover:shadow-gray-300 shadow-lg'
                        />
                      </div>
                  </div>

                  <div className='flex gap-4'>

                    <div className='flex my-3 p-3 border-3 border-purple-800 rounded-2xl hover:scale-105 transition-scale,shadow 
                                  duration-400 shadow-lg hover:shadow-purple-500'>
                        <h2 className=' m-2 text-2xl'>
                          Rareza:
                        </h2>
                        <input type="text" placeholder='Ingresa la rareza' 
                        className=' Px-2 py-1 w-60 h-12 border rounded-lg border-gray-400 hover:bg-gray-100 hover:border-gray-500 hover:shadow-gray-300 shadow-lg'
                        />
                    </div>

                    <div className='flex my-3 p-3 border-3 border-purple-800 rounded-2xl hover:scale-105 transition-scale,shadow 
                                  duration-400 shadow-lg hover:shadow-purple-500'>
                        <h2 className=' m-2 text-2xl'>
                          Descripción:
                        </h2>
                        <input type="text" placeholder='Ingresa una breve descripción' 
                        className=' Px-2 py-1 w-60 h-12 border rounded-lg border-gray-400 hover:bg-gray-100 hover:border-gray-500 hover:shadow-gray-300 shadow-lg'
                        />
                    </div>
                  </div>
                  
                </div>

              </div>

              <div className='flex justify-center items-center'>
                <button 
                  className='border-3 rounded-[10px] border-gray-200 p-1 mx-2 my-1 cursor-pointer text-white h-13 w-33
                  font-semibold text-lg bg-purple-900 hover:bg-purple-700 hover:scale-110 transition-background,scale,shadow 
                  duration-400 shadow-lg hover:shadow-purple-500 shadow-gray-300'>
                    CREAR
                </button>
              </div>
                
            </div>

        </div>
    </div>
  )
}

export default CrearCarta