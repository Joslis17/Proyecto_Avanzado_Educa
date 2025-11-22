import './Carta.css'

type props = {
  numero: number;
  nombre: string;
  tipo: string;
  ataque?: number;
  defensa: number;
  descripcion: string;
  imagen: string;
  vida: number;

}

function Carta({
  ataque=0,
  defensa,
  descripcion,
  imagen,
  nombre,
  numero,
  tipo,
  vida,
}: props) {
  return (
    <div className='border-2 border-gray-200 box-border-200 '>

      <h3>
        {nombre} (#{numero})
      </h3>
      <img src={imagen} alt={nombre} className='rounded-sm size-1/9 p-2 '/>
      <div>
        <p>Tipo: {tipo}</p>
        <p>Ataque: {ataque}</p>
        <p>Defensa: {defensa}</p>
        <p>Vida: {vida}</p>
        <p>{descripcion}</p>
      </div>

    </div>
  );
}

export default Carta