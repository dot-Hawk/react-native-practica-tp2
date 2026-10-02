export type ArticuloAyuda = {
  ruta: string[];
  titulo: string;
  contenido: string;
};

export const ARTICULOS_AYUDA: ArticuloAyuda[] = [
  {
    ruta: ['pagos'],
    titulo: 'Medios de pago',
    contenido: 'En el comedor se puede pagar en efectivo o con transferencia al retirar el pedido.',
  },
  {
    ruta: ['pagos', 'efectivo'],
    titulo: 'Pago en efectivo',
    contenido: 'Abonás en el mostrador al retirar tu pedido, indicando el número de turno.',
  },
  {
    ruta: ['pagos', 'transferencia'],
    titulo: 'Pago por transferencia',
    contenido: 'Transferí al alias del comedor y mostrá el comprobante en el mostrador junto con tu número de turno.',
  },
  {
    ruta: ['pedidos', 'turnos'],
    titulo: 'Cómo funcionan los turnos',
    contenido: 'Los pedidos se atienden en orden de llegada. Tu número de turno indica cuántos pedidos hay antes que el tuyo.',
  },
  {
    ruta: ['pedidos', 'cancelar'],
    titulo: 'Cancelar un pedido',
    contenido: 'Mientras el pedido siga en el carrito podés quitar el último plato con el botón Deshacer último.',
  },
  {
    ruta: ['horarios'],
    titulo: 'Horarios de atención',
    contenido: 'El comedor atiende de lunes a viernes, de 7:30 a 14:00.',
  },
];

export function buscarArticuloAyuda(ruta: string[]): ArticuloAyuda | undefined {
  return ARTICULOS_AYUDA.find(
    (articulo) => articulo.ruta.length === ruta.length && articulo.ruta.every((segmento, posicion) => segmento === ruta[posicion]),
  );
}
