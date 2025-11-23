import './VistaMazo.css'

import Carta from "../Componentes/Carta"
import Payaso_It from '../assets/Imagenes/Cartas/Payaso_It.jpg'
import La_Monja from '../assets/Imagenes/Cartas/La_Monja.jpg'
import Annabelle from '../assets/Imagenes/Cartas/Annabelle.jpg'
import Freddy_Krueger from '../assets/Imagenes/Cartas/Freddy_Krueger.jpg'


function VistaMazo() {
  return (
    <div >
        <h1 className='m-5 text-xl font-sans font-bold text-white'>
          MAZO
        </h1>

        <div  className=' flex p-1.5 gap-5 m-3 ' 
        >
          <Carta
            numero={1}
            nombre="El Payaso it"
            imagen= {Payaso_It}
            button='Eliminar'
            button2='Editar'
            /* tipo="Payaso malvado"
            ataque={3000}
            defensa={2500}
            vida={80}
            descripcion="Un payaso terrorífico que se alimenta del miedo, y crea ilusiones muy reales para atrapar a sus víctimas."
            */
          />
        <Carta
          numero={2}
          nombre="La Monja"
          imagen= {La_Monja}
          button='Eliminar'
          button2='Editar'
          /* tipo="Demonio"
          ataque={3500}
          defensa={2000}
          vida={90}
          descripcion="Un demonio que usa la apariencia de una monja para engañar a sus víctimas y usa su fuerza física sobrenatural y la capacidad de poseer personas. " */
        />
        <Carta
          numero={3}
          nombre="Anabelle"
          imagen= {Annabelle}
          button='Eliminar'
          button2='Editar'
          /*
          tipo="Muñeca poseída"
          ataque={2500}
          defensa={1500}
          vida={70}
          descripcion="Una muñeca poseída por un espíritu demoníaco que causa caos y destrucción a su alrededor.
          */
        />
        <Carta
          numero={4}
          nombre="Freddy Krueger"
          imagen= {Freddy_Krueger}
          button='Eliminar'
          button2='Editar'
          /* 
          tipo="Espíritu vengativo"
          ataque={4000}
          defensa={3000}
          vida={100}
          descripcion="Un espíritu vengativo que ataca a sus víctimas en sus sueños, causando lesiones reales en el mundo físico.
          */
        />
        </div>
    </div>
  )
}

export default VistaMazo