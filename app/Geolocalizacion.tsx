// Importamos los módulos necesarios 
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

// Define los tipos para la ubicación y el mensaje de error
type LocationData = {
    coords: {
        latitude: number;
        longitude: number;
    };
};

// Estado para almacenar la ubicación obtenida y cualquier mensaje de error
const Geolocalizacion = () => {
    const [location, setLocation] = useState<LocationData | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null); 

    // Función para obtener la ubicación del usuario
    const getLocation = async () => {
        // Solicita permiso para acceder a la ubicación
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permiso denegado para acceder a la ubicación');
            Alert.alert('Error', 'Permiso denegado para acceder a la ubicación');
            return;
        }

        try {
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);  // Almacena la ubicación obtenida en el estado
            setErrorMsg(null); // Limpia el mensaje de error si se obtiene la ubicación
            Alert.alert('Ubicación obtenida', `Latitud: ${location.coords.latitude}\nLongitud: ${location.coords.longitude}`);
        } catch (error) {
            // Si ocurre un error al obtener la ubicación, muestra un mensaje de error
            setErrorMsg('No se pudo obtener la ubicación');
            Alert.alert('Error', 'No se pudo obtener la ubicación');
        }
    };

    return (
        <View style={styles.container}>
            {/* Muestra un botón para obtener la ubicación */}
            <View style={styles.containerLocalizar}>
                <Text style={styles.title}>Geolocalización</Text>
                <TouchableOpacity style={styles.button} onPress={getLocation}>
                    <Text style={styles.buttonText}>Obtener Ubicación</Text>
                </TouchableOpacity>
                {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
            </View>
        </View>
    );
};

//Estilos para el componente
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
        padding: 20,
    },
    containerLocalizar: {
        backgroundColor: '#1E1E1E', 
        padding: 20,
        borderRadius: 10,
        width: '90%',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        color: '#FFFFFF',
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#4F8EF7',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
        marginBottom: 15,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    },
});

export default Geolocalizacion;
