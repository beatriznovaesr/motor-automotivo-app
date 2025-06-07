// frontend/src/components/NoConnectionBanner.tsx
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

export default function NoConnectionBanner() {
  console.log('🔴 Banner exibido');
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sem conexão com a internet</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    width: Dimensions.get('window').width,
    backgroundColor: '#D32F2F',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    elevation: 10, // necessário para Android
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});