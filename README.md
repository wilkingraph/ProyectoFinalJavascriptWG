
# Proyecto Final JavaScript - Sistema de Reservas Del Senator By Wilkins Ferreira

Este proyecto implementa un sistema de reservas para restaurantes utilizando un enfoque **Full Stack**. El frontend está construido con **Vite.js** y **React**, mientras que el backend está desarrollado con **Strapi**.

## Tecnologías utilizadas

- **Frontend**:
  - Vite.js
  - React
  - JavaScript
  - CSS (o el framework que estés usando)

- **Backend**:
  - Node.js
  - Strapi (o cualquier tecnología backend que estés utilizando)

## Instalación y Ejecución

### 1. Clonar el repositorio

Clona este repositorio en tu máquina local:

```bash
git clone https://github.com/wilkingraph/ProyectoFinalJavascriptWG.git
cd ProyectoFinalJavascriptWG
```

### 2. Instalación del Frontend

Accede a la carpeta del frontend y instala las dependencias:

```bash
cd reservas-senator-by-wilkins
npm install
```

Luego, ejecuta el servidor de desarrollo:

```bash
npm run dev
```

El frontend estará disponible en `http://localhost:5173` o en el puerto que se especifique.

### 3. Instalación del Backend

Accede a la carpeta del backend y configura el entorno:

```bash
cd ../senator-by-wilkins
```

Edita el archivo `.env` para configurar las variables necesarias (como las de la base de datos, puerto, etc.).

#### Configuración del Backend:
- Configura las variables de entorno según tu entorno local.
- Asegúrate de que la base de datos y otras dependencias estén correctamente configuradas.

Instala las dependencias del backend:

```bash
npm install
```

Y ejecuta el backend:

```bash
npm run develop
```

El backend estará disponible en `http://localhost:1337` (o el puerto configurado).

### 4. Conexión entre Frontend y Backend

Asegúrate de que el **frontend** esté configurado para enviar las solicitudes al **backend** en la URL correcta (`http://localhost:1337` o la URL de producción si está desplegado).

## Funcionalidades

- **Reserva en restaurantes**: Los usuarios pueden seleccionar el restaurante, la cantidad de personas, y la hora para hacer una reserva.
- **Interfaz de usuario amigable**: El frontend proporciona una experiencia fluida para los usuarios al hacer reservas.
- **Administración de reservas**: Los administradores pueden gestionar las reservas a través del backend.

## Contribuir

Si deseas contribuir a este proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una rama para tus cambios (`git checkout -b feature/nueva-caracteristica`).
3. Realiza tus cambios.
4. Haz commit de tus cambios (`git commit -am 'Agrega nueva funcionalidad'`).
5. Sube los cambios (`git push origin feature/nueva-caracteristica`).
6. Crea un pull request.

## Licencia

Este proyecto está bajo la [CC] Todos Los Derechos Reservados.
