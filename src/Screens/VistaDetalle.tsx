import './vistaDetalle.css'
import CartaDetalle from '../Components/CartaDetalle'

type props ={
  carta: any
  noMostrar:Function
  onEliminarDetalle: (idCard: string) => void;
}

function VistaDetalle({carta, noMostrar, onEliminarDetalle}:props) {
  if (!carta) {
    return (
      <div className='p-8'>
        <p>No se encontró la carta seleccionada.</p>
        <button onClick={() => noMostrar()} className='mt-2 px-3 py-1 bg-slate-700 text-white rounded'>Volver</button>
      </div>
    );
  }

  return (
    <div >

      
      <CartaDetalle
        noMostrar2={noMostrar}
        onEliminarClick ={() => onEliminarDetalle(carta.idCard)}
        numero={carta.idCard}
        nombre={carta.name}
        imagen={carta.pictureUrl}
        tipo={carta.attributes.tipo}
        ataque={carta.attack}
        defensa={carta.defense}
        vida={carta.lifePoints}
        descripcion={carta.description}
        habilidades_Especiales1 = {carta.attributes.habilidades_Especiales1}
        habilidades_Especiales2 = {carta.attributes.habilidades_Especiales2}
        habilidades_Especiales3 = {carta.attributes.habilidades_Especiales3}
        URL={carta.pictureUrl}
        button='Eliminar'
        button2='Editar'
      />

    </div>
  )
}

export default VistaDetalle