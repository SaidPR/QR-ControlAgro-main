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
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";

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

  const handleGenerateReport = async () => {
    try {
      const attendanceCollection = collection(FIRESTORE_DB, "attendance");
      const q = query(
        attendanceCollection,
        where("workerId", "==", worker.id) 
      );
      const snapshot = await getDocs(q);

      const attendanceData = snapshot.docs.map((doc) => doc.data());

      if (attendanceData.length === 0) {
        Alert.alert("Sin Asistencias", "No se encontraron registros de asistencia.");
        return;
      }

      const reportData = {
        title: `Reporte de Asistencia de ${worker.name}`,
        date: new Date().toLocaleDateString(),
        description: `Reporte generado para el trabajador ${worker.name}`,
        workerId: worker.id,
        createdAt: new Date(),
        attendance: attendanceData, 
      };

      const reportsCollection = collection(FIRESTORE_DB, "reports");
      await addDoc(reportsCollection, reportData);

      Alert.alert("Reporte Generado", "El reporte ha sido guardado con éxito.");
      
      navigation.navigate("Reports");
    } catch (error) {
      console.error("Error al generar el reporte:", error);
      Alert.alert("Error", "No se pudo generar el reporte.");
    }
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
        <TouchableOpacity style={styles.cameraIcon}>
          <FontAwesome name="camera" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{worker.name}</Text>
      <Text style={styles.detail}>📞 {worker.phone}</Text>
      <Text style={styles.detail}>📍 {worker.location}</Text>

      {/* Botón para generar reporte */}
      <TouchableOpacity
        style={styles.reportButton}
        onPress={handleGenerateReport}
      >
        <Text style={styles.reportButtonText}>Generar Reporte de Asistencia</Text>
      </TouchableOpacity>
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
  reportButton: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#007bff",
    borderRadius: 10,
  },
  reportButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default WorkerDetails;
