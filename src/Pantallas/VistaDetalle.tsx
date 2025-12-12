import '../Pantallas/vistaDetalle.css'
import CartaDetalle from '../Componentes/CartaDetalle'
/* import PayasoIt from '../assets/Imagenes/Cartas/Payaso_It.jpg' */
import Luces from '../assets/Imagenes/Componentes/Luces.png'

type props ={
  carta: any
  noMostrar:Function
}

function VistaDetalle({carta, noMostrar}:props) {
  return (
    <div >
      <div className='flex justify-center '>
        <img src={Luces} className='' /> <img src={Luces} className='' />
      </div>
      
      <CartaDetalle
        noMostrar2={noMostrar}
        numero={carta.numero}
        nombre={carta.nombre}
        imagen={carta.imagen}
        tipo={carta.tipo}
        ataque={carta.ataque}
        defensa={carta.defensa}
        vida={carta.vida}
        descripcion={carta.descripcion}
        habilidades_Especiales1 = {carta.habilidades_Especiales1}
        habilidades_Especiales2 = {carta.habilidades_Especiales2}
        habilidades_Especiales3 = {carta.habilidades_Especiales3}
        rareza={carta.rareza}
        button='Eliminar'
        button2='Editar'
      />

    </div>
  )
}

export default VistaDetalle