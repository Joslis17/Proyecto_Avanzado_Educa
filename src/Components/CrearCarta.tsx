import './crearCarta.css'
import { useState } from 'react';

type CrearCartaProps = {
  agregarCarta: (carta: any) => void;
  noSeMuestra: Function;
};

function CrearCarta({ agregarCarta, noSeMuestra }: CrearCartaProps) {
  // Cada campo que el usuario va a rellenar:
  const [name, setName] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');
  const [tipo, setTipo] = useState("");
  const [attack, setAttack] = useState(0);
  const [defense, setDefense] = useState(0);
  const [lifePoints, setLifePoints] = useState(0);
  const [habilidad1, setHabilidad1] = useState('');
  const [habilidad2, setHabilidad2] = useState('');
  const [habilidad3, setHabilidad3] = useState('');
  const [description, setDescription] = useState('');

  const [nameError, setNameError] = useState('');
  const [pictureUrlError, setPictureUrlError] = useState('');
  const [tipoError, setTipoError] = useState('');
  const [attackError, setAttackError] = useState('');
  const [defenseError, setDefenseError] = useState('');
  const [lifePointsError, setLifePointsError] = useState('');
  const [habilidad1Error, setHabilidad1Error] = useState('');
  const [habilidad2Error, setHabilidad2Error] = useState('');
  const [habilidad3Error, setHabilidad3Error] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  const validacionCarta = () => {
    setNameError('');
    setTipoError('');
    setAttackError('');
    setDefenseError('');
    setLifePointsError('');
    setDescriptionError('');
    setPictureUrlError('');
    setHabilidad1Error('');
    setHabilidad2Error('');
    setHabilidad3Error('');

    let formularioValido = true; // Variable de control

// Validación usando operadores ternarios
  // NOMBRES Y TIPOS
  name === "" ? (setNameError("El nombre es obligatorio"), formularioValido = false) : setNameError("");
  tipo === "" ? (setTipoError("El tipo es obligatorio"), formularioValido = false) : setTipoError("");

  // ATAQUE
  Number(attack) <= 0 || isNaN(Number(attack)) 
    ? (setAttackError("El ataque debe ser mayor a 0"), formularioValido = false) 
    : setAttackError("");

  // DEFENSA (Aquí estaba el error, el false estaba fuera)
  Number(defense) <= 0 || isNaN(Number(defense)) 
    ? (setDefenseError("La defensa debe ser mayor a 0"), formularioValido = false) 
    : setDefenseError("");

  // VIDA (Aquí también estaba el error)
  Number(lifePoints) <= 0 || isNaN(Number(lifePoints)) 
    ? (setLifePointsError("La vida debe ser mayor a 0"), formularioValido = false) 
    : setLifePointsError("");

  // DESCRIPCIÓN E IMAGEN
  description === "" ? (setDescriptionError("La descripción es obligatoria"), formularioValido = false) : setDescriptionError("");
  pictureUrl === "" ? (setPictureUrlError("La URL es obligatoria"), formularioValido = false) : setPictureUrlError("");

  // HABILIDADES
  habilidad1 === "" ? (setHabilidad1Error("Obligatoria"), formularioValido = false) : setHabilidad1Error("");
  habilidad2 === "" ? (setHabilidad2Error("Obligatoria"), formularioValido = false) : setHabilidad2Error("");
  habilidad3 === "" ? (setHabilidad3Error("Obligatoria"), formularioValido = false) : setHabilidad3Error("");

    return formularioValido;
};
const manejarClickCrear = async () => {
  const esValido = validacionCarta();

  if (esValido) {
    const nuevaCartaRaw = {
      name: name,
      description: description,
      attack: attack,
      defense: defense,
      lifePoints: lifePoints,
      pictureUrl: pictureUrl,
      attributes: { 
        tipo, 
        // Cambiamos los nombres aquí para que coincidan con el mazo
        habilidades_Especiales1: habilidad1, 
        habilidades_Especiales2: habilidad2, 
        habilidades_Especiales3: habilidad3 
      }
    };

    let urlAPI = 'https://educapi-v2.onrender.com/card';

      const respuesta = await fetch(urlAPI, {
        method: 'POST',
        headers: {
          'usersecretpasskey': 'Josl998465OS',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevaCartaRaw)
      });

      const resultado = await respuesta.json();

      if (respuesta.ok) {
        // Usamos el objeto que nos devuelve la API (que ya trae su ID real)
        agregarCarta(resultado.data); 
        noSeMuestra(); // Esto navega a la pantalla principal
      } 
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
                  value={name} onChange={(e) => setName(e.target.value)} />

                </div>
                
                {nameError && <p className="text-red-500 text-[12px] text-center italic">{nameError}</p>}

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

                  <h2 className='text-sm font-semibold mr-2'>Ataque (min 100, max 500):</h2>
                  
                  <input type="number"
                  className='text-center p-1 w-16 border rounded-lg border-gray-400 hover:bg-gray-50'
                  value={attack} onChange={(e) => setAttack(Number(e.target.value))} 
                  onBlur={(e) => setAttack(Math.max(100, Math.min(500, Number(e.target.value))))} />

                </div>
                  {attackError && <p className="text-red-500 text-[11px] text-center italic">{attackError}</p>}
              </div>

              <div className='p-2 border-2 border-purple-800 rounded-2xl hover:scale-[1.02] transition-transform duration-400 shadow-lg hover:shadow-purple-500'>
                <div className='flex-1 flex items-center justify-center '>

                  <h2 className='text-sm font-semibold mr-2'>Defensa (min 300, max 500):</h2>
                  
                  <input type="number"
                  className='text-center p-1 w-16 border rounded-lg border-gray-400 hover:bg-gray-50'
                  value={defense} onChange={(e) => setDefense(Number(e.target.value))} 
                  onBlur={(e) => setDefense(Math.max(300, Math.min(500, Number(e.target.value))))} />

                </div>
                  {defenseError && <p className="text-red-500 text-[11px] text-center italic">{defenseError}</p>}
              </div>
              

              <div className='p-2 border-2 border-purple-800 rounded-2xl hover:scale-[1.02] transition-transform duration-400 shadow-lg hover:shadow-purple-500'>
                <div className='flex-1 flex items-center justify-center '>

                  <h2 className='text-sm font-semibold mr-2'>Vida (min 60,max 100):</h2>
                  
                  <input type="number"
                  className='text-center p-1 w-16 border rounded-lg border-gray-400 hover:bg-gray-50'
                  value={lifePoints} onChange={(e) => setLifePoints(Number(e.target.value))} 
                  onBlur={(e) => setLifePoints(Math.max(60, Math.min(100, Number(e.target.value))))} />

                </div>
                  {lifePointsError && <p className="text-red-500 text-[11px] text-center italic">{lifePointsError}</p>}
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
                value={pictureUrl} onChange={(e) => setPictureUrl(e.target.value)} />
                {pictureUrlError && <p className="text-red-500 text-[12px] text-center italic">{pictureUrlError}</p>}

              </div>

              <div className='flex-1 flex flex-col p-2 border-2 border-purple-800 rounded-2xl hover:scale-[1.02] transition-transform duration-400 shadow-lg hover:shadow-purple-500'>

                <h2 className='mb-1 text-ml text-center font-semibold'>Descripción:</h2>
                
                <input type="text" placeholder='Breve descripción' 
                className='text-center p-1 w-full border rounded-lg border-gray-400 hover:bg-gray-50'
                value={description} onChange={(e) => setDescription(e.target.value)} />
                {descriptionError && <p className="text-red-500 text-[12px] text-center italic">{descriptionError}</p>}

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