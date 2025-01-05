/*import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as BarcodeScanner from 'expo-barcode-scanner';

const ScanQRCode = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qrData, setQrData] = useState(null);

  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await BarcodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Necesitamos acceso a la cámara para escanear el código QR');
      }
    };
    requestPermission();
  }, []);

  const onScan = ({ type, data }) => {
    setScanned(true);
    setQrData(data);
  };

  const resetScanner = () => {
    setScanned(false);
    setQrData(null);
  };

  if (hasPermission === null) {
    return <Text>Solicitando permisos...</Text>;
  }

  if (hasPermission === false) {
    return <Text>No se ha concedido permiso para usar la cámara.</Text>;
  }

  return (
    <View style={styles.container}>
      {!scanned ? (
        <Camera style={styles.camera} onBarCodeScanned={scanned ? undefined : onScan}>
          <View style={styles.overlay}>
            <Text style={styles.centerText}>Escanea un código QR</Text>
          </View>
        </Camera>
      ) : (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Datos escaneados: {qrData}</Text>
          <Text style={styles.resetText} onPress={resetScanner}>Escanear de nuevo</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  camera: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: '40%',
    width: '100%',
    alignItems: 'center',
  },
  centerText: {
    fontSize: 18,
    color: '#fff',
    padding: 10,
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 20,
    padding: 20,
    color: '#000',
  },
  resetText: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default ScanQRCode;
*/