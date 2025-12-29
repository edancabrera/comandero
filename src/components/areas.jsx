import { useEffect } from 'react';

import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';

import { useComandero } from '../context/ComanderoContext';

import areas from '../data/areas.json';

const Areas = () => {
    const { seleccionarArea } = useComandero();

    useEffect(()=>{
        const obtenerAreas = async () => {
            try {
                const response = await fetch('http://192.168.1.72:8080/areas');
                const data = await response.json();
                console.log(data)
            } catch (error) {
                console.error('Error al obtener áreas', error)
            }
        }
        obtenerAreas();
    }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Areas</Text>
      <ScrollView style={styles.buttonsContainer}>
        {areas.map((area)=>(
            <Pressable 
                key={area.id}
                onPress={() => seleccionarArea(area)}
                style={styles.areaButton}
            >
                <Text style={styles.areaButtonText}>{area.nombre}</Text>
            </Pressable>
        ))}
      </ScrollView>
    </View>
  )
}

export default Areas

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontWeight:'bold',
        fontSize: 24
    },
    buttonsContainer: {
        width:'100%',
    },
    areaButton: {
        backgroundColor: "#faa80f",
        padding:30,
        borderRadius: 5,
        marginTop:10,
        alignItems: 'center'
    },
    areaButtonText:{
        color: "#fff",
        fontWeight: "bold"
    }
})