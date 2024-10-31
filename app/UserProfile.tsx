// Importamos los módulos necesarios de React y React Native
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

// Definimos las propiedades para el perfil de usuario
interface UserProfileProps {
    navigation: StackNavigationProp<any>; 
}

// Componente principal del perfil de usuario
const UserProfile: React.FC<UserProfileProps> = () => {
    const navigation = useNavigation();

    // Estado inicial para los datos del usuario
    const [userData, setUserData] = useState({
        UserName: '',
        UserEmail: '',
        UserPhoto: ''
    });
    const [isMenuVisible, setIsMenuVisible] = useState(false); 

    // Cargar los datos del perfil desde AsyncStorage
    useEffect(() => {
        const loadUserData = async () => {
            try {
                const storedUserData = await AsyncStorage.getItem('userProfile');
                if (storedUserData) {
                    setUserData(JSON.parse(storedUserData));
                }
            } catch (error) {
                console.error('Error loading user data:', error);
            }
        };

        loadUserData();
    }, []);

    // Función para editar la foto
    const editarFoto = async () => {
        // Solicitar permisos de cámara
        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
        if (!cameraPermission.granted) {
            Alert.alert("Permiso denegado", "Se necesita acceso a la cámara.");
            return;
        }

        // Abrir la cámara
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;

            // Guardar la imagen en el sistema de archivos
            const fileName = uri.split('/').pop();
            const newPath = `${FileSystem.documentDirectory}${fileName}`;
            await FileSystem.moveAsync({ from: uri, to: newPath });

            // Actualizar el estado del usuario con la nueva foto
            const updatedUserData = { ...userData, UserPhoto: newPath };
            setUserData(updatedUserData);

            // Guardar los nuevos datos en AsyncStorage
            await AsyncStorage.setItem('userProfile', JSON.stringify(updatedUserData));
        }
    };

    // Función para mostrar el menú
    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    return (
        <View style={styles.container}>
            {/* Contenedor para la imagen, el email y el botón editar foto */}
            <View style={styles.profileContainer}>
                <Text style={styles.title}>Perfil del Usuario</Text>
                <Image 
                    source={{ uri: userData.UserPhoto || 'https://via.placeholder.com/150' }} 
                    style={styles.photo} 
                />
                <Text style={styles.label}>Email: {userData.UserEmail}</Text>
                <TouchableOpacity style={styles.editButton} onPress={editarFoto}>
                    <Text style={styles.buttonText}>Editar Foto</Text>
                </TouchableOpacity>
            </View>

            {/* Botón para alternar entre mostrar/ocultar el menú */}
            <TouchableOpacity style={styles.menuToggleButton} onPress={toggleMenu}>
                <Text style={styles.buttonText}>{isMenuVisible ? 'Ocultar Menú' : 'Mostrar Menú'}</Text>
            </TouchableOpacity>

            {/* Menú para navegar a los distintos componentes */}
            {isMenuVisible && (
                <View style={styles.menu}>
                    <Text style={styles.menuTitle}>Opciones</Text>
                    <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Biometrica')}>
                        <Text style={styles.menuButtonText}>🔒 Autenticación Biométrica</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Geolocalizacion')}>
                        <Text style={styles.menuButtonText}>📍 Geolocalización</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Compartir')}>
                        <Text style={styles.menuButtonText}>📤 Compartir App</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Giroscopio')}>
                        <Text style={styles.menuButtonText}>📉 Giroscopio</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Notificaciones')}>
                        <Text style={styles.menuButtonText}>🔔 Notificaciones Push</Text>
                    </TouchableOpacity>
                </View>
            )}
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
    profileContainer: {
        width: '90%',
        height: '40%',
        backgroundColor: '#1E1E1E', 
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        marginBottom: 20,
        elevation: 5, 
    },
    title: {
        fontSize: 24,
        color: '#FFFFFF',
        marginBottom: 10,
        fontWeight: 'bold',
    },
    photo: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    label: {
        color: '#FFFFFF',
        fontSize: 18,
        marginVertical: 5,
    },
    editButton: {
        backgroundColor: '#4F8EF7',
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
    },
    menuToggleButton: {
        backgroundColor: '#4F8EF7',
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    menu: {
        marginTop: 20,
        width: '100%',
        backgroundColor: '#1E1E1E', 
        borderRadius: 10,
        padding: 10,
        elevation: 5, 
    },
    menuTitle: {
        fontSize: 20,
        color: '#FFFFFF',
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    menuButton: {
        backgroundColor: '#4F8EF7',
        padding: 10,
        borderRadius: 8,
        marginVertical: 5,
    },
    menuButtonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default UserProfile;
