import { Modal, StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import { Checkbox } from 'expo-checkbox'
import { buildApiUrl } from '../../../utils/apiConfig'
import { useEffect, useState } from 'react'

const ModalComplementos = () => {
    const [complementos, setComplementos] = useState([])
    const obtenerComplementos = async () => {
        try {
            const url = await buildApiUrl('/categoria-platillo/15/complementos');
            const response = await fetch(url);
            if(!response.ok){
                throw new Error("Error en la respuesta del servidor");
            }
            const data = await response.json();
            setComplementos(data);
        } catch (error) {
            console.error('Error al obtener complementos', error)
        }
    }

    useEffect(()=>{
        obtenerComplementos();
    }, []);
  return (
    <Modal
        animationType='slide'
        transparent={true}
        visible={true}
    >
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text>Complementos</Text>
                <Text>Agrega los complementos a excluir</Text>
                <ScrollView style={{width:"100%"}}>
                    {complementos.map( complemento =>(
                        <View style={{flexDirection: 'row'}}>
                            <Checkbox
                                style={{margin:4}} 
                                value={false}
                            />
                            <Text>{complemento.descripsion}</Text>
                        </View>
                    ))}
                </ScrollView>
                <Pressable>
                    <Text>Confirmar</Text>
                </Pressable>
            </View>
        </View>
    </Modal>
  )
}

export default ModalComplementos

const styles = StyleSheet.create({
    centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 40,
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
    width: '30%'
  },
})