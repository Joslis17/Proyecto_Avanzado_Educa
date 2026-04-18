import './vistaDetalle.css'
import CartaDetalle from '../Components/CartaDetalle'

type props ={
  carta: any
  noMostrar:Function
  onEliminarDetalle: (idCard: string) => void;
}

function VistaDetalle({carta, noMostrar, onEliminarDetalle}:props) {
  if (!carta) {
    return (noMostrar());
  }

  return (
    <div >

      
      <CartaDetalle
        noMostrar2={noMostrar}
        onEliminarClick ={() => onEliminarDetalle(carta.idCard)}
        idCard={carta.idCard}
        name={carta.name}
        pictureUrl={carta.pictureUrl}
        tipo={carta.attributes.tipo}
        attack={carta.attack}
        defense={carta.defense}
        lifePoints={carta.lifePoints}
        description={carta.description}
        habilidades_Especiales1 = {carta.attributes.habilidades_Especiales1}
        habilidades_Especiales2 = {carta.attributes.habilidades_Especiales2}
        habilidades_Especiales3 = {carta.attributes.habilidades_Especiales3}
        button='Eliminar'
        button2='Editar'
      />

    </div>
  )
}

export default VistaDetalle