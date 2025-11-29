import './vistaMazo.css'

import Carta from "../Componentes/Carta"
import Payaso_It from '../assets/Imagenes/Cartas/Payaso_It.jpg'
import La_Monja from '../assets/Imagenes/Cartas/La_Monja.jpg'
import Annabelle from '../assets/Imagenes/Cartas/Annabelle.jpg'
import Freddy_Krueger from '../assets/Imagenes/Cartas/Freddy_Krueger.jpg'


function VistaMazo() {
  return (
    <div >
        <h1 className='mt-5 p-2 text-4xl font-sans font-bold text-yellow-400 flex text-center justify-center bg-gray-800/40 shadow-[0_0_60px_rgba(999,999,999,0.5)]'>
          Mi Mazo de Cartas Terroríficas
        </h1>

      <div className='flex items-center justify-center'>

        <div  className=' flex p-1.5 gap-5 m-3 ' >
          <Carta
            numero={1}
            nombre="El Payaso it"
            imagen= {Payaso_It}
            button='Eliminar'
            button2='Ver Detalles'
          />
          <Carta
            numero={2}
            nombre="La Monja"
            imagen= {La_Monja}
            button='Eliminar'
            button2='Ver Detalles'
            
          />
          <Carta
            numero={3}
            nombre="Anabelle"
            imagen= {Annabelle}
            button='Eliminar'
            button2='Ver Detalles'
          />
          <Carta
            numero={4}
            nombre="Freddy Krueger"
            imagen= {Freddy_Krueger}
            button='Eliminar'
            button2='Ver Detalles'
          />
        </div>

      </div>
    </div>
  )
}

export default VistaMazo