import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Platform, Image } from 'react-native';

const ConnectionErrorModal = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent={true}
      accessibilityViewIsModal={true}
      accessible={true}
      accessibilityLabel="Erro de conexão com a Internet"
    >
      <View style={styles.backdrop}>
        <View style={styles.modalContainer} accessible accessibilityRole="alert" accessibilityLiveRegion="polite">
           <Image
            source={require('../../../app/assets/wifi-off.png')}
            style={styles.image}
            resizeMode="contain"
            accessibilityLabel="Imagem ilustrando erro de conexão"
          />
          <Text style={styles.title}>Erro de conexão com a internet!</Text>
          <Text style={styles.message}>Tente novamente mais tarde.</Text>
          <TouchableOpacity
            onPress={onClose}
            style={styles.button}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Fechar modal de erro"
          >
            <Text style={styles.buttonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#F2F2F2',
    borderRadius: 12,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 8 },
    elevation: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: Platform.OS === 'ios' ? '700' : 'bold',
    color: '#0442BF', 
    marginTop: 24,
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 18,
    color: '#A6A6A6', 
    textAlign: 'center',
    marginBottom: 28,
  },
  button: {
    backgroundColor: '#0442BF', 
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 36,
    shadowColor: '#0442BF',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
    fontSize: 16,
  },
});

export default ConnectionErrorModal;

