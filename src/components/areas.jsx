import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { useComandero } from '../context/ComanderoContext';

const Areas = () => {
    const { seleccionarArea } = useComandero();
    const [areas, setAreas] = useState([]);

    useEffect(()=>{
        const obtenerAreas = async () => {
            try {
                const response = await fetch('http://192.168.1.72:8080/areas');
                if(!response.ok){
                    throw new Error ('Error en la respuesta del servidor');
                }
                const data = await response.json();
                setAreas(data);
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