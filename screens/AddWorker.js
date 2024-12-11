/* import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { WorkersContext } from "../WorkersContext";

const AddWorker = ({ navigation }) => {
  const { workers, setWorkers } = useContext(WorkersContext);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  const handleAddWorker = () => {
    const newWorker = {
      id: (workers.length + 1).toString(),
      name,
      phone,
      location,
      profilePhoto: null,
    };
    setWorkers([...workers, newWorker]);
    navigation.navigate("WorkersList");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Trabajador</Text>
      <TextInput placeholder="Nombre" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Teléfono" value={phone} onChangeText={setPhone} style={styles.input} />
      <TextInput placeholder="Ubicación" value={location} onChangeText={setLocation} style={styles.input} />
      <TouchableOpacity style={styles.button} onPress={handleAddWorker}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  input: { borderBottomWidth: 1, marginBottom: 15 },
  button: { backgroundColor: "#14ae5c", padding: 15, alignItems: "center", borderRadius: 10 },
  buttonText: { color: "#fff", fontWeight: "bold" },
});

export default AddWorker;
 */