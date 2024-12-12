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
import { collection, getDocs } from "firebase/firestore";

const UsersList = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar usuarios desde Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(FIRESTORE_DB, "users");
        const querySnapshot = await getDocs(usersCollection);
        const usersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);
      } catch (error) {
        Alert.alert("Error", "No se pudieron cargar los usuarios");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleCameraAlert = async (user) => {
    const options = [
      { text: "Cámara", onPress: () => openCamera(user) },
      { text: "Galería", onPress: () => openGallery(user) },
      { text: "Cancelar", style: "cancel" },
    ];
    Alert.alert("Imagen de Perfil", "Selecciona una opción", options);
  };

  const openCamera = async (user) => {
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
      user.profilePhoto = result.assets[0].uri;
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, profilePhoto: user.profilePhoto } : u))
      );
    }
  };

  const openGallery = async (user) => {
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
      user.profilePhoto = result.assets[0].uri;
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, profilePhoto: user.profilePhoto } : u))
      );
    }
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

  const renderUserCard = ({ item }) => (
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
            onPress={() => navigation.navigate("UsersDetails", { user: item })}
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

  return (
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.loadingText}>Cargando usuarios...</Text>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={renderUserCard}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f4f4", padding: 10 },
  list: { paddingBottom: 20 },
  loadingText: { fontSize: 18, textAlign: "center", marginTop: 20 },
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

export default UsersList;
