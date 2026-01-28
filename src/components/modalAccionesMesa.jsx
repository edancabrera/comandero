import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/apiConfig';
import { StyleSheet, Text, View, Modal, Pressable, ScrollView} from 'react-native'
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useComandero } from '../context/ComanderoContext';

const ModalAccionesMesa = ({
    visibility, 
    setVisibility,
    title, 
    mesaPrincipal, 
    area,
    mode
}) => {
    
    const {areaSeleccionada, mesaSeleccionada} = useComandero();
    const [mesas, setMesas] = useState([]);
    const [mesasSeleccionadas, setMesasSeleccionadas] = useState([]);

    useEffect( () => {
        if(!visibility || !mesaSeleccionada) return;
        
        const obtenerMesas = async () => {
            let url = "";
            mode === "DESUNIR" 
                ? url = await buildApiUrl(`/mesas/principal/${mesaSeleccionada.id}`)
                : url = await buildApiUrl(`/areas/${areaSeleccionada.id}/mesas?estatus=DISPONIBLE`)
            try {
                const response = await fetch(url);
                const data = await response.json();
                setMesas(data);
            } catch (error) {
                console.error("Error al obtener mesas", error);
            }
        };

        obtenerMesas();
    }, [visibility, mesaSeleccionada]);

    const seleccionarMesa = (mesa) => {
        setMesasSeleccionadas(prev => 
            prev.some(m => m.id === mesa.id)
              ? prev.filter(m => m.id !== mesa.id)
              : [...prev, mesa]
        );
    };

  return (
    <Modal 
        animationType="slide" 
        transparent={true} 
        visible={visibility}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.mesaInfo}>{`Mesa Principal: ${mesaPrincipal}`}</Text>
            <Text style={styles.areaInfo}>{`Area: ${area}`}</Text>
            <Text style={{alignSelf: 'flex-start'}}>Mesas</Text>

            <ScrollView>
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                {mesas?.map(mesa => (
                    <Pressable
                        key={mesa.id}
                        onPress={() => seleccionarMesa(mesa)}
                        style={[
                            styles.mesaButton,
                            mesasSeleccionadas.some(m => m.id === mesa.id) && styles.mesaButtonSelected
                        ]}
                    >
                        <Text style={styles.mesaButtonText}>{mesa?.nombre}</Text>
                    </Pressable>
                ))}
                </View>
            </ScrollView>

            <View style={{flexDirection: 'row'}}>
                <Pressable
                    style = {styles.button}
                >
                    <Feather name="save" size={24} color="blue" />
                    <Text style = {styles.buttonText}>Guardar</Text>
                </Pressable>
                <Pressable
                    style = {styles.button}
                    onPress={() => setVisibility(false)}
                >
                    <AntDesign name="close-circle" size={24} color="red" />
                    <Text style = {styles.buttonText}>Salir</Text>
                </Pressable>
            </View>
            
        </View>
      </View>
    </Modal>
  )
}

export default ModalAccionesMesa

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        width: '50%',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 30,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    title:{
        width: '100%',
        fontWeight: 'bold',
        fontSize: 32,
        textAlign: 'center',
        backgroundColor: "#faa80f"
    },
    mesaInfo:{
        fontWeight: 'bold',
        fontSize: 18,
        alignSelf: 'flex-start'
    },
    areaInfo:{
        fontWeight: 'bold',
        fontSize: 18,
        alignSelf: 'flex-start'
    },
    button: {
        flex: 1,
        padding: 5,
        margin: 5,
        elevation: 2,
        alignItems:'center',
        backgroundColor: 'lightgrey'
  },
  buttonText: {
        fontWeight: 'bold'
  },
  mesaButton: {
        padding: 10,
        margin: 5,
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 5,
        minWidth: 80,
        alignItems: 'center'
  },
  mesaButtonSelected: {
        backgroundColor: '#79caf5',
        borderColor: '#2596be'
  },
  mesaButtonText: {
        fontWeight: 'bold'
  }
})