Proyecto Final - Experiencias de Viaje 🌍 : Argentina Programa - Tramo III - Epica

ExpTravel
![page](https://github.com/juanlavayen/pf-comision1-juan-lavayen/assets/57622839/aa8d5843-5cfb-41bd-9e4c-dfba50b9ead1)


http://appsgi.ddns.net ( Despliegue de la aplicacion )

Se creo un servidor virtual con windows server + mongodb + npm + node.js.
Se creo un ddns con no-ip.com con una app para estar en linea.
Se mapearon los puertos para acceder al servidor de frontend y backend.
Se habilito en mongodb para aceptar conexiones externas.

Agencia de Viajes - Plataforma Interactiva 

Bienvenido a la plataforma interactiva de experiencias de viajes. 
Este proyecto tiene como objetivo crear un espacio en línea donde los apasionados por los viajes puedan compartir sus vivencias,
descubrir nuevas aventuras y conectar con otros entusiastas.

Tecnologías a utilizar.
Backend:

Node.js
Express
MongoDB
Mongoose

Frontend:

React
Modelo de Datos
javascript

User {
  username: string,
  password: string,
  email: string,
  avatarURL: string
}

Post {
  title: string,
  description: string,
  author: User,
  comments: [Comment],
  imageURL: string,
  createdAt: Date
}

Comment {
  author: User,
  description: string
}

Etapas del Proyecto
Etapa 1: Desarrollo del Backend
Gestionando la lógica del proyecto y la persistencia de datos.

Pasos:

Configurar el entorno
Instalar dependencias
Configurar variables de entorno
Crear modelos Mongoose
Implementar controladores
Configurar rutas
Crear middlewares
Implementar validaciones

Etapa 2: Desarrollo del Frontend
La segunda etapa se enfoca en el desarrollo del frontend, encargado de la interfaz de usuario y la interacción con los usuarios.

Pasos:

Configurar el entorno
Instalar dependencias
Crear vistas React
Definir rutas en React
Implementar validaciones en el frontend
Crear servicios
Implementar estilos y diseño

Buenas practicas !!! 

Utilizar una estructura de carpetas organizada
Incorporar comentarios en el código para mejorar la legibilidad
Realizar commits frecuentes para rastrear cambios
Documentar el código para facilitar el mantenimiento

Recursos Adicionales
Para obtener más información sobre las tecnologías utilizadas, puedes consultar los siguientes recursos:

Node.js
Express
MongoDB
Mongoose
React


NOTA : DIFICULTADES CON LAS RELACIONES, Y LA PUBLICACION DEL SITIO.

