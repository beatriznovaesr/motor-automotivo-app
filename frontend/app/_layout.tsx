import { Slot } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useFonts, RobotoSerif_400Regular, RobotoSerif_700Bold } from '@expo-google-fonts/roboto-serif';


export default function Layout() {
  const [fontsLoaded] = useFonts({
    RobotoSerif_400Regular,
    RobotoSerif_700Bold,
  });

  if (!fontsLoaded) return null;
  return (
    <View style={styles.container}>
      <Slot /> {/* Aqui as telas aparecem */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
