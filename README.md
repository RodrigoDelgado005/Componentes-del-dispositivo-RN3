# LogIn-RN3

Para comenzar con el proyecto, es importante ejecutar los siguientes comandos:

Instalación del CLI de React Native
```bash
npm install -g react-native-cli
```

Crear un Nuevo Proyecto
```bash
npx create-expo-app@latest
```

Navegar al Directorio del Proyecto
```bash
cd MiProyecto
```

Para poder navegar entre las paginas por medio de los botones, debemos instalar lo siguiente:
```bash
npm install @react-navigation/native --save
npm install @react-navigation/drawer --save
npm install @react-navigation/stack --save
```

Para utilizar los iconos de FontAwesome 5 instalaremos lo siguiente:
```bash
npm install --save @fortawesome/fontawesome-svg-core
npm install --save @fortawesome/free-solid-svg-icons
npm install --save @fortawesome/react-native-fontawesome
```
Para el resto de las funcionalidades, debemos instalar lo siguiente:
```bash
npm install --save @react-native-community/async-storage
npx expo install expo-image-picker
npx expo install expo-location
npx expo install expo-local-authentication
npx expo install expo-sharing
npx expo install expo-sensors
npm install react react-dom react-native
```

Ejecutar la Aplicación en un Emulador o Dispositivo(En este caso utilizaremos Expo Go para Android) y lo iniciaremos con:
```bash
npx expo start
```

Debemos escaneaer el codigo QR con la aplicacion para acceder al proyecto
Es importante saber que ante cualquier problema, podemos acceder a la documentacion oficial de expo donde nos proporcionan la solucion a cualquier error(https://docs.expo.dev/tutorial/create-your-first-app/)

Para este proyecto se consulto a las siguientes fuentes:
{ https://codesandbox.io/p/sandbox/react-native-user-profile-hvhrn0?file=%2Fsrc%2FApp.js }

{ https://medium.com/@wijebahuwmpwdgb.20/react-native-app-security-with-biometric-authentication-fee3867c04bb }

{ https://docs.expo.dev/versions/latest/sdk/sharing/ }

{ https://reactnative.dev/docs/permissionsandroid }

{ https://blog.logrocket.com/react-native-push-notifications-complete-guide/ }

{ https://react-native-async-storage.github.io/async-storage/docs/usage/ }

Problema a Resolver:
Solicita autentificación biométrica para el acceso a la app
Utilizar la cámara para guardar una imagen en el perfil
Mostrar la ubicación del usuario por geolocalización
Permitir el acceso a los usuarios para compartir la app
Configurar el giroscopio para detección de giros
Utilizar notificaciones PUSH para datos relacionados con su perfil
Almacena localmente datos de perfil con AsyncStorage

Cada uno de estos items representan un componente distinto, ergo deberán realizar un menú que me lleve a cada uno de ellos.

Solucion: Para esto se utilizo el archivo index.tsx para realizar la pagina de presentacion en la cual hay un boton que nos lleva al login Para que el boton nos lleve al Login, se creo en la carpeta navigation el archivo homeStack.tsx, en el cual definimos las rutas y en el archivo index.tsx definimos la funcion para que nos lleve al registro. Para el Login se utilizo Xampp para la BD y PHP para el BackEnd, esta parte del proyecto se encuentra en el siguiente Repositorio: https://github.com/RodrigoDelgado005/Login-BasedeDatos

Para el archivo Login.tsx, se realizo la conexion con el BackEnd, se definieron los distintos mensajes segun corresponda, se creo el Registro y el Inicio de Sesion los cuales se pueden alternar por medio de un boton. En caso del Registro se verificara el formato requerido y se consultara a la BD que no hayan datos que coincidan con un usuario existente. Para el Inicio de Sesion se verificara que los datos ingresados coincidan con algun usuario en la BD.

Se crearon los Archivos UserProfile.tsx con el cual se crea un perfil de usuario a partir de la informacion del inicio de sesion, en el cual podemos poner una foto de perfil por medio de nuestra camara(Logica la cual esta implementada en UserProfile.tsx). Tambien se implemento un menu el cual por medio de un boton se muestra o no, donde tenemos los componentes Notificaciones.tsx(Notificaciones PUSH), Giroscopio.tsx, Geolocalizacion.tsx, Compartir.tsx y Biometrica.tsx
Todo estos componentes nos llevaran a una pestaña en la cual se presentara la funciona y se mostrara un boton que al presionarla se mostrara la funcion del mismo. Para cada componente se instalo los paquetes necesarios para cada uno, con la logica para su funcionalidad.

Cualquier duda o error podemos consultar la documentacion oficial y las fuentes utilizadas para el proyecto.
