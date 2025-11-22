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
    <div>

      <h3>
        {nombre} (#{numero})
      </h3>
      <img src={imagen} alt={nombre} />
      <p>Tipo: {tipo}</p>
      <p>Ataque: {ataque}</p>
      <p>Defensa: {defensa}</p>
      <p>Vida: {vida}</p>
      <p>{descripcion}</p>

    </div>
  );
}

export default Carta