# Proyecto EmpleadoApp

Este es un proyecto de gestión de empleados desarrollado con **Spring Boot** en el backend y **React** en el frontend.

## Descripción

La aplicación permite gestionar los empleados,oficinas y las relaciones entre ellos en una empresa, incluyendo funcionalidades como la creación, actualización, eliminación y consulta de empleados,oficinas. Además, la aplicación permite la autenticación de usuarios mediante JWT y está protegida con Spring Security.

## Tecnologías Utilizadas

### Backend (Spring Boot):
- **Spring Boot**: Framework principal para el desarrollo del backend.
- **Spring Data JPA**: Para la persistencia de datos utilizando JPA.
- **MySQL**: Base de datos relacional.
- **Spring Security**: Para la autenticación y autorización de usuarios.
- **JWT (JSON Web Tokens)**: Para la autenticación sin estado utilizando tokens.
- **SpringDoc OpenAPI**: Para la generación automática de la documentación de la API RESTful.
- **Lombok**: Para reducir el código boilerplate en las clases de Java.

### Frontend (React):
- **React**: Biblioteca de JavaScript para construir la interfaz de usuario.
- **Chakra UI**: Librería de componentes para React para crear interfaces atractivas.
- **Formik & Yup**: Para la gestión de formularios y validación.
- **Axios**: Para realizar peticiones HTTP a la API.
- **React Router**: Para gestionar la navegación en la aplicación.
- **React Query**: Para la gestión de estado y cache de las peticiones HTTP.
- **Framer Motion**: Para animaciones en React.

### NOTA IMPORTANTE: EN EL FRONTEND SE CREO UNOS MOSCKUSUARIOS DE PRUEBA CON EL CUAL PUEDEN LOGEAR LOS CREDENCIALES SE ENCUENTRAN EN EL ARCHIVO authApi.js y SON LOS SIGUIENTES EMAIL: 'admin@test.com', PASSWORD: 'admin123'


## Requisitos Previos
Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- **Java 21** o superior.
- **Maven**.
- **Node.js** y **npm**.
- **MySQL**.
- Se dejara un archivo sql con el script de la base de datos 

