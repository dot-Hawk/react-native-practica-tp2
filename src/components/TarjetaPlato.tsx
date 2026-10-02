import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import type { Plato } from '../data/platos';
import { COLORES, ESPACIADO } from '../estilos/tema';
import { formatearPrecio } from '../utilidades/formatearPrecio';

export function TarjetaPlato({ plato }: { plato: Plato }) {
  return (
    <Link href={{ pathname: '/menu/[id]', params: { id: plato.id } }} style={estilos.enlace}>
      <View style={estilos.tarjeta}>
        <Text style={estilos.nombre}>{plato.nombre}</Text>
        <Text style={estilos.descripcion}>{plato.descripcion}</Text>
        <Text style={estilos.precio}>{formatearPrecio(plato.precio)}</Text>
      </View>
    </Link>
  );
}

const estilos = StyleSheet.create({
  enlace: {
    width: '100%',
  },
  tarjeta: {
    padding: ESPACIADO.medio,
    borderRadius: 12,
    backgroundColor: COLORES.superficie,
    borderWidth: 1,
    borderColor: COLORES.borde,
    gap: 4,
    width: '100%',
  },
  nombre: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORES.texto,
  },
  descripcion: {
    color: COLORES.textoSuave,
  },
  precio: {
    fontWeight: '700',
    color: COLORES.primario,
  },
});
