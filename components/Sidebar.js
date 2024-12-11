import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Sidebar = ({ navigation }) => {
  const menuOptions = [
    { label: "Gestión de Trabajadores", route: "WorkersList" },
    { label: "Control de Producción", route: "ProductionControl" },
    { label: "Gestión de Reportes", route: "Reports" },
  ];

  return (
    <View style={styles.sidebar}>
      <Text style={styles.title}>Menú</Text>
      {menuOptions.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.option}
          onPress={() => navigation.navigate(option.route)}
        >
          <Text style={styles.optionText}>{option.label}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    flex: 1,
    backgroundColor: "#28a745",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  option: {
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#34d058",
    borderRadius: 5,
  },
  optionText: {
    color: "#fff",
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: "#dc3545",
    borderRadius: 5,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Sidebar;
