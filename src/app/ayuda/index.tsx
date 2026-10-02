import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import { PantallaConDesplazamiento } from '../../components/PantallaConDesplazamiento';
import { ARTICULOS_AYUDA } from '../../data/articulosAyuda';
import { COLORES } from '../../estilos/tema';

export default function PantallaIndiceAyuda() {
  return (
    <PantallaConDesplazamiento>
      {ARTICULOS_AYUDA.map((articulo) => (
        <Link
          key={articulo.ruta.join('/')}
          href={{ pathname: '/ayuda/[...slug]', params: { slug: articulo.ruta } }}
          style={estilos.enlace}
        >
          {articulo.titulo}
        </Link>
      ))}
    </PantallaConDesplazamiento>
  );
}

const estilos = StyleSheet.create({
  enlace: {
    padding: 14,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: COLORES.superficie,
    borderWidth: 1,
    borderColor: COLORES.borde,
    color: COLORES.primario,
    fontWeight: '700',
  },
});
