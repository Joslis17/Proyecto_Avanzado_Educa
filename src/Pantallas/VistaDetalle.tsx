import '../Pantallas/vistaDetalle.css'
import CartaDetalle from '../Componentes/CartaDetalle'

function VistaDetalle() {
  return (
    <div>
      <CartaDetalle
        numero={1}
        nombre="El Payaso it"
        tipo="Payaso malvado"
        ataque={3000}
        defensa={2500}
        vida={80}
        descripcion="Un payaso terrorífico que se alimenta del miedo, y crea ilusiones muy reales para atrapar a sus víctimas."
        habilidades_Especiales="Puede cambiar de forma y manipular la realidad."
        rareza="Legendaria"
        button='Eliminar'
        button2='Editar'
        button3='X'
      />

    </div>
  )
}

export default VistaDetalle