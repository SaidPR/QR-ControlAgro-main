import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Alert,
  Linking,
} from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { FIRESTORE_DB } from "../firebaseConfig"; 
import { collection, getDocs, query, where } from "firebase/firestore";

const WorkersList = ({ navigation }) => {
  const [workerList, setWorkerList] = useState([]); // Estado para la lista de trabajadores
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const workersRef = collection(FIRESTORE_DB, "users"); // Suponiendo que los usuarios están en la colección "users"
        const q = query(workersRef, where("role", "==", "TRABAJADOR"));
        const querySnapshot = await getDocs(q);
        const workers = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setWorkerList(workers);
      } catch (error) {
        Alert.alert("Error", "No se pudieron cargar los trabajadores");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkers();
  }, []);

  const handleCameraAlert = async (worker) => {
    const options = [
      { text: "Cámara", onPress: () => openCamera(worker) },
      { text: "Galería", onPress: () => openGallery(worker) },
      { text: "Cancelar", style: "cancel" },
    ];
    Alert.alert("Imagen de Perfil", "Selecciona una opción", options);
  };

  const openCamera = async (worker) => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permiso requerido", "Se requiere acceso a la cámara.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled) {
      const updatedWorker = { ...worker, profilePhoto: result.assets[0].uri };
      updateWorkerInList(updatedWorker);
    }
  };

  const openGallery = async (worker) => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permiso requerido", "Se requiere acceso a la galería.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled) {
      const updatedWorker = { ...worker, profilePhoto: result.assets[0].uri };
      updateWorkerInList(updatedWorker);
    }
  };

  const updateWorkerInList = (updatedWorker) => {
    setWorkerList((prevList) =>
      prevList.map((worker) =>
        worker.id === updatedWorker.id ? updatedWorker : worker
      )
    );
  };

  const handleCall = (phone) => {
    Linking.openURL(`tel:${phone}`).catch((err) =>
      Alert.alert("Error", "No se pudo realizar la llamada")
    );
  };

  const handleWhatsApp = (phone) => {
    Linking.openURL(`https://wa.me/${phone}`).catch((err) =>
      Alert.alert("Error", "No se pudo abrir WhatsApp")
    );
  };

  const renderWorkerCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.profileSection}>
          <Image
            source={
              item.profilePhoto
                ? { uri: item.profilePhoto }
                : require("../assets/default-profile.png")
            }
            style={styles.profileImage}
          />
          <TouchableOpacity
            style={styles.cameraIcon}
            onPress={() => handleCameraAlert(item)}
          >
            <FontAwesome name="camera" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.details}>
            <MaterialIcons name="phone" size={14} color="#e91e63" /> {item.phone}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("WorkerDetails", { worker: item })}
          >
            <Text style={styles.detailsLink}>Ver detalles</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.iconButton} onPress={() => handleCall(item.phone)}>
            <FontAwesome name="phone" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => handleWhatsApp(item.phone)}
          >
            <FontAwesome name="whatsapp" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Cargando trabajadores...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Botón de Registrar Trabajador */}
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate("AddWorker")}
      >
        <Text style={styles.registerButtonText}>+ Registrar Trabajador</Text>
      </TouchableOpacity>

      <FlatList
        data={workerList}
        keyExtractor={(item) => item.id}
        renderItem={renderWorkerCard}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f4f4", padding: 10 },
  list: { paddingBottom: 20 },
  registerButton: {
    backgroundColor: "#4caf50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileSection: { position: "relative" },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#14ae5c",
    borderRadius: 15,
    padding: 5,
  },
  infoSection: { flex: 1, marginLeft: 15 },
  name: { fontSize: 18, fontWeight: "bold" },
  details: { fontSize: 14, color: "#555", marginTop: 5 },
  detailsLink: { fontSize: 14, color: "#3498db", marginTop: 5 },
  actions: { flexDirection: "row", alignItems: "center" },
  iconButton: {
    backgroundColor: "#34d058",
    borderRadius: 50,
    padding: 10,
    marginLeft: 10,
  },
});

export default WorkersList;
