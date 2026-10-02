import { Link, type Href } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { COLORES } from '../estilos/tema';

type TarjetaAccesoRapidoProps = {
  href: Href;
  titulo: string;
  descripcion: string;
};

export function TarjetaAccesoRapido({ href, titulo, descripcion }: TarjetaAccesoRapidoProps) {
  return (
    <Link href={href} style={estilos.enlace}>
      <View style={estilos.tarjeta}>
        <Text style={estilos.titulo}>{titulo}</Text>
        <Text style={estilos.descripcion}>{descripcion}</Text>
      </View>
    </Link>
  );
}

const estilos = StyleSheet.create({
  enlace: {
    width: '100%',
  },
  tarjeta: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    backgroundColor: COLORES.superficie,
    borderWidth: 1,
    borderColor: COLORES.borde,
    gap: 4,
  },
  titulo: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORES.primario,
  },
  descripcion: {
    color: COLORES.textoSuave,
  },
});
