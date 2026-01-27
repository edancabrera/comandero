import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Modal, Pressable } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useComandero } from '../context/ComanderoContext';

const ModalEditarMesa = () => {
    const {modalEdiarMesaVisible, setModalEditarMesaVisible} = useComandero();
    const {descripcion, setDescripcion} = useState("")
  return (
    <Modal 
        animationType="slide" 
        transparent={true} 
        visible={modalEdiarMesaVisible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
            <FontAwesome name="plus" size={36} color="green" />
            <Text style={{fontWeight: 'bold', fontSize: 24}}>Añade una descripción</Text>
            <TextInput 
                style={styles.input}
                value={descripcion}
            />
            <View style={{flexDirection: 'row'}}>
                <Pressable 
                    style={[styles.button, {backgroundColor: 'red'}]}
                    onPress={() => setModalEditarMesaVisible(false)}
                >
                    <Text style={{color: '#fff', fontWeight: 'bold'}}>Cancelar</Text>
                </Pressable>
                <Pressable 
                    style={[styles.button, {backgroundColor: 'green'}]}
                    onPress={() => {
                        if(!descripcion){setModalEditarMesaVisible(false); return}
                    }}
                >
                    <Text style={{color: '#fff', fontWeight: 'bold'}}>Aceptar</Text>
                </Pressable>
            </View>
        </View>
      </View>
    </Modal>
  );
}

export default ModalEditarMesa

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 30,
        alignItems: "center",
        shadowColor: "#000",
        maxWidth:"30%",
        minWidth:"30%",
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    input: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 5,
        minWidth: "100%",
        borderWidth: 1
    },
    button: {
        padding: 15,
        margin: 5,
        elevation: 2,
        flex: 1,
        alignItems:'center'
  },
})