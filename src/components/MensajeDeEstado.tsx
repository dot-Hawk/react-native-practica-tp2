import { StyleSheet, Text, View } from 'react-native';

import { COLORES } from '../estilos/tema';

type MensajeDeEstadoProps = {
  titulo: string;
  detalle?: string;
};

export function MensajeDeEstado({ titulo, detalle }: MensajeDeEstadoProps) {
  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>{titulo}</Text>
      {detalle ? <Text style={estilos.detalle}>{detalle}</Text> : null}
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: COLORES.superficie,
    borderWidth: 1,
    borderColor: COLORES.borde,
    gap: 4,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORES.texto,
  },
  detalle: {
    color: COLORES.textoSuave,
  },
});
