import { Stack, useLocalSearchParams } from 'expo-router';

import { EnlaceBoton } from '../../components/EnlaceBoton';
import { MensajeDeEstado } from '../../components/MensajeDeEstado';
import { PantallaConDesplazamiento } from '../../components/PantallaConDesplazamiento';
import { TarjetaPlato } from '../../components/TarjetaPlato';
import { CATEGORIAS, ETIQUETAS_CATEGORIA, esCategoriaValida, platosDeCategoria } from '../../data/platos';

export default function PantallaCategoria() {
  const { categoria } = useLocalSearchParams<{ categoria: string }>();

  if (!esCategoriaValida(categoria)) {
    return (
      <PantallaConDesplazamiento>
        <Stack.Screen options={{ title: 'Categoría no encontrada' }} />
        <MensajeDeEstado
          titulo={`No existe la categoría "${categoria}"`}
          detalle={`Categorías disponibles: ${CATEGORIAS.join(', ')}.`}
        />
        <EnlaceBoton href="/menu" titulo="Ver el menú" variante="secundario" />
      </PantallaConDesplazamiento>
    );
  }

  return (
    <PantallaConDesplazamiento>
      <Stack.Screen options={{ title: ETIQUETAS_CATEGORIA[categoria] }} />
      {platosDeCategoria(categoria).map((plato) => (
        <TarjetaPlato key={plato.id} plato={plato} />
      ))}
    </PantallaConDesplazamiento>
  );
}
