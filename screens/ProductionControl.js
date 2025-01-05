import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";

const ProductionControl = ({ navigation }) => {
  const [production, setProduction] = useState([]);

  // Recuperar registros de producción desde Firestore
  const fetchProduction = async () => {
    try {
      const snapshot = await getDocs(collection(FIRESTORE_DB, "productions"));
      const productionList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProduction(productionList);
    } catch (error) {
      console.error("Error al obtener los registros de producción:", error);
    }
  };

  // Guardar nuevo registro en Firestore
  const handleAddRecord = async (record) => {
    try {
      const docRef = await addDoc(collection(FIRESTORE_DB, "productions"), record);
      setProduction((prev) => [
        ...prev,
        { id: docRef.id, ...record },
      ]);
    } catch (error) {
      console.error("Error al guardar el registro:", error);
    }
  };

  useEffect(() => {
    fetchProduction();
  }, []); // Se ejecuta una vez al cargar el componente

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
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate("AddProductionRecord", { 
              onSave: handleAddRecord 
            })}
          >
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
