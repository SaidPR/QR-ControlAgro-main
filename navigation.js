import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Inicio from "./screens/Inicio";
import LoginScreen from "./screens/Log_In";
import RegistroUsuario from "./screens/Reg_Usuario";
import RecoverPasswordScreen from "./screens/RecoverPassword";
import Home from "./screens/Home"; // Menú principal
import WorkersList from "./screens/WorkersList"; // Gestión de trabajadores
import WorkerDetails from "./screens/WorkerDetails"; // Detalles del trabajador
import ProductionControl from "./screens/ProductionControl"; // Control de producción
import ProductionDetails from "./screens/ProductionDetails"; // Detalles de producción
import Reports from "./screens/Reports"; // Gestión de reportes
import DetailsReports from "./screens/DetailsReports"; // Detalles de reportes
import { FIREBASE_AUTH } from "./firebaseConfig.js"; // Importa FIREBASE_AUTH
import { onAuthStateChanged } from "firebase/auth";
import Reg_Docs from "./screens/Reg_Docs"; // Importa la pantalla RegDocs
import UsersList from "./screens/UsersList"; // Gestión de Usuarios
import UsersDetails from "./screens/UsersDetails"; // Detalles del usuario

const Stack = createStackNavigator();

const StackNavigator = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
            setUser(user);
        });

        return unsubscribe; // Limpia el listener al desmontar el componente
    }, []);

    return (
        <Stack.Navigator initialRouteName={user ? "Home" : "Inicio"}>
            <Stack.Screen
                name="Inicio"
                component={Inicio}
                options={{ title: "Inicio", headerShown: false }}
            />
            <Stack.Screen
                name="LogIn"
                component={LoginScreen}
                options={{ title: "Iniciar Sesión" }}
            />
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ title: "Menú Principal" }}
            />
            <Stack.Screen
                name="RegUsuario"
                component={RegistroUsuario}
                options={{ title: "Registro de Usuario" }}
            />
            <Stack.Screen
                name="RecoverPassword"
                component={RecoverPasswordScreen}
                options={{ title: "Recuperar Contraseña" }}
            />
            <Stack.Screen
                name="UsersList"
                component={UsersList}
                options={{ title: "Administrar Usuarios" }}
            />
            <Stack.Screen
                name="UsersDetails"
                component={UsersDetails}
                options={({ route }) => ({
                    title: `Detalles de ${route.params?.worker?.name || "Usuarios"}`,
                })}
            />
            <Stack.Screen
                name="WorkersList"
                component={WorkersList}
                options={{ title: "Gestión de Trabajadores" }}
            />
            <Stack.Screen
                name="WorkerDetails"
                component={WorkerDetails}
                options={({ route }) => ({
                    title: `Detalles de ${route.params?.worker?.name || "Trabajador"}`,
                })}
            />
            <Stack.Screen
                name="ProductionControl"
                component={ProductionControl}
                options={{ title: "Control de Producción" }}
            />
            <Stack.Screen
                name="ProductionDetails"
                component={ProductionDetails}
                options={{ title: "Detalles de Producción" }}
            />
            <Stack.Screen
                name="Reports"
                component={Reports}
                options={{ title: "Gestión de Reportes" }}
            />
            <Stack.Screen
                name="DetailsReports"
                component={DetailsReports}
                options={({ route }) => ({
                    title: `Detalles de ${route.params?.report?.title || "Reporte"}`,
                })}
            />
            {/* Aquí se agrega la pantalla Reg_Docs */}
            <Stack.Screen
                name="Reg_Docs"
                component={Reg_Docs}
                options={{ title: "Subida de Documentos" }}
            />
        </Stack.Navigator>
    );
};

export default StackNavigator;
