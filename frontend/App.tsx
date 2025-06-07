import { StatusBar } from 'expo-status-bar';
import { Modal, StyleSheet, Text, View } from 'react-native';
import NoConnectionBanner from './src/components/NoConnectionBanner';
import { useNetworkStatus } from './src/viewmodels/NetworkViewModel';
import  Cadastro  from './app/cadastro.tsx';
import { useFonts, RobotoSerif_400Regular,
  RobotoSerif_700Bold,
 } from '@expo-google-fonts/roboto-serif';


export default function App() {
  const { isConnected } = useNetworkStatus();
  const [fontsLoaded] = useFonts({
    RobotoSerif_400Regular,
    RobotoSerif_700Bold
  });
  
  if (!fontsLoaded) return null;
  
  return (    
    <View style={styles.root}>

      <StatusBar style="auto" />
      {!isConnected && <NoConnectionBanner />}

      {/* Overlay bloqueador */}
      <Modal
        visible={!isConnected}
        transparent
        animationType="fade"
      >
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>Sem conexão com a internet</Text>
        </View>
      </Modal>

      <View style={styles.container}>
        <Cadastro></Cadastro>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    position: 'relative', // necessário para o banner absoluto funcionar
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
    backgroundColor: '#D32F2F',
    borderRadius: 10,
  },
});