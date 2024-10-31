// Importamos React y las librerías necesarias para la navegación
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '/Login-RN3/Login/app/(tabs)/index';
import Login from '/Login-RN3/Login/app/(tabs)/Login';
import Biometrica from '/Login-RN3/Login/app/Biometrica'; 
import Geolocalizacion from '/Login-RN3/Login/app/Geolocalizacion'; 
import Compartir from '/Login-RN3/Login/app/Compartir'; 
import Giroscopio from '/Login-RN3/Login/app/Giroscopio';
import Notificaciones from '/Login-RN3/Login/app/Notificaciones'; 
import UserProfile from '/Login-RN3/Login/app/UserProfile';


// Definir el tipo de parámetros para el stack de navegación
type RootStackParamList = {
  HomeScreen: undefined;
  Login: undefined;
  Menu: undefined;
  Biometrica: undefined;
  Geolocalizacion: undefined;
  Compartir: undefined;
  Giroscopio: undefined;
  Notificaciones: undefined;
  UserProfile: undefined;
};

// Crear el stack de navegación
const Stack = createStackNavigator<RootStackParamList>();

// Componente que define la navegación del HomeStack
const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#009387',
        },
        headerTintColor: '#fff', 
        headerTitleStyle: {
          textAlign: 'center',
          fontWeight: 'bold',
        },
      }}
    >
      {/* Pantallas */}
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Biometrica" component={Biometrica} />
      <Stack.Screen name="Geolocalizacion" component={Geolocalizacion} />
      <Stack.Screen name="Compartir" component={Compartir} />
      <Stack.Screen name="Giroscopio" component={Giroscopio} />
      <Stack.Screen name="Notificaciones" component={Notificaciones} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
    </Stack.Navigator>
  );
};

// Componente contenedor para la navegación de la aplicación
const AppContainer = () => {
  return (
    <NavigationContainer>
      <HomeStack />
      <Giroscopio />

    </NavigationContainer>
  );
};

export default AppContainer;
