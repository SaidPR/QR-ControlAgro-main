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

  // Función para manejar los cambios en los campos del formulario
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Función para validar el correo electrónico
  const isValidEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  };

  const handleRegistro = async () => {
    const { email, password } = formData;

    // Validar el formato del correo
    if (!isValidEmail(email)) {
      setError("Por favor ingrese un correo electrónico válido.");
      return;
    }

    try {
      // Crea un nuevo usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const user = userCredential.user;
      console.log("Usuario registrado:", user.email);

      // Guarda el usuario en Firestore
      const usersCollectionRef = collection(FIRESTORE_DB, "users");
      await addDoc(usersCollectionRef, formData);

      console.log("Usuario guardado en Firestore");
      navigation.navigate("Reg_Docs");
    } catch (error) {
      console.error("Error de registro:", error);
      setError(error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Registro de Usuario</Text>

        {/* Mostrar el mensaje de error si existe */}
        {error && <Text style={styles.errorText}>{error}</Text>}

        {/* Campos del formulario */}
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
          placeholder="Fecha de Nacimiento"
          value={formData.fechaNacimiento}
          onChangeText={(value) => handleInputChange("fechaNacimiento", value)}
          style={styles.input}
        />
        <TextInput
          placeholder="CURP"
          value={formData.curp}
          onChangeText={(value) => handleInputChange("curp", value)}
          style={styles.input}
        />

        {/* Botón para registrar usuario */}
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
