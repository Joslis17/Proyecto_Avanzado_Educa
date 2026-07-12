import { useState } from 'react';
import { MdClear } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

import VistaGenerarCartaAyuda from '../Components/VistaGenerarCartaAyuda';

function VistaGenerarCarta() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cartaGenerada, setCartaGenerada] = useState<any>(null);
  const navigate = useNavigate();
  const [mostrarAyuda, setMostrarAyuda] = useState(false);

  const generarCarta = async () => {
    setLoading(true);
    setError("");

    
    const systemInstruction = `
      Eres un asistente experto en creación de cartas para un juego.
  
      REGLAS DE HABILIDADES:
      - Dispones de estas habilidades con sus respectivos IDs numéricos:
        1: Contorsión extrema, 2: Omnisciencia Local, 3: Cambio de forma, 
        4: Ilusiones y Alucinaciones, 5: Telequinesis, 6: Telepatía, 7: (y siguientes si existen en tu JSON).
      - El campo "habilidades_Especiales" DEBE ser una cadena de texto conteniendo solo los IDs separados por comas (ejemplo: "1,5,3").
      - NUNCA escribas el nombre de la habilidad, solo su ID numérico.
      
      REGLAS GENERALES:
      - Si el usuario proporciona datos, ÚSALOS.
      - Si falta algún dato, invéntalo de forma coherente.
      - Si no se proporciona un link de imagen, usa una URL genérica de placeholder.

      FORMATO: Devuelve SIEMPRE un JSON válido:
      {
        "name": "string",
        "description": "string",
        "pictureUrl": "string",
        "attack": number,
        "defense": number,
        "lifePoints": number,
        "attributes": {
          "tipo": "string",
          "habilidades_Especiales": "string"
        }
      }
    `;

    try {
      const respuesta = await fetch('https://educapi-v2.onrender.com/ai/generate-card', {
        method: 'POST',
        headers: {
          'usersecretpasskey': 'Josl998465OS',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          globalContext: systemInstruction,
          cardPrompt: prompt 
        })
      });

      if (!respuesta.ok) throw new Error("Error en la IA");
      
      const data = await respuesta.json();
      setCartaGenerada(data);
    } catch (err) {
      setError("No se pudo generar. Revisa tu prompt o conexión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto relative">
      
        <button 
        onClick={() => setMostrarAyuda(true)}
        className='fixed top-10 left-10 bg-gray-500 text-white
        cursor-pointer rounded-xl p-3 shadow-lg z-40 hover:scale-110 transition-all'>
        Habilidades
      </button>

      {mostrarAyuda && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg flex flex-col">
            
            <VistaGenerarCartaAyuda />
            <button onClick={() => setMostrarAyuda(false)} className="mt-4 text-white bg-purple-800 
            hover:bg-gradient-to-r from-purple-700 to-pink-500 text-center px-4 py-2 font-bold rounded-md hover:scale-105 transition-all">
              Cerrar
            </button>
          </div>
        </div>
      )}

        <button  onClick={() => navigate(-1)}
            className='fixed top-10 right-10 bg-white border-3 border-gray-400/50 rounded-full p-1 m-2
            cursor-pointer hover:bg-gray-200 hover:scale-115 transition-background,scale duration-400'>
            <MdClear size={40} color={'#000000'}/>
        </button>
      <h2 className="text-5xl text-center font-bold mb-4 text-purple-900">
        Generar Carta con IA
        </h2>
      <p className="mb-4 text-gray-900">
        Escribe detalles (tipo, nombre, etc.) y la IA completará el resto. Si no escribes nada, se generará una carta totalmente aleatoria.
      </p>
      
      <textarea 
        className="w-full h-40 p-4 border-2 border-purple-300 rounded-xl mb-4 focus:outline-purple-600"
        placeholder="Ej: Quiero una carta de tipo Místico, con un ataque alto..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button 
        onClick={generarCarta}
        disabled={loading}
        className="w-full bg-gradient-to-r from-purple-800 to-pink-600 text-white py-3 rounded-lg font-bold hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed
        transition">
        {loading ? "Pensando..." : "Generar Carta"}
      </button>
      <p className="mt-4 text-center text-sm text-gray-500">
        (Tenga en cuenta de especificar las habilidades a través de un numero del 1 al 10,)
      </p>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      
      {cartaGenerada && (
        <div className="mt-8 border-2 border-purple-200 p-6 rounded-2xl bg-white shadow-xl">
          <h3 className="font-bold text-2xl text-purple-900 mb-2">{cartaGenerada.name}</h3>
          <div className="flex gap-4 mb-4">
            <span className="bg-purple-100 px-3 py-1 rounded-full text-sm font-bold">Tipo: {cartaGenerada.attributes?.tipo}</span>
          </div>
          <img src={cartaGenerada.pictureUrl} alt="Carta" className="w-full h-48 object-cover rounded-lg mb-4" />
          <p className="text-gray-700 mb-2 italic">"{cartaGenerada.description}"</p>
          <div className="grid grid-cols-3 gap-2 text-center mt-4">
            <div className="bg-gray-100 p-2 rounded">ATK: {cartaGenerada.attack}</div>
            <div className="bg-gray-100 p-2 rounded">DEF: {cartaGenerada.defense}</div>
            <div className="bg-gray-100 p-2 rounded">HP: {cartaGenerada.lifePoints}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VistaGenerarCarta;