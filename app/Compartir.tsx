// Importamos los módulos necesarios 
import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

const Compartir = () => {
    // Función para manejar la acción de compartir
    const handleShare = async () => {
        try {
            // Verifica la disponibilidad de compartir archivos
            const isAvailable = await Sharing.isAvailableAsync();
            if (!isAvailable) {
                Alert.alert('Error', 'El compartir no está disponible en este dispositivo');
                return;
            }
              // Define la ruta local para el archivo a compartir
            const localUri = `${FileSystem.cacheDirectory}archivo-compartido.txt`;

            // Crea un archivo temporal con el contenido a compartir
            await FileSystem.writeAsStringAsync(localUri, 'Contenido del archivo a compartir', {
                encoding: FileSystem.EncodingType.UTF8,
            });

            // Comparte el archivo utilizando la API de Expo Sharing
            await Sharing.shareAsync(localUri);
            Alert.alert('Compartir', 'El archivo se ha compartido con éxito');
        } catch (error) {
            // Muestra una alerta en caso de error al compartir el archivo
            Alert.alert('Error', 'No se pudo compartir el archivo');
            console.error('Error al compartir:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Compartir Archivo</Text>
                <Text style={styles.description}>
                    Toca el botón para compartir un archivo de texto con el contenido predefinido.
                </Text>
                {/* Botón que activa la función de compartir */}
                <TouchableOpacity style={styles.button} onPress={handleShare}>
                    <Text style={styles.buttonText}>Compartir</Text>
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
    card: {
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

export default Compartir;
    