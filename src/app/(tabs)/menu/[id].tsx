import { Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';

import { BotonAccion } from '../../../components/BotonAccion';
import { EnlaceBoton } from '../../../components/EnlaceBoton';
import { MensajeDeEstado } from '../../../components/MensajeDeEstado';
import { PantallaConDesplazamiento } from '../../../components/PantallaConDesplazamiento';
import { useComedor } from '../../../context/ComedorContext';
import { buscarPlatoPorId, ETIQUETAS_CATEGORIA } from '../../../data/platos';
import { COLORES } from '../../../estilos/tema';
import { formatearPrecio } from '../../../utilidades/formatearPrecio';

export default function PantallaDetallePlato() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { agregarAlCarrito } = useComedor();
  const [cantidadAgregada, setCantidadAgregada] = useState(0);
  const plato = buscarPlatoPorId(id);

  if (!plato) {
    return (
      <PantallaConDesplazamiento>
        <Stack.Screen options={{ title: 'Plato no encontrado' }} />
        <MensajeDeEstado titulo={`No existe el plato "${id}"`} detalle="Volvé al menú y elegí otro plato." />
        <EnlaceBoton href="/menu" titulo="Volver al menú" variante="secundario" />
      </PantallaConDesplazamiento>
    );
  }

  const alAgregar = () => {
    agregarAlCarrito(plato);
    setCantidadAgregada((actual) => actual + 1);
  };

  return (
    <PantallaConDesplazamiento>
      <Stack.Screen options={{ title: plato.nombre }} />
      <Text style={estilos.categoria}>{ETIQUETAS_CATEGORIA[plato.categoria]}</Text>
      <Text style={estilos.nombre}>{plato.nombre}</Text>
      <Text style={estilos.descripcion}>{plato.descripcion}</Text>
      <Text style={estilos.precio}>{formatearPrecio(plato.precio)}</Text>
      <BotonAccion titulo="Agregar al carrito" alPresionar={alAgregar} />
      {cantidadAgregada > 0 ? (
        <>
          <Text style={estilos.confirmacion}>Agregado al carrito ({cantidadAgregada})</Text>
          <EnlaceBoton href="/carrito" titulo="Ir al carrito" variante="secundario" />
        </>
      ) : null}
    </PantallaConDesplazamiento>
  );
}

const estilos = StyleSheet.create({
  categoria: {
    color: COLORES.primario,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  nombre: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORES.texto,
  },
  descripcion: {
    color: COLORES.textoSuave,
    fontSize: 16,
  },
  precio: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORES.primario,
  },
  confirmacion: {
    color: COLORES.exito,
    fontWeight: '600',
  },
});
