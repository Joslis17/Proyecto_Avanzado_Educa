import { useState } from 'react';
import { MdClear } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

import { Sparkle } from 'lucide-react';

import VistaGenerarCartaAyuda from '../Components/VistaGenerarCartaAyuda';
type props = {
}

function VistaGenerarCarta({ recargarMazo }: { recargarMazo: () => Promise<void> }) {
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
      await recargarMazo();
      navigate('/mazo');
    } catch (err) {
      setError("No se pudo generar. Revisa tu prompt o conexión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=' flex items-center justify-center p-4 fixed inset-0 z-50 text-white'>
        {/* Reducimos p-8 a p-4 y max-w-5xl a max-w-3xl para que sea más estrecho */}
      <div className='absolute relative bg-[#0f172a] border-2 rounded-3xl shadow-xl shadow-red-500 p-4 md:p-6 w-full 
          max-w-xl h-auto overflow-y-auto max-h-[95vh] flex flex-col gap-4 items-center'>
        
        <button 
          onClick={() => setMostrarAyuda(true)}
          className='fixed top-5 right-30 bg-gradient-to-r from-blue-900 to-slate-900 text-white
        cursor-pointer rounded-lg p-4 shadow-lg shadow-gray-700 hover:scale-110 transition-all border 
        border-white'>
            <Sparkle size={30} className="text-white" />
        </button>

        {mostrarAyuda && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            {/* Ajustamos max-w-4xl para mayor ancho y quitamos w-200 */}
            <div className=" bg-gradient-to-b from-red-950 to-black border border-red-900 absolute bg-white p-6 rounded-xl shadow-xl w-full max-w-6xl flex flex-col justify-center">
              
              <VistaGenerarCartaAyuda />
              <button onClick={() => setMostrarAyuda(false)} 
                className='absolute top-4 right-4 bg-white border-3 border-gray-400 rounded-full p-1 hover:bg-gray-100 hover:scale-105 transition-all shadow-md z-10 cursor-pointer'>
                  <MdClear size={30} className="text-black"/>
              </button>
            </div>
          </div>
        )}

          <button  onClick={() => navigate('/mazo')}
              className='absolute top-4 right-4 bg-white border-3 border-gray-400 rounded-full p-1 hover:bg-gray-100 hover:scale-105 transition-all shadow-md z-10 cursor-pointer'>
              <MdClear size={40} color={'#000000'}/>
          </button>
        <h2 className='text-red-600 fuente_terror text-5xl font-bold text-center
                      drop-shadow-lg drop-shadow-red-300 [-webkit-text-stroke:1px_white]'>
          Generar Carta con IA
          </h2>
        <p className="m-2 text-gray-100 text-center">
          Escribe detalles (tipo, nombre, etc.) y la IA completará el resto. Si no escribes nada, se generará una carta totalmente aleatoria.
        </p>
        
        <textarea 
          className="w-full h-40 p-4 border-2 shadow-lg shadow-gray-600 border-white rounded-xl mb-4 focus:outline-none focus:ring-1 hover:shadow-gray-400 hover:scale-100 transition-all duration-300
            focus:ring-gray-300 "
          placeholder="Ej: Quiero una carta de tipo Místico, con un ataque alto..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button 
          onClick={generarCarta}
          disabled={loading}
          className='w-50 text-white font-bold py-2 rounded-lg hover:bg-red-700 border-2 border-white
            transition-all text-sm hover:scale-105 duration-300 shadow-lg hover:shadow-red-500'>
          {loading ? "Pensando..." : "Generar Carta"}
        </button>
        <p className="mt-4 text-center text-sm text-gray-500">
          (Tenga en cuenta de especificar las habilidades a través de un numero del 1 al 40,)
        </p>

        {error && <p className="text-red-500 mt-4">{error}</p>}
        
      </div>
    </div>
  );
}

export default VistaGenerarCarta;