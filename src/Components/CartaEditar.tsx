import { useState } from 'react';
import habilidadesData from '../../habilidades.json';
import { Swords, Shield, Heart } from 'lucide-react'

type Props = {
  cartaInicial: any;
  onSave: (data: any) => void;
  onCancel: () => void;
}

function CartaEditar({ cartaInicial, onSave, onCancel }: Props) {
  // Aseguramos que habilidadesData sea tratado siempre como un array
  const listaHabilidadesJSON = Array.isArray(habilidadesData) ? habilidadesData : [];

  // 1. ESTADOS INDIVIDUALES CON PROTECCIÓN CONTRA UNDEFINED
  const [name, setName] = useState(cartaInicial?.name || "");
  const [pictureUrl, setPictureUrl] = useState(cartaInicial?.pictureUrl || "");
  const [tipo, setTipo] = useState(cartaInicial?.attributes?.tipo || "");
  const [attack, setAttack] = useState(cartaInicial?.attack || 0);
  const [defense, setDefense] = useState(cartaInicial?.defense || 0);
  const [lifePoints, setLifePoints] = useState(cartaInicial?.lifePoints || 0);
  const [description, setDescription] = useState(cartaInicial?.description || "");

  // Lógica segura para extraer las habilidades del string "1,5,7"
  const [hab1, setHab1] = useState(() => {
    const stringHabilidades = cartaInicial?.attributes?.habilidades_Especiales || "";
    const lista = typeof stringHabilidades === 'string' ? stringHabilidades.split(',') : [];
    return lista[0] ? lista[0].trim() : "";
  });

  const [hab2, setHab2] = useState(() => {
    const stringHabilidades = cartaInicial?.attributes?.habilidades_Especiales || "";
    const lista = typeof stringHabilidades === 'string' ? stringHabilidades.split(',') : [];
    return lista[1] ? lista[1].trim() : "";
  });

  const [hab3, setHab3] = useState(() => {
    const stringHabilidades = cartaInicial?.attributes?.habilidades_Especiales || "";
    const lista = typeof stringHabilidades === 'string' ? stringHabilidades.split(',') : [];
    return lista[2] ? lista[2].trim() : "";
  });

  // 2. FUNCIÓN PARA GUARDAR
  const manejarGuardar = () => {
    const cartaEditada = {
      ...cartaInicial,
      name: name,
      pictureUrl: pictureUrl,
      attack: Number(attack),
      defense: Number(defense),
      lifePoints: Number(lifePoints),
      description: description,
      attributes: {
        tipo: tipo,
        habilidades_Especiales1: hab1,
        habilidades_Especiales2: hab2,
        habilidades_Especiales3: hab3
      }
    };
    onSave(cartaEditada);
  };

  const renderSelectHabilidad = (value: string, setter: (v: string) => void) => (
    <select 
      className='w-full border rounded-lg p-2 text-sm bg-white border-gray-300 outline-none focus:border-purple-600 transition-all'
      value={value} 
      onChange={(e) => setter(e.target.value)}
    >
      <option value="">Selecciona una habilidad</option>
      {listaHabilidadesJSON.map((hab: any) => (
        <option key={hab.id} value={hab.id}>
          {hab.nombre} (Atq: {hab.ataque})
        </option>
      ))}
    </select>
  );

  return (
    <div className='relative bg-white rounded-4xl shadow-xl shadow-purple-500 p-8 w-full max-w-5xl h-auto overflow-y-auto max-h-[95vh] text-black'>

      <h2 className='text-5xl font-bold mb-4 text-gradient-custom text-center'>Editar Personaje</h2>
      
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-row gap-2 items-center'>
            <label className="font-bold text-purple-900 ml-1">Nombre:</label>
            <input className='border-2 border-gray-400 p-3 rounded-xl focus:border-purple-600 
            outline-none transition-all shadow-lg shadow-gray-300 hover:shadow-purple-400 hover:scale-105 
            duration-300 h-full w-full' 
                   value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          
          <div className='flex flex-row gap-2 items-center'>
            <label className="font-bold text-purple-900 ml-1">Tipo de Entidad:</label>
            <input className='border-2 border-gray-400 p-3 rounded-xl focus:border-purple-600 
            outline-none transition-all shadow-lg shadow-gray-300 hover:shadow-purple-400 hover:scale-105 
            duration-300 w-full h-full' 
                   value={tipo} onChange={(e) => setTipo(e.target.value)} />
          </div>

          <div className='flex flex-col gap-2'>
            <label className="font-bold text-purple-900 ml-1">URL de la Imagen:</label>
            <input className='border-2 border-gray-400 p-3 rounded-xl focus:border-purple-600 
            outline-none transition-all shadow-lg shadow-gray-300 hover:shadow-purple-400 hover:scale-105 duration-300' 
                   value={pictureUrl} onChange={(e) => setPictureUrl(e.target.value)} />
          </div>

          <div className='grid grid-cols-3 gap-4 border-2 border-gray-400 rounded-2xl p-4 shadow-lg shadow-gray-400'>
            <div className='flex flex-col gap-2'>
              <Swords size={40} className="mx-auto text-red-500" />
              <input type="number" className='border-2 border-purple-700 p-2 rounded-xl text-center
              shadow-lg shadow-gray-300 hover:shadow-purple-400 hover:scale-105 transition-all duration-300
              focus:border-purple-600 outline-none' 
                     value={attack} onChange={(e) => setAttack(e.target.value)} />
            </div>
            <div className='flex flex-col gap-2'>
              <Shield size={40} className="mx-auto text-blue-500" />
              <input type="number" className='border-2 border-purple-700 p-2 rounded-xl text-center
              shadow-lg shadow-gray-300 hover:shadow-purple-400 hover:scale-105 transition-all duration-300
              focus:border-purple-600 outline-none' 
                     value={defense} onChange={(e) => setDefense(e.target.value)} />
            </div>
            <div className='flex flex-col gap-2'>
              <Heart size={40} className="mx-auto text-green-500" />
              <input type="number" className='border-2 border-purple-700 p-2 rounded-xl text-center
              shadow-lg shadow-gray-300 hover:shadow-purple-400 hover:scale-105 transition-all duration-300
              focus:border-purple-600 outline-none' 
                     value={lifePoints} onChange={(e) => setLifePoints(e.target.value)} />
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-5'>
          <div className='p-5 border-2 border-purple-800 rounded-2xl shadow-lg hover:shadow-purple-400 transition-all
          shadow-gray-300'>
            <h3 className='text-center font-bold mb-4 text-purple-900'>Habilidades Especiales:</h3>
            <div className='flex flex-col gap-2 focus-within:border-purple-600 transition-all'>
              {renderSelectHabilidad(hab1, setHab1)}
              {renderSelectHabilidad(hab2, setHab2)}
              {renderSelectHabilidad(hab3, setHab3)}
            </div>
          </div>

          <div className='p-5 border-2 border-purple-800 rounded-2xl shadow-lg hover:shadow-purple-400 transition-all
           shadow-gray-300 flex-1'>
            <h3 className='text-center font-bold mb-2 text-purple-900'>Descripción:</h3>
            <textarea className='w-full h-20 p-2 bg-transparent outline-none resize-none text-md italic text-gray-700' 
                      placeholder="Escribe aquí la historia..."
                      value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
        </div>
      </div>

      <div className='flex gap-4 mt-4 justify-center '>
        <button onClick={onCancel} className='px-10 py-3 border border-gray-400 bg-gray-200 text-gray-700 rounded-xl font-bold 
        hover:bg-gray-300 transition-all hover:scale-110 cursor-pointer shadow-lg shadow-gray-300 hover:shadow-gray-400 duration-300'>
          Cancelar
        </button>
        <button onClick={manejarGuardar} className='bg-purple-900 border-3 border-white hover:bg-purple-700 
        text-white font-bold py-2 px-10 rounded-xl transition-all duration-400 hover:scale-110 shadow-lg 
        hover:shadow-purple-500 cursor-pointer shadow-gray-300'>
          Guardar Cambios
        </button>
      </div>
    </div>
  );
}

export default CartaEditar;