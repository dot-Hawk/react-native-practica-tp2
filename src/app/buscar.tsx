import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { MensajeDeEstado } from '../components/MensajeDeEstado';
import { PantallaConDesplazamiento } from '../components/PantallaConDesplazamiento';
import { TarjetaPlato } from '../components/TarjetaPlato';
import { CATEGORIAS, ETIQUETAS_CATEGORIA, PLATOS, esCategoriaValida } from '../data/platos';
import { COLORES } from '../estilos/tema';

export default function PantallaBuscar() {
  const { q = '', categoria = '' } = useLocalSearchParams<{ q?: string; categoria?: string }>();
  const textoBuscado = q.trim().toLowerCase();
  const categoriaSeleccionada = esCategoriaValida(categoria) ? categoria : undefined;

  const resultados = PLATOS.filter(
    (plato) =>
      plato.nombre.toLowerCase().includes(textoBuscado) &&
      (categoriaSeleccionada === undefined || plato.categoria === categoriaSeleccionada),
  );

  const alCambiarTexto = (texto: string) => router.setParams({ q: texto });
  const alElegirCategoria = (nueva: string) =>
    router.setParams({ categoria: nueva === categoriaSeleccionada ? undefined : nueva });

  return (
    <PantallaConDesplazamiento>
      <TextInput
        value={q}
        onChangeText={alCambiarTexto}
        placeholder="Buscar un plato"
        autoCapitalize="none"
        style={estilos.campo}
      />
      <View style={estilos.filtros}>
        {CATEGORIAS.map((opcion) => (
          <Pressable
            key={opcion}
            onPress={() => alElegirCategoria(opcion)}
            style={[estilos.filtro, opcion === categoriaSeleccionada && estilos.filtroActivo]}
          >
            <Text style={[estilos.textoFiltro, opcion === categoriaSeleccionada && estilos.textoFiltroActivo]}>
              {ETIQUETAS_CATEGORIA[opcion]}
            </Text>
          </Pressable>
        ))}
      </View>
      {categoria !== '' && categoriaSeleccionada === undefined ? (
        <MensajeDeEstado titulo={`La categoría "${categoria}" no existe`} detalle="Se muestran platos de todas las categorías." />
      ) : null}
      {resultados.length === 0 ? (
        <MensajeDeEstado titulo="Sin resultados" detalle="Probá con otro texto o quitá el filtro de categoría." />
      ) : (
        resultados.map((plato) => <TarjetaPlato key={plato.id} plato={plato} />)
      )}
    </PantallaConDesplazamiento>
  );
}

const estilos = StyleSheet.create({
  campo: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORES.borde,
    backgroundColor: COLORES.superficie,
  },
  filtros: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filtro: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: COLORES.primarioSuave,
  },
  filtroActivo: {
    backgroundColor: COLORES.primario,
  },
  textoFiltro: {
    color: COLORES.primario,
    fontWeight: '600',
  },
  textoFiltroActivo: {
    color: '#ffffff',
  },
});
