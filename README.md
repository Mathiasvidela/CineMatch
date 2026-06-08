# CineMatch
![Java](https://img.shields.io/badge/Java-21-orange?style=flat-square&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5-green?style=flat-square&logo=springboot)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?style=flat-square&logo=javascript)
![Docker](https://img.shields.io/badge/Docker-Compose-blue?style=flat-square&logo=docker)
![TMDB](https://img.shields.io/badge/TMDB-API-01B4E4?style=flat-square)

<img width="3538" height="1712" alt="image" src="https://github.com/user-attachments/assets/7e01497b-764a-4f07-ba96-eec612c18ff4" />
<img width="800" height="450" alt="header-gif" src="https://github.com/user-attachments/assets/ba927770-4f24-464f-ba56-cdb8342847ea" />


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
<img width="24432" height="4102" alt="image" src="https://github.com/user-attachments/assets/63c662a8-d58d-45ad-9ae0-c42cb2c2864d" />

> resultados de películas
<img width="6052" height="4102" alt="image" src="https://github.com/user-attachments/assets/d7f3560e-413a-40af-9a61-ba7e66c2c5fe" />

---

## Tecnologías utilizadas

### Frontend

<p>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
</p>

### Backend

<p>
  <img src="https://img.shields.io/badge/Java_21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" />
  <img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" />
  <img src="https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white" />
</p>

### API externa

<p>
  <img src="https://img.shields.io/badge/TMDB_API-01B4E4?style=for-the-badge&logo=themoviedatabase&logoColor=white" />
</p>

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

## Cómo instalar y ejecutar CineMatch

En esta sección vas a encontrar una guía paso a paso para descargar el proyecto, configurar la API key de TMDB y levantar la aplicación de manera local usando Docker.

---

### 1. Requisitos previos

Antes de comenzar, asegurate de tener instalado lo siguiente:

* [Git](https://git-scm.com/) para clonar el repositorio en tu computadora.
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) para ejecutar el frontend y el backend en contenedores.
* [Una API key de TMDB](https://www.themoviedb.org/settings/api) para poder consultar la información de películas.

> Importante: sin la API key de TMDB, el backend no va a poder obtener las películas.

---

### 2. Clonar el repositorio

Abrí una terminal y ejecutá el siguiente comando:

```bash
git clone https://github.com/Mathiasvidela/CineMatch
```

Luego ingresá a la carpeta del proyecto:

```bash
cd CineMatch
```

---

### 3. Configurar la API key de TMDB

Este proyecto utiliza la API de TMDB para obtener información de películas, pósters, fechas de estreno y ratings.

Por seguridad, la API key real no está incluida en el repositorio. Cada persona que clone el proyecto debe crear su propio archivo de variables de entorno.

Desde la raíz del proyecto, creá un archivo `.env` tomando como base el archivo `.env.example`:

```bash
cp .env.example .env
```

Luego abrí el archivo `.env` y reemplazá el valor de ejemplo por tu propia API key de TMDB:

```env
TMDB_API_KEY=tu_api_key_de_tmdb
```

El archivo `.env` debería quedar ubicado en la raíz del proyecto, al mismo nivel que `docker-compose.yml`.

---

### 4. Levantar el proyecto con Docker

Antes de ejecutar el proyecto, asegurate de tener **Docker Desktop abierto y en funcionamiento**.

> Si Docker Desktop no está abierto, el comando puede fallar porque Docker no va a estar disponible desde la terminal.

Una vez configurada la API key, ejecutá el siguiente comando desde la raíz del proyecto:

```bash
docker compose up --build
```

Este comando construye y levanta automáticamente los servicios necesarios para ejecutar la aplicación:

```txt
frontend → http://localhost:8081
backend  → http://localhost:8080
```


Este comando construye y levanta los servicios necesarios para ejecutar la aplicación:

```txt
frontend → http://localhost:8081
backend  → http://localhost:8080
```

---

### 5. Abrir la aplicación

Cuando los contenedores estén corriendo, abrí el navegador e ingresá a:

```txt
http://localhost:8081
```

Desde ahí vas a poder usar CineMatch, responder las preguntas y obtener recomendaciones de películas.

El backend también queda disponible en:

```txt
http://localhost:8080
```

Para probar directamente el endpoint principal podés usar:

```txt
http://localhost:8080/api/movies
```

