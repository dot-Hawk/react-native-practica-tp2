import { StyleSheet, Text, View } from 'react-native';

import type { Pedido } from '../context/ComedorContext';
import { COLORES } from '../estilos/tema';

export function ResumenDePedido({ pedido }: { pedido: Pedido }) {
  return (
    <View style={estilos.tarjeta}>
      <Text style={estilos.titulo}>Turno {pedido.numero}</Text>
      {pedido.items.map((plato, posicion) => (
        <Text key={`${plato.id}-${posicion}`} style={estilos.item}>
          • {plato.nombre}
        </Text>
      ))}
      {pedido.nota !== '' ? <Text style={estilos.nota}>Nota: {pedido.nota}</Text> : null}
    </View>
  );
}

const estilos = StyleSheet.create({
  tarjeta: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: COLORES.superficie,
    borderWidth: 1,
    borderColor: COLORES.borde,
    gap: 2,
  },
  titulo: {
    fontWeight: '800',
    color: COLORES.primario,
    fontSize: 16,
  },
  item: {
    color: COLORES.texto,
  },
  nota: {
    color: COLORES.textoSuave,
    marginTop: 4,
  },
});
