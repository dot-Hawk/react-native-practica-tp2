import { StyleSheet, Text } from 'react-native';

import { BotonAccion } from '../../../components/BotonAccion';
import { MensajeDeEstado } from '../../../components/MensajeDeEstado';
import { PantallaConDesplazamiento } from '../../../components/PantallaConDesplazamiento';
import { ResumenDePedido } from '../../../components/ResumenDePedido';
import { useComedor } from '../../../context/ComedorContext';
import { COLORES } from '../../../estilos/tema';

export default function PantallaCocina() {
  const { pedidosEnEspera, atenderSiguiente } = useComedor();
  const [pedidoAlFrente] = pedidosEnEspera;

  return (
    <PantallaConDesplazamiento>
      <Text style={estilos.contador}>Pedidos en espera: {pedidosEnEspera.length}</Text>
      {pedidoAlFrente === undefined ? (
        <MensajeDeEstado titulo="No hay pedidos en espera" detalle="Cuando un alumno confirme un pedido aparecerá acá." />
      ) : (
        <>
          <Text style={estilos.subtitulo}>Siguiente pedido</Text>
          <ResumenDePedido pedido={pedidoAlFrente} />
        </>
      )}
      <BotonAccion titulo="Atender siguiente" deshabilitado={pedidoAlFrente === undefined} alPresionar={atenderSiguiente} />
    </PantallaConDesplazamiento>
  );
}

const estilos = StyleSheet.create({
  contador: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORES.texto,
  },
  subtitulo: {
    color: COLORES.textoSuave,
    fontWeight: '600',
  },
});
