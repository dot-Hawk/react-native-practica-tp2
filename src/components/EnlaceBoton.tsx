import { Link, type Href } from 'expo-router';
import { StyleSheet } from 'react-native';

import { COLORES } from '../estilos/tema';

type EnlaceBotonProps = {
  href: Href;
  titulo: string;
  variante?: 'primario' | 'secundario';
  reemplazar?: boolean;
};

export function EnlaceBoton({ href, titulo, variante = 'primario', reemplazar = false }: EnlaceBotonProps) {
  return (
    <Link
      href={href}
      replace={reemplazar}
      style={variante === 'primario' ? estilos.primario : estilos.secundario}
    >
      {titulo}
    </Link>
  );
}

const base = {
  paddingVertical: 12,
  paddingHorizontal: 16,
  borderRadius: 10,
  overflow: 'hidden' as const,
  textAlign: 'center' as const,
  fontWeight: '700' as const,
};

const estilos = StyleSheet.create({
  primario: {
    ...base,
    backgroundColor: COLORES.primario,
    color: '#ffffff',
  },
  secundario: {
    ...base,
    backgroundColor: COLORES.primarioSuave,
    color: COLORES.primario,
  },
});
