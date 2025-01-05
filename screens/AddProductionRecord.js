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
import { FIRESTORE_DB } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const AddProductionRecord = ({ navigation, route }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [boxes, setBoxes] = useState("");
  const [buckets, setBuckets] = useState("");

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

  useEffect(() => {
    console.log(route.params);  // Esto debería mostrar el parámetro onSave
  }, [route.params]);
  

  const handleSaveRecord = () => {
    if (!selectedUser || !boxes || !buckets) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    const date = new Date().toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const newRecord = {
      name: selectedUser,
      date,
      boxes: parseInt(boxes, 10),
      buckets: parseInt(buckets, 10),
    };

    if (route.params?.onSave) {
      route.params.onSave(newRecord);
    } else {
      Alert.alert("Error", "No se pudo guardar el registro.");
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Añadir Registro de Producción</Text>

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