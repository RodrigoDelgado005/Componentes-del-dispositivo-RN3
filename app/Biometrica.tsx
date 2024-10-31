// Importamos los módulos necesarios 
import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

const Biometrica = () => {
    // Función que maneja la autenticación biométrica 
    const authenticate = async () => {
        // Verifica si el dispositivo tiene autenticación biométrica
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        // Verifica si hay huellas digitales registradas en el dispositivo
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();

        if (!hasHardware) {
            Alert.alert('Este dispositivo no soporta autenticación biométrica');
            return;
        }
        if (!isEnrolled) {
            Alert.alert('No tienes ninguna huella dactilar registrada');
            return;
        }

        // Se inicia el proceso, donde si la autenticación es exitosa, mostramos una alerta de éxito
        const result = await LocalAuthentication.authenticateAsync();
        if (result.success) {
            Alert.alert('Autenticación exitosa');
        } else {
            Alert.alert('Autenticación fallida');
        }
    };

    return (
        <View style={styles.container}>
        {/* Contenedor de autenticación biométrica con título, descripción y botón */}
            <View style={styles.containerHuella}>
                <Text style={styles.title}>Autenticación Biométrica</Text>
                <Text style={styles.description}>
                    Toca el botón para iniciar la autenticación biométrica. Esto es importante para tu seguridad y una mayor rapidez al entrar a tu cuenta.
                </Text>
                <TouchableOpacity style={styles.button} onPress={authenticate}>
                    <Text style={styles.buttonText}>Iniciar Autenticación</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// Estilos para el componente
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
        padding: 20,
    },
    containerHuella: {
        backgroundColor: '#1E1E1E', 
        padding: 20,
        borderRadius: 10,
        width: '90%',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        color: '#FFFFFF',
        marginBottom: 10,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        color: '#B0B0B0',
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#4F8EF7',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%', 
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16, 
    },
});

export default Biometrica;
