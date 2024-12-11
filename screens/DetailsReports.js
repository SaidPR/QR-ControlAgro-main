import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const DetailsReports = ({ route, navigation }) => {
  const { report } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Detalles del Reporte</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailTitle}>Título:</Text>
        <Text style={styles.detailContent}>{report.title}</Text>
        <Text style={styles.detailTitle}>Fecha:</Text>
        <Text style={styles.detailContent}>{report.date}</Text>
        <Text style={styles.detailTitle}>Descripción:</Text>
        <Text style={styles.detailContent}>{report.description}</Text>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.buttonText}>Editar Reporte</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => {
            alert("Reporte eliminado correctamente");
            navigation.goBack();
          }}
        >
          <Text style={styles.buttonText}>Eliminar Reporte</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#2c3e50",
  },
  detailsContainer: {
    marginBottom: 30,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#34495e",
    marginBottom: 5,
  },
  detailContent: {
    fontSize: 16,
    color: "#7f8c8d",
    marginBottom: 15,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    backgroundColor: "#2980b9",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default DetailsReports;
