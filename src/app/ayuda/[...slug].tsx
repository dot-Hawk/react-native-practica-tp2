import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { EnlaceBoton } from '../../components/EnlaceBoton';
import { MensajeDeEstado } from '../../components/MensajeDeEstado';
import { PantallaConDesplazamiento } from '../../components/PantallaConDesplazamiento';
import { buscarArticuloAyuda } from '../../data/articulosAyuda';
import { COLORES } from '../../estilos/tema';

export default function PantallaArticuloAyuda() {
  const { slug } = useLocalSearchParams<{ slug: string[] }>();
  const articulo = buscarArticuloAyuda(slug);

  return (
    <PantallaConDesplazamiento>
      <Stack.Screen options={{ title: articulo?.titulo ?? 'Ayuda' }} />
      {articulo === undefined ? (
        <MensajeDeEstado
          titulo={`No hay un artículo de ayuda en "/ayuda/${slug.join('/')}"`}
          detalle="Volvé al índice para ver los artículos disponibles."
        />
      ) : (
        <>
          <Text style={estilos.titulo}>{articulo.titulo}</Text>
          <Text style={estilos.contenido}>{articulo.contenido}</Text>
        </>
      )}
      <EnlaceBoton href="/ayuda" titulo="Volver al índice de ayuda" variante="secundario" />
    </PantallaConDesplazamiento>
  );
}

const estilos = StyleSheet.create({
  titulo: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORES.texto,
  },
  contenido: {
    fontSize: 16,
    color: COLORES.textoSuave,
  },
});
