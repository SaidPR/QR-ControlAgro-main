import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const WorkerDetails = ({ route, navigation }) => {
  const [profilePhoto, setProfilePhoto] = useState(
    route.params?.worker?.profilePhoto || null
  ); // Inicializamos con la foto del trabajador o nulo

  const worker = route.params?.worker;

  if (!worker) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          No se encontró información del trabajador.
        </Text>
        <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.goBackText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permiso requerido", "Se requiere acceso a la cámara.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled) {
      setProfilePhoto(result.assets[0].uri);
      Alert.alert("Éxito", "La imagen ha sido actualizada.");
    }
  };

  const handleGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permiso requerido", "Se requiere acceso a la galería.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled) {
      setProfilePhoto(result.assets[0].uri);
      Alert.alert("Éxito", "La imagen ha sido actualizada.");
    }
  };

  const handleCameraAlert = () => {
    Alert.alert("Imagen de Perfil", "Selecciona una opción", [
      { text: "Cámara", onPress: handleCamera },
      { text: "Galería", onPress: handleGallery },
      { text: "Cancelar", style: "cancel" },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Sección de imagen de perfil */}
      <View style={styles.profileSection}>
        <Image
          source={
            profilePhoto
              ? { uri: profilePhoto }
              : require("../assets/default-profile.png")
          }
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.cameraIcon} onPress={handleCameraAlert}>
          <FontAwesome name="camera" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{worker.name}</Text>
      <Text style={styles.detail}>📞 {worker.phone}</Text>
      <Text style={styles.detail}>📍 {worker.location}</Text>
      <Text style={styles.description}>{worker.description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    marginBottom: 20,
    textAlign: "center",
  },
  goBackButton: {
    backgroundColor: "#e74c3c",
    padding: 10,
    borderRadius: 5,
  },
  goBackText: {
    color: "#fff",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 20,
    alignItems: "center",
  },
  profileSection: {
    position: "relative",
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#14ae5c",
    borderRadius: 15,
    padding: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  detail: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginTop: 10,
    textAlign: "center",
  },
});

export default WorkerDetails;
