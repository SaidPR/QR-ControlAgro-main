import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { doc, deleteDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";

const DetailsReports = ({ route, navigation }) => {
  const { report } = route.params;

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    if (isNaN(formattedDate.getTime())) {
      return ""; 
    }
    return formattedDate.toLocaleString();
  };

  const handleDeleteReport = async () => {
    Alert.alert(
      "Eliminar Reporte",
      "¿Estás seguro de que deseas eliminar este reporte?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", style: "destructive", onPress: deleteReport },
      ]
    );
  };

  const deleteReport = async () => {
    try {
      const reportRef = doc(FIRESTORE_DB, "reports", report.id);  
      await deleteDoc(reportRef);
      Alert.alert("Éxito", "El reporte ha sido eliminado.");
      navigation.goBack(); 
    } catch (error) {
      console.error("Error al eliminar el reporte:", error);
      Alert.alert("Error", "No se pudo eliminar el reporte.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{report.title}</Text>
      {/* Validar y mostrar la fecha */}
      <Text style={styles.date}>{formatDate(report.date)}</Text>
      <Text style={styles.description}>{report.description}</Text>

      {/* Mostrar las asistencias */}
      <Text style={styles.subTitle}>Asistencias:</Text>
      {report.attendance && report.attendance.length > 0 ? (
        report.attendance.map((attendance, index) => (
          <View key={index} style={styles.attendanceItem}>
            <Text style={styles.attendanceText}>
              {formatDate(attendance.date)} - {attendance.status}
            </Text>
          </View>
        ))
      ) : (
        <Text style={styles.noAttendance}>No hay registros de asistencia.</Text>
      )}

      {/* Botón para eliminar el reporte */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDeleteReport}
      >
        <Text style={styles.deleteButtonText}>Eliminar Reporte</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  date: {
    fontSize: 18,
    color: "#7f8c8d",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#34495e",
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  attendanceItem: {
    marginBottom: 10,
  },
  attendanceText: {
    fontSize: 16,
    color: "#2980b9",
  },
  noAttendance: {
    fontSize: 16,
    color: "#e74c3c",
  },
  deleteButton: {
    marginTop: 20,
    paddingVertical: 15,
    backgroundColor: "#e74c3c",
    borderRadius: 10,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DetailsReports;
