import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

const ProductionControl = ({ navigation }) => {
  const [production, setProduction] = useState([
    { id: "1", name: "Morgan James", date: "18 Nov 2024", boxes: 12, buckets: 10 },
    { id: "2", name: "John Doe", date: "17 Nov 2024", boxes: 15, buckets: 13 },
    { id: "3", name: "J Mole", date: "16 Nov 2024", boxes: 10, buckets: 9 },
  ]);

  const handleAddRecord = () => {
    Alert.alert("Función no implementada", "Próximamente podrás agregar registros.");
  };

  const renderProduction = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("ProductionDetails", { record: item })}
    >
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.details}>Cajas: {item.boxes} | Cubetas: {item.buckets}</Text>
      </View>
      <Text style={styles.viewDetails}>Ver detalles</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={production}
        keyExtractor={(item) => item.id}
        renderItem={renderProduction}
        ListHeaderComponent={
          <TouchableOpacity style={styles.addButton} onPress={handleAddRecord}>
            <Text style={styles.addButtonText}>+ Añadir Registro</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 10,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    color: "#555",
  },
  details: {
    fontSize: 14,
    color: "#333",
  },
  viewDetails: {
    marginTop: 10,
    color: "#007BFF",
    fontWeight: "bold",
    textAlign: "right",
  },
  addButton: {
    backgroundColor: "#34d058",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ProductionControl;
