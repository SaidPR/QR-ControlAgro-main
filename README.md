# README: QR-Control Agrícola

## Descripción del Proyecto

QR-Control Agrícola es una aplicación móvil híbrida diseñada para automatizar y gestionar procesos en campos agrícolas de gran escala. Este proyecto tiene como objetivo principal optimizar la gestión de asistencia y producción diaria mediante tecnologías modernas como React Native y Firebase.

---

## Objetivos

1. **Automatización de Procesos:** Optimizar el registro de asistencia de trabajadores y la producción agrícola diaria.
2. **Gestión Centralizada:** Proveer herramientas de control y administración en tiempo real.
3. **Escalabilidad:** Diseñar una aplicación robusta y adaptable a diferentes dispositivos.

---

## Características Principales

1. **Gestión de Trabajadores:**
   - Visualización de trabajadores en formato de tarjetas.
   - Opciones avanzadas de contacto como llamadas y mensajes de WhatsApp.
   - Registro y edición de información personal, incluyendo documentos oficiales.

2. **Control de Producción:**
   - Registro en tiempo real de cubetas recolectadas y cajas empaquetadas.
   - Historial de registros y auditorías.

3. **Reportes y Análisis:**
   - Generación y exportación de reportes en formatos PDF y Excel.
   - Notificaciones para alertas de rendimiento.

4. **Seguridad:**
   - Autenticación con Firebase.
   - Roles y permisos según tipo de usuario (de momento sólo de tipo admin).
   - Recuperación de contraseñas mediante filtros como: correo electrónico, mensajería por whats app y por fecha de nacimiento.

5. **Interfaz de Usuario:**
   - Diseño intuitivo y adaptable a diferentes tamaños de pantalla.
   - Componentes reutilizables para una experiencia consistente.

---

## Tecnologías Utilizadas

- **Framework:** React Native.
- **Navegación:** React Navigation.
- **Backend:** Firebase (Base de datos NoSQL y autenticación).
- **Notificaciones Push:** Firebase Cloud Messaging.
- **Gestión de Estado:** Hooks, otros componentes y props reutilizables.
  
- **Dependencias:**

  NAVEGACIÓN:
-   yarn add @react-navigation/native react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-vector-icons
-   yarn add @react-navigation/stack
-   yarn add @react-navigation/drawer

  CÁMARA Y SELECTOR DE IMAGENES:
  
-   yarn add expo-camera expo-image-picker

ANIMACIONES:

-   yarn add react-native-reanimated

BARRA DE ESTADO:

-   yarn add expo-status-bar

GENERAL:

yarn add @react-navigation/drawer react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context react-native-vector-icons
  - `@react-navigation/native`
  - `@react-navigation/stack`
  - `expo-camera`
  - `expo-image-picker`
  - `react-native-gesture-handler`
  - `react-native-screens`
  - `react-native-screens`
---

## Estructura del Proyecto

```plaintext
QR-ControlAgro/
│
├── assets/               # Imágenes y recursos visuales
├── components/           # Componentes reutilizables (Sidebar, Header, UserCard)
├── screens/              # Vistas principales (Inicio, LogIn, Gestión de Trabajadores, etc.)
├── App.js                # Punto de entrada de la aplicación
├── navigation.js         # Configuración de la navegación principal
├── package.json          # Dependencias del proyecto
└── README.md             # Descripción del proyecto
```

---

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/tu_usuario/QR-ControlAgro.git
```

2. Navegar al directorio del proyecto:

```bash
cd QR-ControlAgro
```

3. Instalar las dependencias:

```bash
yarn install
```

4. Iniciar el proyecto:

```bash
expo start
```

---

## Funcionalidades Pendientes

- Integración con Firebase para manejo de autenticación y base de datos.
- Implementación del módulo de producción.
- Generación de reportes avanzados.

---

## Colaboradores

- **Ramírez Rodríguez Manuel** - Líder del proyecto.
- **Piñones Ramos Said Rafael**

---

## Créditos

Proyecto desarrollado como parte de la materia *Programación Móvil* bajo la supervisión del profesor **Jorge Edgar Rojas Magdaleno**.

---

Contribuye, reporta problemas o sugiere mejoras en nuestro [repositorio en GitHub](https://github.com/tu_usuario/QR-ControlAgro). ¡Gracias por apoyar nuestro proyecto!
