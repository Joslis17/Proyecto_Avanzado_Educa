import './vistaDetalle.css'
import CartaDetalle from '../Components/CartaDetalle'

type props ={
  carta: any
  noMostrar:Function
  onEliminarDetalle: (numero: number) => void;
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
        onEliminarClick ={() => onEliminarDetalle(carta.numero)}
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
        URL={carta.URL}
        button='Eliminar'
        button2='Editar'
      />

    </div>
  )
}

export default VistaDetalle