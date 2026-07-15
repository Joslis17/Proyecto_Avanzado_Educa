import './crearCarta.css'
import { useState } from 'react';

import habilidadesData from '../../habilidades.json';
import { Swords, Shield, Heart } from 'lucide-react'
import { MdClear } from "react-icons/md";

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
    // Unimos los IDs de las habilidades en una sola cadena de texto separada por comas
    // Ejemplo resultado: "1,5,7"
    const cadenaHabilidades = [habilidad1, habilidad2, habilidad3]
      .filter(id => id !== "") // Quitamos campos vacíos si los hay
      .join(",");

    const nuevaCartaRaw = {
      name: name,
      description: description,
      attack: Number(attack),
      defense: Number(defense),
      lifePoints: Number(lifePoints),
      pictureUrl: pictureUrl,
      attributes: { 
        tipo: tipo, 
        // Cambiamos los 3 campos por el único que tu API acepta y reconoce
        habilidades_Especiales: cadenaHabilidades 
      }
    };

    try {
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
        agregarCarta(resultado.data); 
        noSeMuestra();
      } else {
        console.error("Error detallado de la API:", resultado);
        alert(`Error al crear: ${resultado.message || 'Revisa los datos enviados'}`);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  }
};  
  const renderSelectHabilidad = (value: string, setter: (v: string) => void, error: string) => (
        <div className='flex flex-col items-center w-full'>
          <select 
            className='text-center p-1 w-full border rounded-lg border-gray-400 bg-white hover:bg-gray-50'
            value={value} 
            onChange={(e) => setter(e.target.value)}
          >
            <option value="">Selecciona habilidad</option>
            {habilidadesData.map((hab) => (
              <option key={hab.id} value={hab.id}>
                {hab.nombre} (Atq: {hab.ataque})
              </option>
            ))}
          </select>
          {error && <p className="text-red-500 text-[12px] text-center italic">{error}</p>}
        </div>
    );

  return (
    <div className='min-h-screen flex items-center justify-center p-4 bg-gray-200 backdrop-blur-sm fixed inset-0 z-50 text-black'>
      {/* Reducimos p-8 a p-4 y max-w-5xl a max-w-3xl para que sea más estrecho */}
      <div className='relative bg-white rounded-3xl shadow-xl shadow-purple-500 p-4 md:p-6 w-full max-w-xl h-auto overflow-y-auto max-h-[95vh] flex flex-col gap-4'>
        
        <div className='flex items-center justify-center w-full'>
          {/* Título un poco más pequeño */}
          <h1 className='text-gradient-custom text-3xl font-bold text-center'>
            CREA TUS PROPIAS CARTAS
          </h1>
        </div>

        <div className='w-full flex flex-col gap-3 py-2'>
          {/* Contenedor principal con grid de 2 columnas para organizar izquierda y derecha */}
          <div className='grid grid-cols-2 gap-4'>
            
            {/* Columna Izquierda: Nombre y Tipo */}
            <div className='flex flex-col gap-3'>
              <div className='flex gap-1'>
                <label className='font-semibold text-md text-purple-700'>Nombre:</label>
                <input type="text" placeholder='Ingresa el nombre'
                  className='p-1.5 border rounded-lg border-purple-700 text-sm shadow-md hover:shadow-gray-400 
                  hover:scale-100 focus:outline-none focus:ring-1 focus:ring-purple-700 transition-all duration-300
                  w-full'
                  value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              {nameError && <p className="text-red-500 text-[12px] italic">{nameError}</p>}

              <div className='flex gap-1'>
                <label className='font-semibold text-md text-purple-700'>Tipo:</label>
                <input type="text" placeholder='Ingresa el tipo' 
                className='p-1.5 border rounded-lg border-purple-700 text-sm shadow-md hover:shadow-gray-400 
                hover:scale-100 focus:outline-none focus:ring-1 focus:ring-purple-700 transition-all duration-300
                w-full' 
                value={tipo} onChange={(e) => setTipo(e.target.value)} />
              </div>
              {tipoError && <p className="text-red-500 text-[12px] italic">{tipoError}</p>}
            </div>

            {/* Columna Derecha: Estadísticas (Ataque, Defensa, Vida) */}
            <div className='flex flex-row gap-2 items-start border border-gray-400 rounded-lg px-4 py-3
            shadow-md hover:shadow-gray-400 transition-all duration-300'>
              {[
                { val: attack, set: setAttack, err: attackError, icon: 
                <Swords size={25} className="text-red-500" /> },
                { val: defense, set: setDefense, err: defenseError, icon: 
                <Shield size={25} className="text-blue-500" /> },
                { val: lifePoints, set: setLifePoints, err: lifePointsError, icon: 
                <Heart size={25} className="text-green-500" /> }
              ].map((item, idx) => (
                <div key={idx} className='flex flex-col gap-1 items-center flex-1'>
                  <div className="flex items-center justify-center">
                    {item.icon}
                  </div>
                  <input 
                    type="number" 
                    className='p-1.5 w-full text-center border-2 shadow-purple-500 shadow-md rounded-lg border-purple-700 text-sm hover:scale-105 transition-all
                     duration-300 focus:outline-none focus:ring-1 focus:ring-purple-700' 
                    value={item.val} 
                    onChange={(e) => item.set(Number(e.target.value))} 
                  />
                  {item.err && <p className="text-red-500 text-[10px] italic text-center leading-tight">{item.err}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Resto del formulario (Habilidades, Link, Descripción) */}
          <div className='flex flex-col gap-2'>
            <label className='font-semibold text-md text-purple-700'
            >Habilidades Especiales:</label>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 border-2 border-purple-700 rounded-lg p-3 shadow-md hover:shadow-gray-400 transition-all duration-300'>
              {renderSelectHabilidad(habilidad1, setHabilidad1, habilidad1Error)}
              {renderSelectHabilidad(habilidad2, setHabilidad2, habilidad2Error)}
              {renderSelectHabilidad(habilidad3, setHabilidad3, habilidad3Error)}
            </div>
          </div>

          <div className='flex flex-col gap-1'>
            <label className='font-semibold text-md text-purple-700'>Link de Imagen:</label>
            <input type="text" placeholder='URL' 
            className='p-1.5 border rounded-lg border-purple-700 text-sm focus:outline-none focus:ring-1 shadow-md hover:shadow-gray-400 hover:scale-100 transition-all duration-300
            focus:ring-purple-700' value={pictureUrl} onChange={(e) => setPictureUrl(e.target.value)} />
            {pictureUrlError && <p className="text-red-500 text-[12px] italic">{pictureUrlError}</p>}
          </div>

          <div className='flex flex-col gap-1'>
            <label className='font-semibold text-md text-purple-700'>Descripción:</label>
            <textarea className='p-1.5 border rounded-lg border-purple-700 h-16 text-sm focus:outline-none focus:ring-1 shadow-md hover:shadow-gray-400 hover:scale-100 transition-all duration-300
            focus:ring-purple-700' placeholder='Breve descripción' value={description} onChange={(e) => setDescription(e.target.value)} />
            {descriptionError && <p className="text-red-500 text-[12px] italic">{descriptionError}</p>}
          </div>

          <button onClick={manejarClickCrear}
            className='w-full bg-purple-800 text-white font-bold py-2 rounded-lg hover:bg-purple-600 border-2 border-purple-900
            transition-all text-sm hover:scale-105 duration-300 shadow-lg hover:shadow-purple-400 shadow-gray-400'>
            CREAR CARTA
          </button>
        </div>

        <button onClick={() => noSeMuestra()}
          className='absolute top-4 right-4 bg-white border-3 border-gray-400 rounded-full p-1 hover:bg-gray-100 hover:scale-105 transition-all shadow-md z-10 cursor-pointer'>
          <MdClear size={30} className="text-black"/>
        </button>
      </div>
    </div>
  )
}

export default CrearCarta;