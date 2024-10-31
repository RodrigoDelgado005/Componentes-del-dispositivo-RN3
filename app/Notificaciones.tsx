// Importamos los módulos necesarios 
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';

const Notificaciones: React.FC = () => {
    // Configuraracion del  para recibir notificaciones y mostrar una alerta
    useEffect(() => {
        const subscription = Notifications.addNotificationReceivedListener(notification => {
            Alert.alert('Notificaciones Activadas', notification.request.content.title || 'Sin título');
        });

        return () => {
            subscription.remove();
        };
    }, []);

    // Función para mostrar una notificación push 
    const sendPushNotification = async () => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Perfecto! 🌟',
                body: 'Notificaciones Activadas.',
            },
            trigger: null, 
        });
    };

    return (
        // Contenedor para utilizar el componente
        <View style={styles.container}>
            <View style={styles.containerNotificacion}>
                <Text style={styles.title}>Recibe recordatorios todos los días</Text>
                <Text style={styles.subtitle}>Toca el botón para activarlas</Text>
                <TouchableOpacity style={styles.button} onPress={sendPushNotification}>
                    <Text style={styles.buttonText}>Enviar Notificación</Text>
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
        padding: 10,
    },
    containerNotificacion: {
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
    subtitle: {
        fontSize: 16,
        color: '#CCCCCC', 
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
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16, 
    },
});

export default Notificaciones;
