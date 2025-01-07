import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

const { width, height } = Dimensions.get("window");

const RegistroUsuario = ({ navigation }) => {
  const [formData, setFormData] = useState({
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    telefono: "",
    email: "",
    password: "",
    fechaNacimiento: "",
    curp: "",
  });

  const [error, setError] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false); // Ocultar el selector después de seleccionar
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      handleInputChange("fechaNacimiento", formattedDate);
    }
  };

  const handleRegistro = async () => {
    const { email, password, primerNombre, primerApellido, segundoApellido, telefono, fechaNacimiento, curp } = formData;

  if (!email || !password || !primerNombre || !primerApellido || !segundoApellido|| !telefono || !fechaNacimiento || !curp) {
      setError("Por favor completa todos los campos.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const user = userCredential.user;

      const userData = {
        name: `${formData.primerNombre} ${formData.segundoNombre} ${formData.primerApellido} ${formData.segundoApellido}`.trim(),
        phone: formData.telefono,
        email,
        fechaNacimiento,
        curp: formData.curp,
        role: "ADMIN",
      };

      const usersCollectionRef = collection(FIRESTORE_DB, "users");
      await addDoc(usersCollectionRef, userData);

      navigation.navigate("Home");
    } catch (error) {
      setError("Error al registrar: " + error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Registro de Usuario</Text>
        {error && <Text style={styles.errorText}>{error}</Text>}

        <TextInput
          placeholder="Primer nombre"
          value={formData.primerNombre}
          onChangeText={(value) => handleInputChange("primerNombre", value)}
          style={styles.input}
        />
        <TextInput
          placeholder="Segundo nombre"
          value={formData.segundoNombre}
          onChangeText={(value) => handleInputChange("segundoNombre", value)}
          style={styles.input}
        />
        <TextInput
          placeholder="Primer apellido"
          value={formData.primerApellido}
          onChangeText={(value) => handleInputChange("primerApellido", value)}
          style={styles.input}
        />
        <TextInput
          placeholder="Segundo apellido"
          value={formData.segundoApellido}
          onChangeText={(value) => handleInputChange("segundoApellido", value)}
          style={styles.input}
        />
        <TextInput
          placeholder="Teléfono"
          value={formData.telefono}
          onChangeText={(value) => handleInputChange("telefono", value)}
          keyboardType="phone-pad"
          style={styles.input}
        />
        <TextInput
          placeholder="Correo Electrónico"
          value={formData.email}
          onChangeText={(value) => handleInputChange("email", value)}
          keyboardType="email-address"
          style={styles.input}
        />
        <TextInput
          placeholder="Contraseña"
          value={formData.password}
          onChangeText={(value) => handleInputChange("password", value)}
          secureTextEntry
          style={styles.input}
        />
        <TextInput
          placeholder="CURP"
          value={formData.curp}
          onChangeText={(value) => handleInputChange("CURP", value)}
          secureTextEntry
          style={styles.input}
        />

        {/* Fecha de Nacimiento */}
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateButtonText}>
            {formData.fechaNacimiento || "Seleccionar Fecha de Nacimiento"}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <TouchableOpacity style={styles.button} onPress={handleRegistro}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: width * 0.05,
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    color: "#333",
    marginBottom: height * 0.02,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.04,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: height * 0.02,
  },
  dateButton: {
    width: "100%",
    paddingVertical: height * 0.02,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    marginBottom: height * 0.02,
  },
  dateButtonText: {
    color: "#333",
    fontSize: width * 0.045,
  },
  button: {
    width: "100%",
    paddingVertical: height * 0.02,
    backgroundColor: "#14ae5c",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: height * 0.02,
  },
  buttonText: {
    color: "#fff",
    fontSize: width * 0.045,
    fontWeight: "bold",
  },
});

export default RegistroUsuario;
