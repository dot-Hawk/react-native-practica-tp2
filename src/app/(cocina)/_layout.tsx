import { Drawer } from 'expo-router/drawer';
import { Pressable, Text } from 'react-native';

import { useComedor } from '../../context/ComedorContext';
import { COLORES } from '../../estilos/tema';

function BotonCerrarSesion() {
  const { cerrarSesion } = useComedor();

  return (
    <Pressable onPress={cerrarSesion} style={{ paddingHorizontal: 16 }}>
      <Text style={{ color: COLORES.peligro, fontWeight: '700' }}>Cerrar sesión</Text>
    </Pressable>
  );
}

export default function LayoutCocina() {
  return (
    <Drawer screenOptions={{ headerRight: () => <BotonCerrarSesion /> }}>
      <Drawer.Screen name="cocina/index" options={{ title: 'Pedidos en espera', drawerLabel: 'Pedidos en espera' }} />
      <Drawer.Screen name="cocina/atendidos" options={{ title: 'Pedidos atendidos', drawerLabel: 'Pedidos atendidos' }} />
    </Drawer>
  );
}
