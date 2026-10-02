import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { TituloConContadorDePila } from '../components/TituloConContadorDePila';
import { ProveedorComedor, useComedor } from '../context/ComedorContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

function NavegacionRaiz() {
  const { conSesion } = useComedor();

  return (
    <Stack
      screenOptions={{
        headerBackButtonDisplayMode: 'minimal',
        headerTitle: ({ children }) => <TituloConContadorDePila titulo={children} />,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="categorias/[categoria]" options={{ title: 'Categoría' }} />
      <Stack.Screen name="buscar" options={{ title: 'Buscar' }} />
      <Stack.Screen name="confirmar" options={{ presentation: 'modal', title: 'Confirmar pedido' }} />
      <Stack.Screen name="turno/[numero]" options={{ title: 'Tu turno' }} />
      <Stack.Screen name="ayuda/index" options={{ title: 'Ayuda' }} />
      <Stack.Screen name="ayuda/[...slug]" options={{ title: 'Ayuda' }} />
      <Stack.Screen name="pedido" options={{ headerShown: false }} />
      <Stack.Protected guard={conSesion}>
        <Stack.Screen name="(cocina)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={!conSesion}>
        <Stack.Screen name="login" options={{ presentation: 'modal', title: 'Ingreso de cocina' }} />
      </Stack.Protected>
    </Stack>
  );
}

export default function LayoutRaiz() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ProveedorComedor>
        <NavegacionRaiz />
      </ProveedorComedor>
    </GestureHandlerRootView>
  );
}
