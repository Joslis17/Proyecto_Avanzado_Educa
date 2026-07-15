import { useState } from 'react';
import { MdClear } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

import VistaGenerarCartaAyuda from '../Components/VistaGenerarCartaAyuda';

function VistaGenerarCarta() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [mostrarAyuda, setMostrarAyuda] = useState(false);

  const generarCarta = async () => {
    setLoading(true);
    setError("");

    
    const systemInstruction = `
      Eres un asistente experto en creación de cartas para un juego.
  
      REGLAS DE HABILIDADES:
      - Dispones de estas habilidades con sus respectivos IDs numéricos:
        1: Susurro Oscuro
        2: Garra Fantasmal
        3: Sombra Asfixiante
        4: Grito del Inframundo
        5: Embestida Demoníaca
        6: Mirada Vacía
        7: Cadenas de Ánimas
        8: Pacto de Sangre
        9: Pesadilla Lúcida
        10: Drenaje de Esencia
        11: Maldición de la Bruja
        12: Explosión de Odio
        13: Invocar Poltergeist
        14: Niebla de Almas
        15: Corte de la Parca
        16: Risa Maníaca
        17: Tumba Profana
        18: Ojos Rojos
        19: Corrosión Ácida
        20: Garra del Abismo
        21: Telequinesis Oscura
        22: Infierno Ardiente
        23: Tótem del Miedo
        24: Filo Maldito
        25: Susurros del Más Allá
        26: Castigo de Ultratumba
        27: Aura de Desolación
        28: Látigo de Espinas
        29: Velo de Muerte
        30: Golpe de la Bestia
        31: Ritual de Sangre
        32: Escudo de Cráneos
        33: Llanto del Condenado
        34: Cuchillas Invisibles
        35: Marca de Lucifer
        36: Tormenta de Sombras
        37: Mano del Demonio
        38: Impacto Abismal
        39: Eco de Pesadilla
        40: Juicio Final
      - El campo "habilidades_Especiales" DEBE ser una cadena de texto conteniendo solo los IDs separados por comas (ejemplo: "1,5,3").
      - NUNCA escribas el nombre de la habilidad, solo su ID numérico.
      
      REGLAS GENERALES:
      - Si el usuario proporciona datos, ÚSALOS.
      - Si falta algún dato, invéntalo de forma coherente.
      - Si no se proporciona un link de imagen, usa una URL genérica de placeholder.
      - La tematica de la carta ajuro tiene que ser de personajes de peliculas/series de terror, leyendas urbanas latinoamericanas o inventadas/aleatorias.
      - El ataque, vida y defensa deben ser coherentes con su tipo y habilidades.
      - La carta generada ajuro tendra que poseer ajuro 3 habiliades especiales, si el prompt no especifica habilidades, asigna 3 habilidades aleatorias.
      - La carta generada debe tener un nombre, descripción y tipo coherentes con la temática de terror.
      - El numero de defensa podra ser aleatorio, pero debe ser mayor a 100 y menor a 300.
      - El numero de ataque podra ser aleatorio, pero debe ser mayor a 300 y menor a 500.
      - El numero de vida podra ser aleatorio, pero debe entrar en el rango de 500 a 1000.
      - Los numeros de vida, ataque y defensa deben ser coherentes con el tipo de carta y sus habilidades.
      - El nombre de la carta tiene que ser corto y preciso.

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
      await respuesta.json();
      navigate('/');
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
      
    </div>
  );
}

export default VistaGenerarCarta;