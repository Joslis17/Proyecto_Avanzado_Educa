import '../Pantallas/vistaDetalle.css'
import CartaDetalle from '../Componentes/CartaDetalle'

import Payaso_It from '../assets/Imagenes/Cartas/Payaso_It.jpg'

function VistaDetalle() {
  return (
    <div>
      <CartaDetalle
        numero={1}
        nombre="El Payaso it"
        imagen= {Payaso_It}
        button='Eliminar'
        button2='Editar'
        tipo="Payaso malvado"
        ataque={3000}
        defensa={2500}
        vida={80}
        descripcion="Un payaso terrorífico que se alimenta del miedo, y crea ilusiones muy reales para atrapar a sus víctimas."
      />

    </div>
  )
}

export default VistaDetalle