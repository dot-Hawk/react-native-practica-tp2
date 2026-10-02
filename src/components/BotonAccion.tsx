import { Pressable, StyleSheet, Text } from 'react-native';

import { COLORES } from '../estilos/tema';

type BotonAccionProps = {
  titulo: string;
  alPresionar: () => void;
  deshabilitado?: boolean;
  variante?: 'primario' | 'secundario' | 'peligro';
};

export function BotonAccion({ titulo, alPresionar, deshabilitado = false, variante = 'primario' }: BotonAccionProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={deshabilitado}
      onPress={alPresionar}
      style={[estilos.base, estilos[variante], deshabilitado && estilos.deshabilitado]}
    >
      <Text style={[estilos.texto, variante === 'secundario' && estilos.textoSecundario]}>{titulo}</Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  base: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  primario: {
    backgroundColor: COLORES.primario,
  },
  secundario: {
    backgroundColor: COLORES.primarioSuave,
  },
  peligro: {
    backgroundColor: COLORES.peligro,
  },
  deshabilitado: {
    backgroundColor: COLORES.deshabilitado,
  },
  texto: {
    color: '#ffffff',
    fontWeight: '700',
  },
  textoSecundario: {
    color: COLORES.primario,
  },
});
