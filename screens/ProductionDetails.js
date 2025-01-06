import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";

const ProductionDetails = ({ route, navigation }) => {
  const { record } = route.params;

  const handleEdit = () => {
    navigation.navigate("AddProductionRecord", {
      record,
      onSave: async (updatedRecord) => {
        try {
          const recordRef = doc(FIRESTORE_DB, "productions", record.id);
          await updateDoc(recordRef, updatedRecord);
          Alert.alert("Éxito", "El registro fue actualizado.");
          navigation.goBack(); 
        } catch (error) {
          console.error("Error al actualizar el registro:", error);
          Alert.alert("Error", "No se pudo actualizar el registro.");
        }
      },
    });
  };

  const handleDelete = async () => {
    Alert.alert("Eliminar", "¿Estás seguro de eliminar este registro?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        onPress: async () => {
          try {
            const recordRef = doc(FIRESTORE_DB, "productions", record.id);
            await deleteDoc(recordRef);
            Alert.alert("Éxito", "El registro fue eliminado.");
            navigation.goBack(); // Volver a la lista
          } catch (error) {
            console.error("Error al eliminar el registro:", error);
            Alert.alert("Error", "No se pudo eliminar el registro.");
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{record.name}</Text>
        <Text style={styles.date}>{record.date}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.detail}>Cajas: {record.boxes}</Text>
        <Text style={styles.detail}>Cubetas: {record.buckets}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Text style={styles.editButtonText}>Editar registro</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Eliminar registro</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  date: {
    fontSize: 16,
    color: "#555",
  },
  details: {
    marginBottom: 20,
  },
  detail: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    backgroundColor: "#34d058",
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ProductionDetails;
