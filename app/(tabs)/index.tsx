// importamos los componentes, los iconos y el hook para redirigir a partir de un boton.
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import ParallaxScrollView from '/Login-RN3/Login/components/ParallaxScrollView';
import { ThemedText } from '/Login-RN3/Login/components/ThemedText';
import { ThemedView } from '/Login-RN3/Login/components/ThemedView';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';



export default function HomeScreen() {
  const navigation = useNavigation(); 

  // Función para que al presionar el botón, lleve a la pantalla de Login
  const handlePress = () => {
    navigation.navigate('Login'); 
  };

  // Muestra por pantalla un mensaje de bienvenida y el boton que nos redirige a la pantalla de Login
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC'}}>
      <View style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">
            Aprende <Text style={styles.jsText}>JavaScript</Text>  
          </ThemedText>
        </ThemedView>
        <ThemedText style={styles.text}>
          Entra y comenza a aprender Javascript con cursos altamente calificados, desde la comodidad de tu casa.
        </ThemedText>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Empezar</Text>
        </TouchableOpacity>
      </View>
      {/*Contenedor de iconos que representan los lenguajes de programación */}
      <View style={styles.iconContainer}>
        <FontAwesome5 name="react" size={30} color="#9c9c9c" style={styles.icon} />
        <FontAwesome5 name="node" size={30} color="#9c9c9c" style={styles.icon} />
        <FontAwesome5 name="js" size={30} color="#9c9c9c" style={styles.icon} />
        <FontAwesome5 name="vuejs" size={30} color="#9c9c9c" style={styles.icon} />
      </View>
    </ParallaxScrollView>
  );
}

// Estilos de los componentes
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingVertical: 20, 
    paddingBottom: 100, 
    paddingTop: 260, 
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    paddingBottom: 20, 
  },
  icon: {
    paddingHorizontal: 10, 
    marginLeft: 10, 
  },
  jsText: {
    color: 'yellow', 
  },
  text: {
    color: '#808080',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 30, 
  },
  button: {
    backgroundColor: '#4F8EF7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 14,
    width: '50%',
    alignSelf: 'center',
    marginBottom: 20, 
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});