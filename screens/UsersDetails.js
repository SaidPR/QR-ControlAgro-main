import React from 'react';
import { View, Text, StyleSheet, Button, Alert,  Dimensions,
  TouchableOpacity } from 'react-native';
import { deleteDoc, doc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../firebaseConfig'; // Asegúrate de importar tu configuración

const { width, height } = Dimensions.get("window");
const UsersDetails = ({ route, navigation }) => {
  const user = route.params?.user;

  // Función para eliminar al usuario de la base de datos
  const handleDeleteUser = async () => {
    try {
      // Elimina el documento del usuario en Firestore
      await deleteDoc(doc(FIRESTORE_DB, 'users', user.id));
      // Muestra un mensaje de éxito al usuario
      Alert.alert('Éxito', 'Usuario eliminado correctamente.');
      // Navega hacia atrás en la pila de navegación
      navigation.goBack();
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      // Muestra un mensaje de error al usuario
      Alert.alert('Error', 'No se pudo eliminar el usuario.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Muestra el nombre del usuario */}
      <Text style={styles.title}>{user.name}</Text>

      {/* Muestra todos los campos del usuario */}
      {Object.keys(user).map((key) => {
        if (key !== 'id' && key !== 'profilePhoto') {
          return (
            <View key={key} style={styles.detailRow}>
              <Text style={styles.detailLabel}>{key.toUpperCase()}:</Text>
              <Text style={styles.detailValue}>{user[key]}</Text>
            </View>
          );
        }
        return null;
      })}

      {/* Botón para eliminar al usuario */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleDeleteUser}
      >
      <Text style={styles.buttonText}>Eliminar Usuario</Text>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  detailLabel: {
    fontWeight: 'bold',
    marginRight: 5,
    color: '#333',
  },
  detailValue: {
    color: '#666',
  },
  button: {
    width: "100%",
    paddingVertical: height * 0.02,
    backgroundColor: "#e74c3c",
    borderRadius: 10,
    alignItems: "center",
    marginTop: height * 0.05,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // Para Android
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default UsersDetails;