import React from 'react'

function ModalAyuda() {
  return (
    <div className=" p-2 bg-[#0f172a] text-white border-2 border-white rounded-2xl shadow-lg
           hover:shadow-gray-700 transition-all duration-300 overflow-y-auto">
            <h1 className='text-red-600 fuente_terror p-2 text-3xl font-sans font-bold flex text-center justify-center'>
            Guía del Invocador
            </h1>
            <p className='text-lg p-2 font-bold italic '>Bienvenido al dominio de las Entidades Malignas. Domina las siguientes mecánicas para asegurar 
                tu supervivencia:</p>
            <div>
                <ul className='list-disc list-inside m-2'>
                    <li className='m-2'>
                        Para entrar en combate, deberás seleccionar exactamente dos cartas. Mantén presionada 
                        cada carta durante 3 segundos para marcarla o desmarcarla. Una vez completada tu selección, 
                        aparecerá el botón de acceso al campo de batalla.
                    </li>
                    <li className='m-2'>
                        Si deseas conocer los secretos y habilidades de una carta, simplemente presiona su 
                        botón de información o haz clic directamente sobre su imagen.
                    </li>
                    <li className='m-2'>
                        Puedes expandir tu grimorio creando nuevas entidades de forma manual o mediante el 
                        poder de la Inteligencia Artificial. Localiza ambos botones de creación en la esquina
                         superior izquierda de la pantalla.
                    </li>
                    <li className='m-2'>
                        Si necesitas modificar los atributos de una entidad existente, accede a los detalles de
                         la carta y utiliza el botón de edición para realizar los ajustes necesarios.
                    </li>
                </ul>
            </div>
            
            
            
        </div>
  )
}

export default ModalAyuda