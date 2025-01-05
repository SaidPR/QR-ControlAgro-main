import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const { width } = Dimensions.get("window");

const GenerateQR = ({ route }) => {
  const user = route.params?.user;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Código QR para {user.name}</Text>
      <QRCode
        value={JSON.stringify(user)} 
        size={width * 0.6}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
});

export default GenerateQR;
