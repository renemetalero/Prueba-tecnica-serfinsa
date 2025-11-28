# Prueba-tecnica-serfinsa

Prueba Técnica — Backend + Frontend (Spring Boot + Angular)

Este proyecto implementa un sistema básico de autenticación y autorización usando Spring Boot, Spring Security, JWT, bcrypt y un cliente Angular con guards para proteger rutas.

Incluye:

Login con usuario y contraseña

Generación y validación de tokens JWT

Protección de endpoints por roles (ADMIN, USER)

CRUD de productos

Manejo global de excepciones

CORS habilitado para frontend Angular

Guard en Angular para rutas protegidas

🚀 Backend — Spring Boot 3 / Java 17
✔️ Requisitos

Java 17+

Maven 3.8+

# Base de datos H2 o MySQL

IntelliJ / VS Code

📁 Estructura del Proyecto (Backend)
src/main/java/org/pruebatecnicarene/
 ├── controller/
 ├── dto/
 ├── entity/
 ├── repository/
 ├── security/
 │     ├── JwtService.java
 │     ├── JwtFilter.java
 │     ├── SecurityConfig.java
 │     ├── CustomUserDetailsService.java
 ├── service/
 ├── PruebaTecnicaReneApplication.java


 BASE DE DATOS 

 Ejecutar el script que se adjunta en la raiz del repositorio y ajustar las credenciales de base de datos en el archivo properties 

 # Frontend 

 Tener instalado angular 19 

 ejecutar comando npm i para bajar dependencias y despues ejecutar el comando ng s para levantar el proyecto


 Credenciales de usuarios de prueba 

"email": "admin@example.com",
"password": "admin123"