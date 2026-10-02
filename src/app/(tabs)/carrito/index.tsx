import { StyleSheet, Text, View } from 'react-native';

import { BotonAccion } from '../../../components/BotonAccion';
import { EnlaceBoton } from '../../../components/EnlaceBoton';
import { MensajeDeEstado } from '../../../components/MensajeDeEstado';
import { PantallaConDesplazamiento } from '../../../components/PantallaConDesplazamiento';
import { useComedor } from '../../../context/ComedorContext';
import { COLORES } from '../../../estilos/tema';
import { formatearPrecio } from '../../../utilidades/formatearPrecio';

export default function PantallaCarrito() {
  const { carrito, totalCarrito, nota, deshacerUltimo, puedeDeshacer } = useComedor();
  const carritoVacio = carrito.length === 0;

  return (
    <PantallaConDesplazamiento>
      {carritoVacio ? (
        <MensajeDeEstado titulo="Tu carrito está vacío" detalle="Agregá platos desde el menú." />
      ) : (
        carrito.map((plato, posicion) => (
          <View key={`${plato.id}-${posicion}`} style={estilos.fila}>
            <Text style={estilos.nombre}>{plato.nombre}</Text>
            <Text style={estilos.precio}>{formatearPrecio(plato.precio)}</Text>
          </View>
        ))
      )}

      <Text style={estilos.total}>Total: {formatearPrecio(totalCarrito)}</Text>
      {nota !== '' ? <Text style={estilos.nota}>Nota: {nota}</Text> : null}

      <BotonAccion titulo="Deshacer último" variante="secundario" deshabilitado={!puedeDeshacer} alPresionar={deshacerUltimo} />
      <EnlaceBoton href="/carrito/nota" titulo="Agregar nota para la cocina" variante="secundario" />
      {carritoVacio ? null : <EnlaceBoton href="/confirmar" titulo="Confirmar pedido" />}
    </PantallaConDesplazamiento>
  );
}

const estilos = StyleSheet.create({
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 10,
    backgroundColor: COLORES.superficie,
    borderWidth: 1,
    borderColor: COLORES.borde,
  },
  nombre: {
    color: COLORES.texto,
    flex: 1,
  },
  precio: {
    fontWeight: '700',
    color: COLORES.primario,
  },
  total: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORES.texto,
  },
  nota: {
    color: COLORES.textoSuave,
  },
});
