import './crearCarta.css'
import { useState } from 'react';

type CrearCartaProps = {
  agregarCarta: (carta: any) => void;
  noSeMuestra: Function;
};

function CrearCarta({ agregarCarta, noSeMuestra }: CrearCartaProps) {
  // Cada campo que el usuario va a rellenar:
  const [nombre, setNombre] = useState('');
  const [imagen, setImagen] = useState('');
  const [tipo, setTipo] = useState("");
  const [ataque, setAtaque] = useState(0);
  const [defensa, setDefensa] = useState(0);
  const [vida, setVida] = useState(0);
  const [habilidad1, setHabilidad1] = useState('');
  const [habilidad2, setHabilidad2] = useState('');
  const [habilidad3, setHabilidad3] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const [nombreError, setNombreError] = useState('');
  const [imagenError, setImagenError] = useState('');
  const [tipoError, setTipoError] = useState('');
  const [ataqueError, setAtaqueError] = useState('');
  const [defensaError, setDefensaError] = useState('');
  const [vidaError, setVidaError] = useState('');
  const [habilidad1Error, setHabilidad1Error] = useState('');
  const [habilidad2Error, setHabilidad2Error] = useState('');
  const [habilidad3Error, setHabilidad3Error] = useState('');
  const [descripcionError, setDescripcionError] = useState('');

  const validacionCarta = () => {
    setNombreError('');
    setTipoError('');
    setAtaqueError('');
    setDefensaError('');
    setVidaError('');
    setDescripcionError('');
    setImagenError('');
    setHabilidad1Error('');
    setHabilidad2Error('');
    setHabilidad3Error('');

    let formularioValido = true; // Variable de control

// Validación usando operadores ternarios
  // NOMBRES Y TIPOS
  nombre === "" ? (setNombreError("El nombre es obligatorio"), formularioValido = false) : setNombreError("");
  tipo === "" ? (setTipoError("El tipo es obligatorio"), formularioValido = false) : setTipoError("");

  // ATAQUE
  Number(ataque) <= 0 || isNaN(Number(ataque)) 
    ? (setAtaqueError("El ataque debe ser mayor a 0"), formularioValido = false) 
    : setAtaqueError("");

  // DEFENSA (Aquí estaba el error, el false estaba fuera)
  Number(defensa) <= 0 || isNaN(Number(defensa)) 
    ? (setDefensaError("La defensa debe ser mayor a 0"), formularioValido = false) 
    : setDefensaError("");

  // VIDA (Aquí también estaba el error)
  Number(vida) <= 0 || isNaN(Number(vida)) 
    ? (setVidaError("La vida debe ser mayor a 0"), formularioValido = false) 
    : setVidaError("");

  // DESCRIPCIÓN E IMAGEN
  descripcion === "" ? (setDescripcionError("La descripción es obligatoria"), formularioValido = false) : setDescripcionError("");
  imagen === "" ? (setImagenError("La URL es obligatoria"), formularioValido = false) : setImagenError("");

  // HABILIDADES
  habilidad1 === "" ? (setHabilidad1Error("Obligatoria"), formularioValido = false) : setHabilidad1Error("");
  habilidad2 === "" ? (setHabilidad2Error("Obligatoria"), formularioValido = false) : setHabilidad2Error("");
  habilidad3 === "" ? (setHabilidad3Error("Obligatoria"), formularioValido = false) : setHabilidad3Error("");

    return formularioValido;
};

const manejarClickCrear = () => {
  const esValido = validacionCarta();

  if (esValido) {
    agregarCarta({
      nombre,
      imagen,
      tipo,
      ataque,
      defensa,
      vida,
      habilidades_Especiales1: habilidad1,
      habilidades_Especiales2: habilidad2,
      habilidades_Especiales3: habilidad3,
      URL: imagen,
      descripcion
    });

    noSeMuestra();
  }
};

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
      {/* Contenedor principal adaptable: max-w-6xl reemplaza w-290 */}
      <div className='bg-white rounded-4xl shadow-xl shadow-purple-500 p-3 md:p-6 w-full max-w-5xl h-auto'>
        
        <div className='flex flex-col lg:flex-row gap-4'>
          
          {/* SECCIÓN IZQUIERDA: Imagen y Título */}
          <div className='flex flex-col items-center lg:w-1/3'>

            <h1 className='text-gradient-custom text-4xl md:text-6xl lg:text-7xl font-bold p-2 mb-5 text-center lg:text-left leading-tight'>
              CREA TUS PROPIAS CARTAS
            </h1>

          </div>

          {/* SECCIÓN DERECHA: Formulario */}
          <div className='flex-1 flex flex-col gap-3 p-2'>
            
            {/* Nombre y Tipo */}
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              
              <div className='flex-1 flex flex-col p-2 border-2 border-purple-800 rounded-2xl hover:scale-[1.02] transition-transform duration-400 shadow-lg hover:shadow-purple-500'>

                <h2 className='mt-[3px] mb-1 text-ml text-center font-semibold'>Nombre:</h2>
                
                <div className='flex justify-center'>

                  <input type="text" placeholder='Ingresa el nombre' 
                  className='text-center mx-2 mb-2 p-1 w-full border rounded-lg border-gray-400 hover:bg-gray-50'
                  value={nombre} onChange={(e) => setNombre(e.target.value)} />

                </div>
                
                {nombreError && <p className="text-red-500 text-[12px] text-center italic">{nombreError}</p>}

              </div>

              <div className='flex-1 flex flex-col p-2 border-2 border-purple-800 rounded-2xl hover:scale-[1.02] transition-transform duration-400 shadow-lg hover:shadow-purple-500'>

                <h2 className='mt-[3px] mb-1 text-ml text-center font-semibold'>Tipo:</h2>
                
                <div className='flex justify-center'>

                  <input type="text" placeholder='Ingresa el tipo' 
                  className='text-center mx-2 mb-2 p-1 w-full border rounded-lg border-gray-400 hover:bg-gray-50'
                  value={tipo} onChange={(e) => setTipo(e.target.value)} />

                </div>
                
                {tipoError && <p className="text-red-500 text-[12px] text-center italic">{tipoError}</p>}

              </div>

            </div>

            {/* Ataque, Defensa y Vida */}
            <div className='flex flex-col md:flex-row gap-4 justify-center'>

              <div className='p-2 border-2 border-purple-800 rounded-2xl hover:scale-[1.02] transition-transform duration-400 shadow-lg hover:shadow-purple-500'>
                <div className='flex-1 flex items-center justify-center '>

                  <h2 className='text-sm font-semibold mr-2'>Ataque:</h2>
                  
                  <input type="number"
                  className='text-center p-1 w-16 border rounded-lg border-gray-400 hover:bg-gray-50'
                  value={ataque} onChange={(e) => setAtaque(Number(e.target.value))} />

                </div>
                  {ataqueError && <p className="text-red-500 text-[11px] text-center italic">{ataqueError}</p>}
              </div>

              <div className='p-2 border-2 border-purple-800 rounded-2xl hover:scale-[1.02] transition-transform duration-400 shadow-lg hover:shadow-purple-500'>
                <div className='flex-1 flex items-center justify-center '>

                  <h2 className='text-sm font-semibold mr-2'>Defensa:</h2>
                  
                  <input type="number"
                  className='text-center p-1 w-16 border rounded-lg border-gray-400 hover:bg-gray-50'
                  value={defensa} onChange={(e) => setDefensa(Number(e.target.value))} />

                </div>
                  {defensaError && <p className="text-red-500 text-[11px] text-center italic">{defensaError}</p>}
              </div>
              

              <div className='p-2 border-2 border-purple-800 rounded-2xl hover:scale-[1.02] transition-transform duration-400 shadow-lg hover:shadow-purple-500'>
                <div className='flex-1 flex items-center justify-center '>

                  <h2 className='text-sm font-semibold mr-2'>Vida:</h2>
                  
                  <input type="number"
                  className='text-center p-1 w-16 border rounded-lg border-gray-400 hover:bg-gray-50'
                  value={vida} onChange={(e) => setVida(Number(e.target.value))} />

                </div>
                  {vidaError && <p className="text-red-500 text-[11px] text-center italic">{vidaError}</p>}
              </div>
            </div>

            {/* Habilidades Especiales */}
            <div className='py-3 px-2 border-2 border-purple-800 rounded-2xl shadow-lg hover:shadow-purple-500'>

              <h2 className='mb-2 text-ml text-center font-semibold'>Habilidades:</h2>

              <div className='grid grid-cols-1 sm:grid-cols-3 gap-2'>

                <div className='flex flex-col items-center'>
                  <input type="text" placeholder='Habilidad 1' 
                  className='text-center p-1 w-full border rounded-lg border-gray-400 hover:bg-gray-50'
                  value={habilidad1} onChange={(e) => setHabilidad1(e.target.value)} />
                {habilidad1Error && <p className="text-red-500 text-[12px] text-center italic">{habilidad1Error}</p>}

                </div>

                <div className='flex flex-col items-center'>
                  <input type="text" placeholder='Habilidad 2' 
                  className='text-center p-1 w-full border rounded-lg border-gray-400 hover:bg-gray-50'
                  value={habilidad2} onChange={(e) => setHabilidad2(e.target.value)} />
                {habilidad2Error && <p className="text-red-500 text-[12px] text-center italic">{habilidad2Error}</p>}

                </div>

                <div className='flex flex-col items-center'>
                  <input type="text" placeholder='Habilidad 3' 
                  className='text-center p-1 w-full border rounded-lg border-gray-400 hover:bg-gray-50'
                  value={habilidad3} onChange={(e) => setHabilidad3(e.target.value)} />
                {habilidad3Error && <p className="text-red-500 text-[12px] text-center italic">{habilidad3Error}</p>}

                </div>

              </div>

            </div>

            {/* Link e Imagen */}
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              
              <div className='flex-1 flex flex-col p-2 border-2 border-purple-800 rounded-2xl hover:scale-[1.02] transition-transform duration-400 shadow-lg hover:shadow-purple-500'>

                <h2 className='mb-1 text-ml text-center font-semibold'>Link de Imagen:</h2>
                
                <input type="text" placeholder='URL de imagen' 
                className='text-center p-1 w-full border rounded-lg border-gray-400 hover:bg-gray-50'
                value={imagen} onChange={(e) => setImagen(e.target.value)} />
                {imagenError && <p className="text-red-500 text-[12px] text-center italic">{imagenError}</p>}

              </div>

              <div className='flex-1 flex flex-col p-2 border-2 border-purple-800 rounded-2xl hover:scale-[1.02] transition-transform duration-400 shadow-lg hover:shadow-purple-500'>

                <h2 className='mb-1 text-ml text-center font-semibold'>Descripción:</h2>
                
                <input type="text" placeholder='Breve descripción' 
                className='text-center p-1 w-full border rounded-lg border-gray-400 hover:bg-gray-50'
                value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                {descripcionError && <p className="text-red-500 text-[12px] text-center italic">{descripcionError}</p>}

              </div>

            </div>

          </div>
        </div>

        {/* Botón Final Centrado */}
        <div className='flex justify-center mt-6'>
          <button 
            onClick={manejarClickCrear}
            className='bg-purple-900 hover:bg-purple-700 text-white font-bold py-2 px-10 rounded-xl transition-all duration-400 hover:scale-110 shadow-lg hover:shadow-purple-500'
          >
            CREAR
          </button>
        </div>

      </div>
    </div>
  )
}

export default CrearCarta;