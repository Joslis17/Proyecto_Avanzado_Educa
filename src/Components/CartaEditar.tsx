import { useState } from 'react';
import { MdClear } from "react-icons/md";

type Props = {
  cartaInicial: any;
  onSave: (data: any) => void;
  onCancel: () => void;
}

function CartaEditar({ cartaInicial, onSave, onCancel }: Props) {
  // 1. ESTADOS INDIVIDUALES (Lógica simplificada)
  const [name, setName] = useState(cartaInicial.name);
  const [pictureUrl, setPictureUrl] = useState(cartaInicial.pictureUrl);
  const [tipo, setTipo] = useState(cartaInicial.attributes.tipo);
  const [attack, setAttack] = useState(cartaInicial.attack);
  const [defense, setDefense] = useState(cartaInicial.defense);
  const [lifePoints, setLifePoints] = useState(cartaInicial.lifePoints);
  const [hab1, setHab1] = useState(cartaInicial.attributes.habilidades_Especiales1);
  const [hab2, setHab2] = useState(cartaInicial.attributes.habilidades_Especiales2);
  const [hab3, setHab3] = useState(cartaInicial.attributes.habilidades_Especiales3);
  const [description, setDescription] = useState(cartaInicial.description);

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

  return (
    <div className='relative bg-white rounded-4xl shadow-xl shadow-purple-500 p-8 w-full max-w-5xl h-auto overflow-y-auto max-h-[95vh]'>
      {/* Botón X para cerrar */}
      <button onClick={onCancel} className='absolute top-4 right-4 bg-white border-2 border-gray-300 rounded-full p-1 hover:bg-gray-100 transition-all'>
        <MdClear size={30} />
      </button>

      <h2 className='text-4xl font-bold mb-8 text-gradient-custom'>Editar Personaje</h2>
      
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        
        {/* COLUMNA IZQUIERDA: Datos Básicos */}
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col gap-2'>
            <label className="font-bold text-purple-900 ml-1">Nombre:</label>
            <input className='border-2 border-gray-300 p-3 rounded-xl focus:border-purple-600 outline-none transition-all' 
                   value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          
          <div className='flex flex-col gap-2'>
            <label className="font-bold text-purple-900 ml-1">Tipo de Entidad:</label>
            <input className='border-2 border-gray-300 p-3 rounded-xl focus:border-purple-600 outline-none transition-all' 
                   value={tipo} onChange={(e) => setTipo(e.target.value)} />
          </div>

          <div className='flex flex-col gap-2'>
            <label className="font-bold text-purple-900 ml-1">URL de la Imagen:</label>
            <input className='border-2 border-gray-300 p-3 rounded-xl focus:border-purple-600 outline-none transition-all' 
                   value={pictureUrl} onChange={(e) => setPictureUrl(e.target.value)} />
          </div>

          {/* Mini Grid para Atq, Def, Vida */}
          <div className='grid grid-cols-3 gap-4'>
            <div className='flex flex-col gap-2'>
              <label className="font-bold text-purple-900 text-center">Ataque</label>
              <input type="number" className='border-2 border-gray-300 p-2 rounded-xl text-center' 
                     value={attack} onChange={(e) => setAttack(e.target.value)} />
            </div>
            <div className='flex flex-col gap-2'>
              <label className="font-bold text-purple-900 text-center">Defensa</label>
              <input type="number" className='border-2 border-gray-300 p-2 rounded-xl text-center' 
                     value={defense} onChange={(e) => setDefense(e.target.value)} />
            </div>
            <div className='flex flex-col gap-2'>
              <label className="font-bold text-purple-900 text-center">Vida</label>
              <input type="number" className='border-2 border-gray-300 p-2 rounded-xl text-center' 
                     value={lifePoints} onChange={(e) => setLifePoints(e.target.value)} />
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: Estilo "Card" de la imagen */}
        <div className='flex flex-col gap-6'>
          
          {/* Recuadro de Habilidades (Estilo Morado) */}
          <div className='p-5 border-2 border-purple-800 rounded-2xl shadow-lg hover:shadow-purple-400 transition-all'>
            <h3 className='text-center font-bold mb-4 text-purple-900'>Habilidades Especiales:</h3>
            <div className='flex flex-col gap-3'>
              <input className='border rounded-lg p-2 text-sm italic' placeholder="Habilidad 1" value={hab1} onChange={(e) => setHab1(e.target.value)} />
              <input className='border rounded-lg p-2 text-sm italic' placeholder="Habilidad 2" value={hab2} onChange={(e) => setHab2(e.target.value)} />
              <input className='border rounded-lg p-2 text-sm italic' placeholder="Habilidad 3" value={hab3} onChange={(e) => setHab3(e.target.value)} />
            </div>
          </div>

          {/* Recuadro de Descripción (Estilo Morado) */}
          <div className='p-5 border-2 border-purple-800 rounded-2xl shadow-lg hover:shadow-purple-400 transition-all flex-1'>
            <h3 className='text-center font-bold mb-2 text-purple-900'>Descripción:</h3>
            <textarea className='w-full h-32 p-2 text-2x bg-transparent outline-none resize-none' 
                      placeholder="Escribe aquí la historia..."
                      value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
        </div>
      </div>

      {/* BOTONES FINALES */}
      <div className='flex gap-4 mt-10 justify-center '>
        <button onClick={onCancel} className='px-10 py-3 border border-gray-400 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-all hover:scale-110'>
          Cancelar
        </button>
        <button onClick={manejarGuardar} className='bg-purple-900 border-3 border-white hover:bg-purple-700 text-white font-bold py-2 px-10 rounded-xl transition-all duration-400 hover:scale-110 shadow-lg hover:shadow-purple-500'>
          Guardar Cambios
        </button>
      </div>
    </div>
  );
}

export default CartaEditar;