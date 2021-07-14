
# Heroes Challenge

_Aplicacion que funciona como enciclopedia de super heroes, ademas de poder crear equipos y revisar las estadisticas de tus heroes favoritos_

## ¿Que se puede hacer en este proyecto?

_Funciona con una api, utilizamos datos brindados por una URL_

* Creacion de equipos: La aplicacion permite al usuario agrupar hasta 6 heroes en un mismo equipo. Solo se pueden agrupar hasta 3 heroes de cada alineamiento.
* El sistema requiere de una verificacion, mediante un formulario de login, para poder acceder a sus funcionalidades.
* El sistema distingue si el usuario esta verificado. Impide el acceso al resto de paginas permitiendo uso unico del login, de no verificar el usuario, no se permite ingresar al resto de secciones (la app te redirige al login si se intenta ingresar mediante las rutas).
* Buscar heroes: Existe un buscador dentro de la app, filtra los heroes que tengan alguna coincidencia en su nombre, con la palabra/letra buscada.
* Una vez que se crean los equipos, podemos eliminar miembros del mismo. Si el equipo posee menos de 6 miembros, mostrará un boton para completar el equipo: Esta accion mueve el equipo nuevamente al area de creacion, donde podemos modificarlo a gusto.
En el caso de que exista un equipo en creacion, nos advertira sobre esto, y nos va a preguntar si deseamos sobreescribirlo.
*El sistema muestra la suma total de cada tipo de estadistica de los heroes miembros del equipo. La estadistica dominante se muestra para catalogar al tipo de equipo. Eliminar un heroes genera una nueva suma, quitando las estadisticas del heroe eliminado.
*Se muestra el peso y altura promedio del equipo.

_Para ingresar  EMAIL: challenge@alkemy.org CONTRASEÑA: react

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._


### Pre-requisitos 📋

_Que cosas necesitas para instalar el software y como instalarlas_

```
Necesitaras algunas dependencias y programas NodeJS, React Router, Rxjs Hooks, Styled Components, entre otras.
```

### Instalación 🔧

_Procederemos a clonar el repositorio, e instalar las distintas dependencias_

```
Git clone https://github.com/Guillermo-Morton/React-Challenge-Alkemy.git
```

_Instalar nuevamente npm con el comando: npm install._

```
npm install
```
_Nos va a dar una advertencia sobre vulnerabilidades encontradas._

```
npm audit fix
```
_Ejecutar el proyecto con: npm run start._

```
npm start
```

_Y listo, ya puedes probar el sitio desde tu maquina local_

## Presentacion

_https://drive.google.com/file/d/1HIAyXyzzKtvgbkb9fJWMyAVIIu7ETTxR/view?usp=sharing_

## Construido con 🛠️

_Se utilizo React para crear este proyecto_

* [React](https://es.reactjs.org/) - El framework web usado
* [NodeJS](https://nodejs.org/es/) - Manejador de dependencias
* [Api](https://superheroapi.com/) - Usado para obtener los datos

## Versionado 📌

Usamos [Git](https://git-scm.com/) para el sistema de ramas y versiones.

## Autores ✒️


* **Guillermo Morton** - *Fullstack Developer* - [Github](https://github.com/Guillermo-Morton)


## Licencia 📄

Este proyecto no tiene licencia


---
⌨️ con ❤️ a la programacion por [Guillermo Morton](https://github.com/Guillermo-Morton) 😊
