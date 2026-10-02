import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { BotonAccion } from '../components/BotonAccion';
import { MensajeDeEstado } from '../components/MensajeDeEstado';
import { PantallaConDesplazamiento } from '../components/PantallaConDesplazamiento';
import { useComedor } from '../context/ComedorContext';
import { COLORES } from '../estilos/tema';
import { formatearPrecio } from '../utilidades/formatearPrecio';

export default function PantallaConfirmarPedido() {
  const { carrito, totalCarrito, nota, confirmarPedido } = useComedor();

  const alConfirmar = () => {
    const pedido = confirmarPedido();
    if (pedido === undefined) return;
    router.replace({ pathname: '/turno/[numero]', params: { numero: pedido.numero } });
  };

  return (
    <PantallaConDesplazamiento>
      {carrito.length === 0 ? (
        <MensajeDeEstado titulo="No hay nada para confirmar" detalle="Agregá platos al carrito primero." />
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
      <BotonAccion titulo="Confirmar" deshabilitado={carrito.length === 0} alPresionar={alConfirmar} />
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
