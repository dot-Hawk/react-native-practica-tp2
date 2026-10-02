import { Stack, usePathname } from 'expo-router';

import { EnlaceBoton } from '../components/EnlaceBoton';
import { MensajeDeEstado } from '../components/MensajeDeEstado';
import { PantallaConDesplazamiento } from '../components/PantallaConDesplazamiento';

export default function PantallaNoEncontrada() {
  const rutaInexistente = usePathname();

  return (
    <PantallaConDesplazamiento>
      <Stack.Screen options={{ title: 'Página no encontrada' }} />
      <MensajeDeEstado titulo="Error 404" detalle={`La ruta "${rutaInexistente}" no existe.`} />
      <EnlaceBoton href="/" titulo="Ir al inicio" reemplazar />
    </PantallaConDesplazamiento>
  );
}
