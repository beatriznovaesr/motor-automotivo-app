import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useConnectionViewModel } from '../../viewmodels/ConnectionViewModel';
import { ConnectionState } from '../../models/connectionStatus';

const ConnectionStatusComponent: React.FC = () => {
  const { status } = useConnectionViewModel();

  if (status.state === ConnectionState.ONLINE) return null;

  const getMessage = () => {
    switch (status.state) {
      case ConnectionState.OFFLINE:
        return 'Sem conexão com a internet';
      case ConnectionState.WEAK:
        return `Conexão fraca (latência: ${status.latency}ms)`;
      default:
        return '';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{getMessage()}</Text>
    </View>
  );
};

export default ConnectionStatusComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ff4d4f',
    padding: 8,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 999,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
  },
});
