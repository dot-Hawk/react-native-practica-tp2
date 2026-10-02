import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { EnlaceBoton } from '../../components/EnlaceBoton';
import { MensajeDeEstado } from '../../components/MensajeDeEstado';
import { PantallaConDesplazamiento } from '../../components/PantallaConDesplazamiento';
import { useComedor } from '../../context/ComedorContext';
import { COLORES } from '../../estilos/tema';

const MINUTOS_POR_PEDIDO = 3;

export default function PantallaTurno() {
  const { numero } = useLocalSearchParams<{ numero: string }>();
  const { consultarEstadoPedido } = useComedor();
  const numeroDeTurno = /^\d+$/.test(numero ?? '') ? Number(numero) : undefined;
  const estado = numeroDeTurno === undefined ? undefined : consultarEstadoPedido(numeroDeTurno);

  return (
    <PantallaConDesplazamiento>
      {estado === undefined || estado.tipo === 'inexistente' ? (
        <MensajeDeEstado titulo={`No existe el turno "${numero}"`} detalle="Revisá el número e intentá de nuevo." />
      ) : (
        <>
          <Text style={estilos.numero}>Turno {numeroDeTurno}</Text>
          {estado.tipo === 'atendido' ? (
            <MensajeDeEstado titulo="Tu pedido ya fue atendido" detalle="Pasá a retirarlo por el mostrador." />
          ) : (
            <MensajeDeEstado
              titulo={`Pedidos adelante tuyo: ${estado.pedidosAdelante}`}
              detalle={`Espera estimada: ${estado.pedidosAdelante * MINUTOS_POR_PEDIDO} minutos`}
            />
          )}
        </>
      )}
      <EnlaceBoton href="/menu" titulo="Volver al menú" variante="secundario" />
    </PantallaConDesplazamiento>
  );
}

const estilos = StyleSheet.create({
  numero: {
    fontSize: 40,
    fontWeight: '800',
    color: COLORES.primario,
  },
});
