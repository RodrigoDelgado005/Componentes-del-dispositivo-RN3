// Importamos los componentes de React Native, React y el Hook useState para el formulario
import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importar AsyncStorage
import { useNavigation } from '@react-navigation/native'; // Importar useNavigation

// Estado para manejar almacenar los datos del usuario y controlar si se está en modo inicio de sesión o registro
const Login = () => {
    const navigation = useNavigation(); // Obtener la navegación
    const [UserName, setUserName] = useState(''); 
    const [UserEmail, setUserEmail] = useState('');
    const [UserPw, setUserPw] = useState('');
    const [iniciarSesion, setiniciarSesion] = useState(true); 

    // Función para manejar el envío del formulario
    const handleSubmit = async () => {
        if (iniciarSesion) {
            // Valida los datos antes de enviar
            if (!UserEmail || !UserPw) {
                Alert.alert("Por favor, completa todos los campos.");
                return;
            }
        } else {
            if (!UserName || !UserEmail || !UserPw) {
                Alert.alert("Por favor, completa todos los campos.");
                return;
            }
        }

        // url según el modo 
        const urlSolicitud = iniciarSesion ? 'http://192.168.1.50/LoginDB/Login.php' : 'http://192.168.1.50/LoginDB/SignUp.php';

        try {
            // Realiza la solicitud POST a la url 
            const response = await fetch(urlSolicitud, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // Envia los datos del usuario dependiendo si esta en registro o inicio de sesión
                    UserName: iniciarSesion ? undefined : UserName,
                    UserEmail: UserEmail,
                    UserPw: UserPw
                })
            });

            const data = await response.json();

            if (iniciarSesion) {
                if (data.success === true) {
                    // Almacena datos en AsyncStorage
                    await AsyncStorage.setItem('userProfile', JSON.stringify({
                        UserName,
                        UserEmail,
                        photo: '' // Puedes agregar una foto aquí si la tienes
                    }));
                    Alert.alert("Bienvenido de vuelta");
                    navigation.navigate('UserProfile'); // Redirige a UserProfile
                } else {
                    Alert.alert("El email o la contraseña son incorrectos. Inténtalo de nuevo.");
                }
            } else {
                if (data.Mensaje) {
                    Alert.alert(data.Mensaje);
                } else {
                    Alert.alert("Ya podes comenzar a usar nuestra app.");
                    navigation.navigate('UserProfile'); // Redirige a UserProfile
                }
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert("Hubo un problema al intentar registrarte. Intenta de nuevo más tarde.");
        }
    };

    // Función para cambiar entre modos de inicio de sesión y registro
    const cambiarModo = () => {
        setiniciarSesion(prevMode => !prevMode);
        setUserName('');
        setUserEmail('');
        setUserPw('');
    };

    return (
        // Componente principal con el formulario y botones para cambiar entre modos
        <View style={styles.containerFondo}>
            <View style={styles.container}>
                <Image
                    source={require('C:/Login-RN3/Login/assets/images/logo.png')}
                    style={styles.logo}
                />
                {!iniciarSesion && (
                    <TextInput
                        placeholder="Nombre de usuario"
                        value={UserName}
                        onChangeText={setUserName}
                        style={styles.input}
                        placeholderTextColor="#FFFFFF" 
                    />
                )}
                <TextInput
                    placeholder="Email"
                    value={UserEmail}
                    onChangeText={setUserEmail}
                    keyboardType="email-address"
                    style={styles.input}
                    placeholderTextColor="#FFFFFF"
                />
                <TextInput
                    placeholder="Contraseña"
                    value={UserPw}
                    onChangeText={setUserPw}
                    secureTextEntry
                    style={styles.input}
                    placeholderTextColor="#FFFFFF"
                />
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>{iniciarSesion ? "Iniciar Sesión" : "Registrarse"}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modeButton} onPress={cambiarModo}>
                    <Text style={styles.modeButtonText}>{`${iniciarSesion ? "Registrarse" : "Iniciar Sesión"}`}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// Estilos para los componentes
const styles = StyleSheet.create({
    containerFondo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
    },
    container: {
        width: '90%',
        padding: 30,
        borderRadius: 25,
        backgroundColor: '#2A2A2A',
    },
    logo: {
        width: 175,
        height: 110,
        alignSelf: 'center',
        marginBottom: 30,
    },
    input: {
        borderWidth: 0,
        marginBottom: 20,
        padding: 15,
        borderRadius: 12,
        backgroundColor: '#4c4b4e',
        color: '#FFFFFF',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#4F8EF7',
        paddingVertical: 15,
        borderRadius: 12,
        width: '100%',
        alignSelf: 'center',
        marginBottom: 25,
    },
    modeButton: {
        marginTop: 15,
        alignSelf: 'center',
    },
    modeButtonText: {
        color: '#4F8EF7',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '600',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Login;