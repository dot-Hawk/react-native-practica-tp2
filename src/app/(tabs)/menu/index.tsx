import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { PantallaConDesplazamiento } from '../../../components/PantallaConDesplazamiento';
import { TarjetaPlato } from '../../../components/TarjetaPlato';
import { CATEGORIAS, ETIQUETAS_CATEGORIA, platosDeCategoria } from '../../../data/platos';
import { COLORES } from '../../../estilos/tema';

export default function PantallaMenu() {
  return (
    <PantallaConDesplazamiento>
      {CATEGORIAS.map((categoria) => (
        <View key={categoria} style={estilos.seccion}>
          <View style={estilos.encabezadoSeccion}>
            <Text style={estilos.tituloSeccion}>{ETIQUETAS_CATEGORIA[categoria]}</Text>
            <Link href={{ pathname: '/categorias/[categoria]', params: { categoria } }} style={estilos.verTodo}>
              Ver categoría
            </Link>
          </View>
          {platosDeCategoria(categoria).map((plato) => (
            <TarjetaPlato key={plato.id} plato={plato} />
          ))}
        </View>
      ))}
    </PantallaConDesplazamiento>
  );
}

const estilos = StyleSheet.create({
  seccion: {
    gap: 8,
  },
  encabezadoSeccion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tituloSeccion: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORES.texto,
  },
  verTodo: {
    color: COLORES.primario,
    fontWeight: '600',
  },
});
