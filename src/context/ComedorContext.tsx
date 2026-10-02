import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react';

import { CREDENCIALES_COCINA } from '../data/credencialesCocina';
import type { Plato } from '../data/platos';
import { Cola } from '../estructuras/Cola';
import { Pila } from '../estructuras/Pila';

export type Pedido = {
  numero: number;
  items: Plato[];
  nota: string;
};

export type EstadoPedido =
  | { tipo: 'en-espera'; pedidosAdelante: number }
  | { tipo: 'atendido' }
  | { tipo: 'inexistente' };

type ComedorContextoValor = {
  usuario: string | null;
  conSesion: boolean;
  iniciarSesion: (usuario: string, clave: string) => boolean;
  cerrarSesion: () => void;

  carrito: Plato[];
  cantidadEnCarrito: number;
  totalCarrito: number;
  nota: string;
  guardarNota: (nota: string) => void;
  agregarAlCarrito: (plato: Plato) => void;
  deshacerUltimo: () => void;
  puedeDeshacer: boolean;

  confirmarPedido: () => Pedido | undefined;
  pedidosEnEspera: Pedido[];
  pedidosAtendidos: Pedido[];
  atenderSiguiente: () => Pedido | undefined;
  consultarEstadoPedido: (numero: number) => EstadoPedido;
};

const ComedorContexto = createContext<ComedorContextoValor | null>(null);

export function ProveedorComedor({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<string | null>(null);
  const [carrito, setCarrito] = useState<Plato[]>([]);
  const [nota, setNota] = useState('');

  const pilaDeshacer = useRef(new Pila<Plato>());
  const colaPedidos = useRef(new Cola<Pedido>());
  const pilaAtendidos = useRef(new Pila<Pedido>());
  const siguienteNumeroTurno = useRef(1);

  const [pedidosEnEspera, setPedidosEnEspera] = useState<Pedido[]>([]);
  const [pedidosAtendidos, setPedidosAtendidos] = useState<Pedido[]>([]);
  const [puedeDeshacer, setPuedeDeshacer] = useState(false);

  const iniciarSesion = useCallback((usuarioIngresado: string, claveIngresada: string) => {
    const credencialesCorrectas =
      usuarioIngresado.trim() === CREDENCIALES_COCINA.usuario && claveIngresada === CREDENCIALES_COCINA.clave;
    if (credencialesCorrectas) setUsuario(usuarioIngresado.trim());
    return credencialesCorrectas;
  }, []);

  const cerrarSesion = useCallback(() => setUsuario(null), []);

  const agregarAlCarrito = useCallback((plato: Plato) => {
    pilaDeshacer.current.push(plato);
    setCarrito((actual) => [...actual, plato]);
    setPuedeDeshacer(true);
  }, []);

  const deshacerUltimo = useCallback(() => {
    const platoQuitado = pilaDeshacer.current.pop();
    if (platoQuitado === undefined) return;
    setCarrito((actual) => actual.slice(0, -1));
    setPuedeDeshacer(!pilaDeshacer.current.vacia);
  }, []);

  const confirmarPedido = useCallback(() => {
    if (carrito.length === 0) return undefined;
    const pedido: Pedido = { numero: siguienteNumeroTurno.current, items: carrito, nota };
    siguienteNumeroTurno.current += 1;
    colaPedidos.current.encolar(pedido);
    setPedidosEnEspera(colaPedidos.current.aArray());
    pilaDeshacer.current = new Pila<Plato>();
    setCarrito([]);
    setNota('');
    setPuedeDeshacer(false);
    return pedido;
  }, [carrito, nota]);

  const atenderSiguiente = useCallback(() => {
    const pedidoAtendido = colaPedidos.current.desencolar();
    if (pedidoAtendido === undefined) return undefined;
    pilaAtendidos.current.push(pedidoAtendido);
    setPedidosEnEspera(colaPedidos.current.aArray());
    setPedidosAtendidos(pilaAtendidos.current.aArray().reverse());
    return pedidoAtendido;
  }, []);

  const consultarEstadoPedido = useCallback(
    (numero: number): EstadoPedido => {
      const posicion = pedidosEnEspera.findIndex((pedido) => pedido.numero === numero);
      if (posicion >= 0) return { tipo: 'en-espera', pedidosAdelante: posicion };
      if (pedidosAtendidos.some((pedido) => pedido.numero === numero)) return { tipo: 'atendido' };
      return { tipo: 'inexistente' };
    },
    [pedidosEnEspera, pedidosAtendidos],
  );

  const valor = useMemo<ComedorContextoValor>(
    () => ({
      usuario,
      conSesion: usuario !== null,
      iniciarSesion,
      cerrarSesion,
      carrito,
      cantidadEnCarrito: carrito.length,
      totalCarrito: carrito.reduce((suma, plato) => suma + plato.precio, 0),
      nota,
      guardarNota: setNota,
      agregarAlCarrito,
      deshacerUltimo,
      puedeDeshacer,
      confirmarPedido,
      pedidosEnEspera,
      pedidosAtendidos,
      atenderSiguiente,
      consultarEstadoPedido,
    }),
    [
      usuario,
      iniciarSesion,
      cerrarSesion,
      carrito,
      nota,
      agregarAlCarrito,
      deshacerUltimo,
      puedeDeshacer,
      confirmarPedido,
      pedidosEnEspera,
      pedidosAtendidos,
      atenderSiguiente,
      consultarEstadoPedido,
    ],
  );

  return <ComedorContexto.Provider value={valor}>{children}</ComedorContexto.Provider>;
}

export function useComedor(): ComedorContextoValor {
  const contexto = useContext(ComedorContexto);
  if (contexto === null) {
    throw new Error('useComedor debe usarse dentro de ProveedorComedor');
  }
  return contexto;
}
