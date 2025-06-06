import { Slot } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useFonts, RobotoSerif_400Regular, RobotoSerif_700Bold } from '@expo-google-fonts/roboto-serif';
import { UserProvider } from '../src/contexts/userContext';
import * as React from 'react';
import { PaperProvider } from 'react-native-paper';


export default function Layout() {
  const [fontsLoaded] = useFonts({
    RobotoSerif_400Regular,
    RobotoSerif_700Bold,
  });

  if (!fontsLoaded) return null;
  return (
    <PaperProvider>
      <UserProvider>
      <View style={styles.container}>
        <Slot /> {/* Aqui as telas aparecem */}
      </View>
      </UserProvider>
    </PaperProvider>
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
