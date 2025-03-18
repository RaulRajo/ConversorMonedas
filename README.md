# Conversor de Monedas con Node.js y Angular
Este proyecto es una aplicación web de conversión de monedas, desarrollada con Node.js, Express.js y SQLite en el backend y Angular 19 en el frontend.  
Permite a los usuarios convertir cantidades de dinero entre distintas monedas utilizando tasas de cambio en tiempo real proporcionadas por una API externa.  
Además, la aplicación cuenta con un sistema de registro e inicio de sesión con autenticación mediante JWT y almacena un historial de conversiones por usuario en una base de datos SQLite.

---

### Funcionalidades

- **Autenticación de Usuarios**
  - Registro e inicio de sesión obligatorio para acceder a la aplicación.
  - Autenticación basada en **JWT**, con protección de rutas en frontend y backend.
  - Contraseñas almacenadas de forma segura en la base de datos con **bcryptjs**.

- **Conversión de Monedas**
  - Conversión en tiempo real entre diferentes monedas mediante una **API externa**.
  - Envío de los datos de conversión al backend para su almacenamiento.

- **Historial de Conversiones**
  - Consulta del historial de conversiones almacenado en la base de datos.
  - Posibilidad de borrar el historial desde la interfaz de usuario.

- **Diseño Responsivo**
  - Interfaz optimizada para dispositivos móviles, tabletas y escritorios.
  - Estilizado con **Bootstrap 5** y **SCSS** para una mejor experiencia visual.

---

### Tecnologías Utilizadas
- **Frontend (Angular 19)**
  - **Angular** para la implementación de la interfaz de usuario.
  - **HTTP Client** para la comunicación con el backend.
  - **FormsModule** y **ngModel** para la vinculación de datos en formularios.
  - **Bootstrap 5** y **SCSS** para el diseño responsivo.

- **Backend (Node.js + Express.js)**
  - **Node.js** como entorno de ejecución para el backend.
  - **Express.js** para la creación de la **API RESTful**.
  - **SQLite** como base de datos ligera y eficiente.
  - **JWT** para la autenticación de usuarios y protección de rutas.
  - **bcryptjs** para el almacenamiento seguro de contraseñas.

- **API Externa**
  - Se utiliza la [ExchangeRate API](https://api.exchangerate-api.com/v4/latest/) para obtener tasas de cambio en tiempo real.

---

### Integración entre Frontend y Backend
- **Autenticación**
  - El frontend envía credenciales al backend y recibe un **token JWT**.
  - El token se almacena en **localStorage** para autenticación en solicitudes posteriores.

- **Conversión de Monedas**
  - El usuario introduce las monedas y la cantidad a convertir.
  - El frontend envía una solicitud **POST** al backend con los datos.
  - El backend obtiene la tasa de cambio de la **API externa**, calcula el resultado y lo almacena en la base de datos.
  - La conversión se muestra en la interfaz del usuario.

- **Historial de Conversiones**
  - Al acceder a la sección de historial, el frontend envía una solicitud **GET** al backend.
  - El backend devuelve las conversiones almacenadas para el usuario autenticado.
  - El usuario puede eliminar el historial con una solicitud **DELETE**.
