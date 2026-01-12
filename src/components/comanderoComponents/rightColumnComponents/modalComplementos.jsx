import { Modal, StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import { Checkbox } from 'expo-checkbox'
import { buildApiUrl } from '../../../utils/apiConfig'
import { useEffect, useState } from 'react'
import { useComandero } from '../../../context/ComanderoContext'

const ModalComplementos = () => {
    const {modalComplementosVisible, setModalComplementosVisible} = useComandero();
    const [complementos, setComplementos] = useState([]);
    const [comentario, setComentario] = useState("");
    const [seleccionados, setSeleccionados] = useState([]);

    const toggleComplemento = (descripcion) => {
        setSeleccionados((prev)=>{
            let nuevos;

            if(prev.includes(descripcion)){
                nuevos = prev.filter(item => item !== descripcion);
            } else {
                nuevos = [...prev, descripcion];
            }

            setComentario(nuevos.join(', '));
            return nuevos;
        })
    }

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
        visible={modalComplementosVisible}
    >
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text>Complementos</Text>
                <Text>Agrega los complementos a excluir</Text>
                <ScrollView style={{width:"100%"}}>
                    {complementos.map( complemento =>(
                        <View
                            key={complemento.id}
                            style={{flexDirection: 'row'}}
                        >
                            <Checkbox
                                style={{margin:4}} 
                                value={seleccionados.includes(complemento.descripsion)}
                                onValueChange={() => toggleComplemento(complemento.descripsion)}
                            />
                            <Text>{complemento.descripsion}</Text>
                        </View>
                    ))}
                </ScrollView>
                <Pressable
                    onPress={()=>{setModalComplementosVisible(false)}}
                >
                    <Text>Confirmar</Text>
                </Pressable>
                    <Text>Comentario: {comentario}</Text>
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