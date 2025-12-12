import './vistaMazo.css'

import Carta from "../Componentes/Carta"
import Payaso_It from '../assets/Imagenes/Cartas/Payaso_It.jpg'
import La_Monja from '../assets/Imagenes/Cartas/La_Monja.jpg'
import Annabelle from '../assets/Imagenes/Cartas/Annabelle.jpg'
import Freddy_Krueger from '../assets/Imagenes/Cartas/Freddy_Krueger.jpg'
import Luces from '../assets/Imagenes/Componentes/Luces.png'

import { IoAddOutline } from "react-icons/io5";

type props = {
  seleccionarCarta : Function
}

function VistaMazo({ seleccionarCarta }:props) {

  return (
    <div >
      <div className='flex justify-center '>
        <img src={Luces} className='' /> <img src={Luces} className='' />
      </div>
        <h1 className='text-gradient-custom mt-2 p-2 text-5xl font-sans font-bold flex text-center justify-center'>
          ENTIDADES MALIGNAS
        </h1>
        <h2 className='flex text-center justify-center p-2 font-sans text-2xl font-medium border-b-3 border-gray-200 '>
          Mi Mazo de Cartas Terrorificas
        </h2>
        

      <div className='flex items-center justify-center'>

        <div  className=' flex p-1.5 gap-5 m-3 ' >
          <Carta
            seleccionarCarta2={seleccionarCarta}
            numero={1}
            nombre="El Payaso it"
            imagen= {Payaso_It}
            tipo="Entidad Cosmica"
            ataque={70}
            defensa={55}
            vida={100}
            habilidades_Especiales1="Puede cambiar de forma."
            habilidades_Especiales2='Manipular la realidad'
            habilidades_Especiales3='Regeneracion casi Ilimitada'
            rareza="Legendaria"
            descripcion="Un payaso terrorífico que se alimenta del miedo, y crea ilusiones muy reales para atrapar a sus víctimas."
            button='Eliminar'
            button2='Ver Detalles'
          />
          <Carta
            seleccionarCarta2={seleccionarCarta}
            numero={2}
            nombre="La Monja"
            imagen= {La_Monja}
            tipo='Demonio Alto Nivel'
            ataque={100}
            defensa={90}
            vida={100}
            habilidades_Especiales1='Control Sobre la Oscuridad'
            habilidades_Especiales2='Posee humanos y objetos'
            habilidades_Especiales3='Invoca precencia menores'
            rareza='Mítica'
            descripcion='Es un demonio que disfruta atormentar a sus víctimas, Puede moverse entre sombras y alterar la realidad '
            button='Eliminar'
            button2='Ver Detalles'
            
          />
          <Carta
            seleccionarCarta2={seleccionarCarta}
            numero={3}
            nombre="Anabelle"
            imagen= {Annabelle}
            tipo='Entidad Demoniaca'
            ataque={80}
            defensa={85}
            vida={100}
            habilidades_Especiales1='Mover Objetos.'
            habilidades_Especiales2='Povoca sucesos paranormales'
            habilidades_Especiales3='Atrae entidades demoniacas'
            rareza='Extraña'
            descripcion='Una muñeca poseída por una entidad demoníaca que utiliza el miedo y la desesperación para debilitar a sus víctimas.'
            button='Eliminar'
            button2='Ver Detalles'
          />
          <Carta
            seleccionarCarta2={seleccionarCarta}
            numero={4}
            nombre="Freddy Krueger"
            imagen= {Freddy_Krueger}
            tipo='Entidad Demoniaca'
            ataque={50}
            defensa={45}
            vida={100}
            habilidades_Especiales1='Controla los sueños'
            habilidades_Especiales2='Lastima físicamente'
            habilidades_Especiales3='Cuchillas en sus guantes'
            rareza='Legendaria'
            descripcion='Un espíritu vengativo que habita en los sueños, donde tiene un poder ilimitado. Usa su guante de cuchillas para atacarlas.'
            button='Eliminar'
            button2='Ver Detalles'
          />
        </div>

      </div>

        <button className='absolute top-5 right-5 bg-white border-3 border-gray-400/50 rounded-full p-1 m-2
         cursor-pointer hover:bg-gray-200 hover:scale-115 transition-background,scale duration-400'>
          <IoAddOutline size={30} color={'#000000'}/>
        </button>

    </div>
  )
}

export default VistaMazo  