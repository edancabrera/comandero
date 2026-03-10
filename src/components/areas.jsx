import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { useComandero } from '../context/ComanderoContext';
import { buildApiUrl } from '../utils/apiConfig';

const Areas = () => {
    const { seleccionarArea, areaSeleccionada  } = useComandero();
    const [areas, setAreas] = useState([]);

    useEffect(()=>{
        const obtenerAreas = async () => {
            try {
                const url = await buildApiUrl('/areas');
                const response = await fetch(url);
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
                style={[
                    styles.areaButton,
                    area.nombre === areaSeleccionada?.nombre && styles.areaButtonSelected
                ]}
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
    areaButtonSelected: {
        backgroundColor: "#c68000"
    },
    areaButtonText:{
        color: "#fff",
        fontWeight: "bold"
    }
})