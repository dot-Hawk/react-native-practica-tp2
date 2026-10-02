import { router } from 'expo-router';
import { StyleSheet, TextInput } from 'react-native';

import { BotonAccion } from '../../../components/BotonAccion';
import { PantallaConDesplazamiento } from '../../../components/PantallaConDesplazamiento';
import { useComedor } from '../../../context/ComedorContext';
import { COLORES } from '../../../estilos/tema';

export default function PantallaNotaCarrito() {
  const { nota, guardarNota } = useComedor();

  return (
    <PantallaConDesplazamiento>
      <TextInput
        value={nota}
        onChangeText={guardarNota}
        placeholder="Por ejemplo: sin sal"
        multiline
        style={estilos.campo}
      />
      <BotonAccion titulo="Listo" alPresionar={() => router.back()} />
    </PantallaConDesplazamiento>
  );
}

const estilos = StyleSheet.create({
  campo: {
    minHeight: 100,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORES.borde,
    backgroundColor: COLORES.superficie,
    textAlignVertical: 'top',
  },
});
