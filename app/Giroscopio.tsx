// Importamos los módulos necesarios de React y expo-sensors
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Gyroscope } from 'expo-sensors';

const Giroscopio = () => {
    // Estado para almacenar los datos del giroscopio en los ejes x, y, z
    const [data, setData] = useState({ x: 0, y: 0, z: 0 });

    useEffect(() => {
        // Obtiene los datos del giroscopio cada vez que se actualizan
        const subscription = Gyroscope.addListener((gyroscopeData) => {
            // Actualizamos el estado con los datos del giroscopio
            setData(gyroscopeData);
        });

        // Configuracion de el intervalo de actualización del giroscopio a 1 segundo
        Gyroscope.setUpdateInterval(1000);

        return () => {
            subscription.remove();
        };
    }, []);

    return (
        // Muestra los datos del giroscopio en el centro de la pantalla
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Giroscopio</Text>
            <Text>X: {data.x.toFixed(2)}</Text> 
            <Text>Y: {data.y.toFixed(2)}</Text> 
            <Text>Z: {data.z.toFixed(2)}</Text>
        </View>
    );
};

export default Giroscopio;
