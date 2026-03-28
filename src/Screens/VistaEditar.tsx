// Screens/VistaEditar.tsx
import { useNavigate } from 'react-router-dom';
import CartaEditar from '../Components/CartaEditar';
import './vistaEditar.css' // Puedes mantenerlo o vaciarlo si usas solo Tailwind

type Props = {
  carta: any;
  onEditar: (id: string, data: any) => void;
}

function VistaEditar({ carta, onEditar }: Props) {
  const navigate = useNavigate();

  if (!carta) {
    return (
        // Fondo oscuro también para el mensaje de carga
        <div className="min-h-screen flex items-center justify-center bg-gray-200 backdrop-blur-sm fixed inset-0 z-50 text-white text-xl">
            Cargando datos para editar...
        </div>
    );
  }

  return (
    <div className='min-h-screen flex items-center justify-center p-4 bg-gray-200 backdrop-blur-sm fixed inset-0 z-50'>
      <CartaEditar 
        cartaInicial={carta} 
        // Cerramos la vista después de editar
        onSave={(datos) => {
            onEditar(carta.idCard, datos);
        }}
        // Volvemos atrás si cancelamos
        onCancel={() => navigate('/')}
      />
    </div>
  );
}

export default VistaEditar;