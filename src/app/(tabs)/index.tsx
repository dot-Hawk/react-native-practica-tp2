import { StyleSheet, Text } from 'react-native';

import { BotonAccion } from '../../components/BotonAccion';
import { PantallaConDesplazamiento } from '../../components/PantallaConDesplazamiento';
import { TarjetaAccesoRapido } from '../../components/TarjetaAccesoRapido';
import { useComedor } from '../../context/ComedorContext';
import { COLORES } from '../../estilos/tema';

export default function PantallaInicio() {
  const { conSesion, usuario, cerrarSesion } = useComedor();

  return (
    <PantallaConDesplazamiento>
      <Text style={estilos.saludo}>¡Bienvenido al Comedor IPF!</Text>
      <Text style={estilos.subtitulo}>
        {conSesion ? `Sesión de cocina iniciada: ${usuario}` : 'Elegí qué querés hacer'}
      </Text>

      <TarjetaAccesoRapido href="/menu" titulo="Menú" descripcion="Mirá los platos disponibles" />
      <TarjetaAccesoRapido href="/buscar" titulo="Buscar" descripcion="Encontrá un plato por nombre o categoría" />
      <TarjetaAccesoRapido href="/ayuda" titulo="Ayuda" descripcion="Cómo pedir, pagar y retirar" />
      <TarjetaAccesoRapido
        href={conSesion ? '/cocina' : '/login'}
        titulo="Cocina"
        descripcion={conSesion ? 'Atendé los pedidos en espera' : 'Ingreso del personal de cocina'}
      />

      {conSesion ? <BotonAccion titulo="Cerrar sesión" variante="secundario" alPresionar={cerrarSesion} /> : null}
    </PantallaConDesplazamiento>
  );
}

const estilos = StyleSheet.create({
  saludo: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORES.primario,
  },
  subtitulo: {
    color: COLORES.textoSuave,
  },
});
