import { StatusBar } from 'expo-status-bar';
import { Modal, StyleSheet, Text, View } from 'react-native';
import  Cadastro  from './app/cadastro.tsx';
import { useFonts, RobotoSerif_400Regular,
  RobotoSerif_700Bold,
 } from '@expo-google-fonts/roboto-serif';

export default function App() {
  const [fontsLoaded] = useFonts({
    RobotoSerif_400Regular,
    RobotoSerif_700Bold
  });
  
  if (!fontsLoaded) return null;
  
  return (    
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Cadastro></Cadastro>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});