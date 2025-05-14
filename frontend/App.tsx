import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AlterarCadastro from './src/pages/alterarCadastro';
import TelaInicial from './src/pages/telaInicial';

import { useFonts, RobotoSerif_400Regular,
  RobotoSerif_700Bold,
 } from '@expo-google-fonts/roboto-serif';


export default function App() {
  const [fontsLoaded] = useFonts({
    RobotoSerif_400Regular,
    RobotoSerif_700Bold
  });

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TelaInicial></TelaInicial>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
