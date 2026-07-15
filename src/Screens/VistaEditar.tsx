import { useNavigate } from 'react-router-dom';
import CartaEditar from '../Components/CartaEditar';
import './vistaEditar.css'

type Props = {
  carta: any;
  onEditar: (id: string, data: any) => void;
}

function VistaEditar({ carta, onEditar }: Props) {
  const navigate = useNavigate();

  return (
    <div className='flex items-center justify-center p-4 fixed inset-0 z-50'>
      <CartaEditar 
        cartaInicial={carta} 
        onSave={(datos) => {
            onEditar(carta.idCard, datos);
        }}
        onCancel={() => navigate('/')}
      />
    </div>
  );
}

export default VistaEditar;