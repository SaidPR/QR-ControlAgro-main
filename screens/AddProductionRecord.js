import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";

const AddProductionRecord = ({ navigation, route }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(route.params?.record?.name || "");
  const [boxes, setBoxes] = useState(route.params?.record?.boxes?.toString() || "");
  const [buckets, setBuckets] = useState(route.params?.record?.buckets?.toString() || "");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snapshot = await getDocs(collection(FIRESTORE_DB, "users"));
        const userList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userList);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
        Alert.alert("Error", "No se pudieron cargar los usuarios.");
      }
    };
    fetchUsers();
  }, []);

  const handleSaveRecord = async () => {
    if (!selectedUser || !boxes || !buckets) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    const record = {
      name: selectedUser,
      date: route.params?.record?.date || new Date().toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      boxes: parseInt(boxes, 10),
      buckets: parseInt(buckets, 10),
    };

    if (route.params?.record) {
      // Editar registro existente
      try {
        const recordRef = doc(FIRESTORE_DB, "productions", route.params.record.id);
        await updateDoc(recordRef, record);
        Alert.alert("Éxito", "El registro fue actualizado.");
        navigation.navigate("ProductionControl");
      } catch (error) {
        console.error("Error al actualizar el registro:", error);
        Alert.alert("Error", "No se pudo actualizar el registro.");
      }
    } else if (route.params?.onSave) {
      // Crear un nuevo registro
      route.params.onSave(record);
      navigation.goBack();
    } else {
      Alert.alert("Error", "No se pudo guardar el registro.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {route.params?.record ? "Editar Registro de Producción" : "Añadir Registro de Producción"}
      </Text>

      <Text style={styles.label}>Selecciona un usuario:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedUser}
          onValueChange={(itemValue) => setSelectedUser(itemValue)}
        >
          <Picker.Item label="Seleccionar usuario" value="" />
          {users.map((user) => (
            <Picker.Item key={user.id} label={user.name} value={user.name} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Cajas:</Text>
      <TextInput
        style={styles.input}
        placeholder="Cantidad de cajas"
        value={boxes}
        onChangeText={setBoxes}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Cubetas:</Text>
      <TextInput
        style={styles.input}
        placeholder="Cantidad de cubetas"
        value={buckets}
        onChangeText={setBuckets}
        keyboardType="numeric"
      />

      <View style={styles.buttonContainer}>
        <Button title="Guardar" onPress={handleSaveRecord} />
        <Button
          title="Cancelar"
          onPress={() => navigation.goBack()}
          color="#aaa"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default AddProductionRecord;
