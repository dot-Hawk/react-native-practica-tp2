import { useState } from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';

import { BotonAccion } from '../components/BotonAccion';
import { PantallaConDesplazamiento } from '../components/PantallaConDesplazamiento';
import { useComedor } from '../context/ComedorContext';
import { COLORES } from '../estilos/tema';

export default function PantallaLogin() {
  const { iniciarSesion } = useComedor();
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [mensajeDeError, setMensajeDeError] = useState('');

  const alIngresar = () => {
    const credencialesCorrectas = iniciarSesion(usuario, clave);
    if (!credencialesCorrectas) setMensajeDeError('Usuario o clave incorrectos');
  };

  return (
    <PantallaConDesplazamiento>
      <TextInput
        value={usuario}
        onChangeText={setUsuario}
        placeholder="Usuario"
        autoCapitalize="none"
        style={estilos.campo}
      />
      <TextInput
        value={clave}
        onChangeText={setClave}
        placeholder="Clave"
        secureTextEntry
        autoCapitalize="none"
        style={estilos.campo}
      />
      {mensajeDeError !== '' ? <Text style={estilos.error}>{mensajeDeError}</Text> : null}
      <BotonAccion titulo="Ingresar" alPresionar={alIngresar} />
    </PantallaConDesplazamiento>
  );
}

const estilos = StyleSheet.create({
  campo: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORES.borde,
    backgroundColor: COLORES.superficie,
  },
  error: {
    color: COLORES.peligro,
    fontWeight: '600',
  },
});
