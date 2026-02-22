type TipoDeCarta = {
  numero: number;
  nombre: string;
  imagen: string;
  tipo: string;
  ataque: number;
  defensa: number;
  vida: number;
  habilidades_Especiales1: string;
  habilidades_Especiales2: string;
  habilidades_Especiales3: string;
  URL: string;
  descripcion: string;
}

const MazoInicial: TipoDeCarta[] = [
        {
            numero: 1, nombre: "El Payaso it", imagen: "https://dmn-dallas-news-prod.cdn.arcpublishing.com/resizer/v2/DLG2TE7OJQIEWY27KKDLAGNKC4.jpg?auth=d706ae708ec1ad6c11d309b3a45da12566762a48596fd3b71b5e109be6ed78e7&quality=80&width=1200&height=1200&smart=true",
            tipo: "Entidad Cosmica", ataque: 70, defensa: 55, vida: 100,
            habilidades_Especiales1: "Puede cambiar de forma.", habilidades_Especiales2: 'Manipular la realidad',
            habilidades_Especiales3: 'Regeneracion casi Ilimitada', URL: "https://www.contrareplica.mx/uploads/2019/09/17/normal/49b326e43ec8aed2ad247ef770afc052.jpg",
            descripcion: "Un payaso terrorífico que se alimenta del miedo, y crea ilusiones muy reales para atrapar a sus víctimas."
        },
        {
            numero: 2, nombre: "La Monja", imagen: "https://i.pinimg.com/736x/28/0f/7c/280f7ca3d1a22c208a2798e2b2bdf4a8.jpg",
            tipo: 'Demonio Alto Nivel', ataque: 100, defensa: 90, vida: 100,
            habilidades_Especiales1: 'Control Sobre la Oscuridad', habilidades_Especiales2: 'Posee humanos y objetos',
            habilidades_Especiales3: 'Invoca precencia menores', URL: 'https://i.pinimg.com/736x/28/0f/7c/280f7ca3d1a22c208a2798e2b2bdf4a8.jpg',
            descripcion: 'Es un demonio que disfruta atormentar a sus víctimas, Puede moverse entre sombras y alterar la realidad '
        },
        {
            numero: 3, nombre: "Anabelle", imagen: "https://m.media-amazon.com/images/I/51SQvcfnZSL.jpg",
            tipo: 'Entidad Demoniaca', ataque: 80, defensa: 85, vida: 100,
            habilidades_Especiales1: 'Mover Objetos.', habilidades_Especiales2: 'Povoca sucesos paranormales',
            habilidades_Especiales3: 'Atrae entidades demoniacas', URL: 'https://m.media-amazon.com/images/I/51SQvcfnZSL.jpg',
            descripcion: 'Una muñeca poseída por una entidad demoníaca que utiliza el miedo y la desesperación para debilitar a sus víctimas.'
        },
        {
            numero: 4, nombre: "Freddy Krueger", imagen: "https://i.pinimg.com/170x/40/b1/ae/40b1aec0ebdb40f8900c1dcdc541e562.jpg",
            tipo: 'Entidad Demoniaca', ataque: 50, defensa: 45, vida: 100,
            habilidades_Especiales1: 'Controla los sueños', habilidades_Especiales2: 'Lastima físicamente',
            habilidades_Especiales3: 'Cuchillas en sus guantes', URL: 'https://i.pinimg.com/170x/40/b1/ae/40b1aec0ebdb40f8900c1dcdc541e562.jpg',
            descripcion: 'Un espíritu vengativo que habita en los sueños, donde tiene un poder ilimitado. Usa su guante de cuchillas para atacarlas.'
        }
        ];

function EstructuraCarta(MazoInicial: TipoDeCarta[]) {
  return (
    <div>
        
    </div>
  )
}

export default EstructuraCarta