import type { ReactNode } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { COLORES } from '../estilos/tema';
import { DondeEstoy } from './DondeEstoy';

export function PantallaConDesplazamiento({ children }: { children: ReactNode }) {
  return (
    <ScrollView style={estilos.pantalla} contentContainerStyle={estilos.contenido}>
      {children}
      <DondeEstoy />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: COLORES.fondo,
  },
  contenido: {
    padding: 16,
    gap: 12,
  },
});
