import { useNavigation } from 'expo-router';
import { Text } from 'react-native';

import { COLORES } from '../estilos/tema';

export function TituloConContadorDePila({ titulo }: { titulo: string }) {
  const navegacion = useNavigation();
  const cantidadDePantallas = navegacion.getState()?.routes.length ?? 0;

  return (
    <Text style={{ fontSize: 17, fontWeight: '700', color: COLORES.texto }}>
      {titulo} ({cantidadDePantallas})
    </Text>
  );
}
