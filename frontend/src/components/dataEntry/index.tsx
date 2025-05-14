import React, { useState } from 'react';
import {
  View,
  TextInput,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface InputDeDataProps {
  value: Date;
  onChange: (date: Date) => void;
}

export default function InputDeData({ value, onChange }: InputDeDataProps) {
  const [mostrar, setMostrar] = useState(false);

  const abrirPicker = () => setMostrar(true);
  const fecharPicker = () => setMostrar(false);

  const aoSelecionar = (_event: any, selectedDate?: Date) => {
    if (selectedDate) {
      onChange(selectedDate);
    }
    if (Platform.OS === 'android') setMostrar(false);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.label}>Data de nascimento</Text>

      <Pressable onPress={abrirPicker}>
        <TextInput
          style={styles.input}
          value={value.toLocaleDateString()}
          editable={false}
          pointerEvents="none"
        />
      </Pressable>

      {mostrar && Platform.OS === 'ios' && (
        <View style={styles.pickerContainer}>
          <DateTimePicker
            value={value}
            mode="date"
            display="spinner"
            onChange={aoSelecionar}
            style={{ backgroundColor: '#fff' }}
          />
          <Pressable onPress={fecharPicker}>
            <Text style={styles.fecharTexto}>Fechar</Text>
          </Pressable>
        </View>
      )}

      {mostrar && Platform.OS === 'android' && (
        <DateTimePicker
          value={value}
          mode="date"
          display="default"
          onChange={aoSelecionar}
        />
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    width: '100%',
    justifyContent: 'center'
  },

  label: {
    marginBottom: 10,
    fontFamily: 'RobotoSerif_400Regular',
    color: "#FFFFFF",
    paddingLeft: 50
  },

  input: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 40,
    padding: 12,
    backgroundColor: '#fff',
    width: '80%',
    paddingLeft:'30%',
    marginBottom: 10,
    marginLeft: 40
    },

  pickerContainer: {
    position: 'absolute',
    bottom: -300,
    width: '100%',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 5,
    zIndex: 999, 
    elevation: 10, 
    justifyContent: 'center',
    alignItems: 'center'
  },
  fecharTexto: {
    textAlign: 'center',
    color: '#007AFF',
    paddingBottom: 50,
    fontSize: 16,
  },
});
