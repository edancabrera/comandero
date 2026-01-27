import { StyleSheet, Text, View, TextInput, Modal, Pressable } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useComandero } from '../context/ComanderoContext';
import { buildApiUrl } from '../utils/apiConfig';

const ModalEditarMesa = () => {
    const {modalEdiarMesaVisible, setModalEditarMesaVisible, mesaSeleccionada, descripcionMesa, setDescripcionMesa } = useComandero();
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
                value={descripcionMesa}
                onChangeText={setDescripcionMesa}
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
                    onPress={async () => {
                        if(!descripcionMesa){setModalEditarMesaVisible(false); return}
                        
                        try {
                            const url = await buildApiUrl(`/mesas/${mesaSeleccionada.id}/descripcion`);
                            const response = await fetch(url, {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({ descripcion: `${mesaSeleccionada.nombre.split('-')[0].trim()} -  ${descripcionMesa}` })
                            });
                            if(!response.ok){
                                throw new Error ('Error en la respuesta del servidor');
                            }
                            setDescripcionMesa("");
                        } catch (error) {
                            console.error('Error al añadir la descripción', error);
                        }
                        setModalEditarMesaVisible(false);
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