import { useEffect } from 'react';
import './vistaDetalle.css'
import CartaDetalle from '../Components/CartaDetalle'

type props ={
  carta: any
  noMostrar: Function
  onEliminarDetalle: (idCard: string) => void;
}

function VistaDetalle({carta, noMostrar, onEliminarDetalle}:props) {
  
  // Usamos useEffect para redirigir de forma segura sin romper el ciclo de vida de React
  useEffect(() => {
    if (!carta) {
      noMostrar();
    }
  }, [carta, noMostrar]);

  // Si no hay carta, renderizamos un espacio vacío seguro mientras se procesa el efecto
  if (!carta) {
    return null;
  }

  return (
    <div>
      <CartaDetalle
        noMostrar2={noMostrar}
        onEliminarClick={() => onEliminarDetalle(carta.idCard)}
        idCard={carta.idCard}
        name={carta.name}
        pictureUrl={carta.pictureUrl}
        // Agregamos encadenamiento opcional para que no falle si attributes es undefined
        tipo={carta.attributes?.tipo || "No definido"}
        attack={carta.attack}
        defense={carta.defense}
        lifePoints={carta.lifePoints}
        description={carta.description}
        attributes={carta.attributes || {}}
        button='Eliminar'
        button2='Editar'
      />
    </div>
  )
}

export default VistaDetalle;