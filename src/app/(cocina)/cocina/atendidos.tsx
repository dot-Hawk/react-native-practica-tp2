import { MensajeDeEstado } from '../../../components/MensajeDeEstado';
import { PantallaConDesplazamiento } from '../../../components/PantallaConDesplazamiento';
import { ResumenDePedido } from '../../../components/ResumenDePedido';
import { useComedor } from '../../../context/ComedorContext';

export default function PantallaPedidosAtendidos() {
  const { pedidosAtendidos } = useComedor();

  return (
    <PantallaConDesplazamiento>
      {pedidosAtendidos.length === 0 ? (
        <MensajeDeEstado titulo="Todavía no se atendió ningún pedido" />
      ) : (
        pedidosAtendidos.map((pedido) => <ResumenDePedido key={pedido.numero} pedido={pedido} />)
      )}
    </PantallaConDesplazamiento>
  );
}
