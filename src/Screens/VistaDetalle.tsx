import { useEffect } from 'react';
import './vistaDetalle.css'
import CartaDetalle from '../Components/CartaDetalle'
import { Trash2, Edit2 } from 'lucide-react'

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

  const botonEliminar = <Trash2 size={20} className="text-white" />
  const botonEditar = <Edit2 size={20} className="text-white" />

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
        button={botonEliminar}
        button2={botonEditar}
      />
    </div>
  )
}

export default VistaDetalle;