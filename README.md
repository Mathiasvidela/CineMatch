# CineMatch
![Java](https://img.shields.io/badge/Java-21-orange?style=flat-square&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5-green?style=flat-square&logo=springboot)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?style=flat-square&logo=javascript)
![Docker](https://img.shields.io/badge/Docker-Compose-blue?style=flat-square&logo=docker)
![TMDB](https://img.shields.io/badge/TMDB-API-01B4E4?style=flat-square)
![Status](https://img.shields.io/badge/Status-En%20desarrollo-ff69b4?style=flat-square)

<img width="3538" height="1712" alt="image" src="https://github.com/user-attachments/assets/7e01497b-764a-4f07-ba96-eec612c18ff4" />

CineMatch es una aplicación web de recomendación de películas.
El usuario responde una serie de preguntas sobre sus gustos y la app devuelve recomendaciones personalizadas utilizando la API de TMDB.

El proyecto está dividido en dos partes:

* **Frontend:** HTML, CSS y JavaScript.
* **Backend:** Java con Spring Boot.
* **Docker:** permite levantar el frontend y el backend con un solo comando.

---

## Vista previa
<img width="3024" height="1964" alt="screenhome" src="https://github.com/user-attachments/assets/a6cb4ba5-48eb-484f-9133-ea3a5701ff49" />


> flujo de preguntas


> resultados de películas

---

## Tecnologías utilizadas

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Java
* Spring Boot
* Maven

### API externa

* TMDB API

### Contenedores

* Docker
* Docker Compose
* Nginx para servir el frontend
* Java runtime para ejecutar el backend

---

## Estructura del proyecto

```txt
CineMatch/
│
├── backend/
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
│
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── app.js
│
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

---

## Cómo funciona la aplicación

El flujo principal de la app es el siguiente:

```txt
Usuario responde las preguntas
  ↓
Fetch al backend
  ↓
Backend Spring Boot
  ↓
TMDB API
  ↓
Respuesta JSON
  ↓
Frontend muestra las películas recomendadas
```
<img width="4690" height="1346" alt="image" src="https://github.com/user-attachments/assets/f76921ef-0a24-4e37-afc7-251f685e6895" />

El frontend no consulta directamente a TMDB.
En su lugar, consulta al backend:
El backend recibe los filtros, agrega la API key de TMDB y consulta la API externa.
Esto permite no exponer la API key directamente en el código JavaScript del navegador.

---

## Funcionamiento de la app

La aplicación utiliza 4 pasos principales:

### 1. Géneros

El usuario puede elegir hasta 3 géneros.
<img width="3344" height="762" alt="image" src="https://github.com/user-attachments/assets/3770bc58-7d69-4727-8d2d-e174f4d98dad" />

### 2. Años

El usuario selecciona un rango de años.
<img width="3344" height="762" alt="image" src="https://github.com/user-attachments/assets/4bbd8e26-da92-4331-b615-18d7e7579406" />

### 3. Duración

El usuario elige la duración preferida:
<img width="3344" height="762" alt="image" src="https://github.com/user-attachments/assets/2ab6c86b-d188-4559-99f1-5e70a6a496bc" />

### 4. Tipo de recomendación

El usuario elige cómo ordenar los resultados:
<img width="3344" height="762" alt="image" src="https://github.com/user-attachments/assets/0b1a2a02-0428-4eb9-bf4b-cd6193d85ba9" />

---

## Endpoints principales

### Obtener películas recomendadas

```http
GET /api/movies
```

Ejemplo:

```txt
http://localhost:8080/api/movies?genres=28%7C878&yearFrom=2000&yearTo=2026&duration=normal&sortBy=popular
```

Parámetros disponibles:

| Parámetro  | Descripción                    | Ejemplo                                         |            
| ---------- | ------------------------------ | ----------------------------------------------- |
| `genres`   | IDs de géneros separados por   | `28%35`                                         |          
| `yearFrom` | Año inicial                    | `2000`                                          |            
| `yearTo`   | Año final                      | `2026`                                          |            
| `duration` | Duración preferida             | `short`, `normal`, `long`                       |            
| `sortBy`   | Tipo de recomendación          | `popular`, `top_rated`, `recent`, `hidden_gems` |            

---

## Requisitos previos para utilizar la app de manera local

Para ejecutar el proyecto se necesita tener instalado:

* Git
* Docker Desktop
* Una API key de TMDB

---

## Configuración de la API key

Este proyecto utiliza la API de TMDB.

Link: www.themoviedb.org

Por seguridad, la API key real no está incluida en el repositorio.

Primero, crear un archivo `.env` en la raíz del proyecto tomando como referencia `.env.example`.

```bash
cp .env.example .env
```
*Este comando crea una copia del archivo .env.example y la nombra como .env*

Luego editar el archivo `.env` y agregar la API key:

```env
TMDB_API_KEY=tu_api_key_de_tmdb
```

---

## Archivo `.env.example`

El repositorio incluye un archivo `.env.example` con esta estructura:

```env
TMDB_API_KEY=tu_api_key_de_tmdb
```

Cada persona que clone el proyecto debe crear su propio archivo `.env`.

---

## Ejecutar el proyecto con Docker

Desde la raíz del proyecto ejecutar:

```bash
docker compose up --build
```

Docker va a levantar dos servicios:

```txt
frontend → http://localhost:8081
backend  → http://localhost:8080
```

---

## Abrir la aplicación

Una vez levantado Docker, abrir en el navegador:

```txt
http://localhost:8081
```

El backend queda disponible en:

```txt
http://localhost:8080
```

Para probar el endpoint directamente:

```txt
http://localhost:8080/api/movies
```

---

## Probar el backend con filtros

Ejemplo de búsqueda de películas de acción o ciencia ficción:

```txt
http://localhost:8080/api/movies?genres=28%7C878&yearFrom=2000&yearTo=2026&duration=normal&sortBy=popular
```

Ejemplo de terror reciente:

```txt
http://localhost:8080/api/movies?genres=27&yearFrom=2010&yearTo=2026&duration=normal&sortBy=popular
```

Ejemplo de dramas mejor valorados:

```txt
http://localhost:8080/api/movies?genres=18&yearFrom=1990&yearTo=2026&duration=normal&sortBy=top_rated
```
---

## Puertos utilizados

| Servicio | Puerto local | Descripción     |
| -------- | -----------: | --------------- |
| Frontend |       `8081` | Interfaz web    |
| Backend  |       `8080` | API Spring Boot |

---

## Docker

El proyecto utiliza Docker Compose para levantar los servicios.

### Backend

El backend se construye usando el archivo:

```txt
backend/Dockerfile
```

Este Dockerfile:

1. Usa Maven para compilar el proyecto.
2. Genera el archivo `.jar`.
3. Ejecuta la aplicación con Java.
4. Expone el puerto `8080`.

### Frontend

El frontend se sirve con Nginx usando la carpeta:

```txt
frontend/
```

Nginx toma el archivo `index.html` y lo muestra en:

```txt
http://localhost:8081
```

---

## Créditos

Este proyecto utiliza datos de The Movie Database API.
Toda la información de películas, pósters y ratings proviene de TMDB.
