import React from 'react';
import { View, Text } from 'react-native';
import ConnectionStatusComponent from '../src/components/connectionStatus';

const Home = () => {
  return (
    <View style={{ flex: 1 }}>
      <ConnectionStatusComponent />
      <View style={{ marginTop: 100, alignItems: 'center' }}>
        <Text>Bem-vindo à Home!</Text>
      </View>
    </View>
  );
};

export default Home;
