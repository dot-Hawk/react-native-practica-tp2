import { usePathname, useLocalSearchParams, useSegments } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { COLORES } from '../estilos/tema';

const DEBUG = true;

export function DondeEstoy() {
  const pathname = usePathname();
  const segmentos = useSegments();
  const parametros = useLocalSearchParams();

  if (!DEBUG) return null;

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>¿Dónde estoy?</Text>
      <Text style={estilos.linea}>usePathname: {pathname}</Text>
      <Text style={estilos.linea}>useSegments: {JSON.stringify(segmentos)}</Text>
      <Text style={estilos.linea}>useLocalSearchParams: {JSON.stringify(parametros)}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    marginTop: 24,
    padding: 12,
    borderRadius: 8,
    backgroundColor: COLORES.primarioSuave,
  },
  titulo: {
    fontWeight: '700',
    color: COLORES.primario,
    marginBottom: 4,
  },
  linea: {
    fontSize: 12,
    color: COLORES.textoSuave,
  },
});
