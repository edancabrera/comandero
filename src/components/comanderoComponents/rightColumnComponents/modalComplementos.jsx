import { useEffect, useState } from 'react'
import { useComandero } from '../../../context/ComanderoContext'
import { Modal, StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import { Checkbox } from 'expo-checkbox'
import { buildApiUrl } from '../../../utils/apiConfig'

const ModalComplementos = () => {
    const {modalComplementosVisible, setModalComplementosVisible, pedido, lineaPedidoSeleccionadaId, agregarComentarioLinea} = useComandero();
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
            const idCategoria = pedido?.find(platillo => platillo.idLinea === lineaPedidoSeleccionadaId)?.idCategoriaPlatillo;
            const url = await buildApiUrl(`/categoria-platillo/${idCategoria}/complementos`)
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
        if(!lineaPedidoSeleccionadaId) return;
        obtenerComplementos();
    }, [lineaPedidoSeleccionadaId]);

    useEffect(() => {
        if (!modalComplementosVisible || !lineaPedidoSeleccionadaId) return;
        
        const linea = pedido.find(
            platillo => platillo.idLinea === lineaPedidoSeleccionadaId
        );

        if (!linea || !linea.comentarios) {
            setSeleccionados([]);
            setComentario("");
            return;
        }

        const comentariosArray = linea.comentarios
            .split(',')
            .map(item => item.trim())
            .filter(item => item.length > 0);

        setSeleccionados(comentariosArray);
        setComentario(comentariosArray.join(', '));

    }, [modalComplementosVisible, lineaPedidoSeleccionadaId]);

  return (
    <Modal
        animationType='slide'
        transparent={true}
        visible={modalComplementosVisible}
    >
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.title}>Complementos</Text>
                <Text style={styles.description}>Agrega los complementos a excluir</Text>
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
                    onPress={()=>{
                        agregarComentarioLinea(comentario);
                        setModalComplementosVisible(false);
                        setSeleccionados([]);
                        setComentario("");
                    }}
                    style={styles.button}
                >
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
    width: '30%',
    maxHeight: '90%'
  },
  title:{
    fontWeight: 'bold',
    fontSize: 24
  },
  description:{
    marginBottom: 10
  },
  button:{
    backgroundColor: '#faa80f',
    borderRadius: 5,
    padding: 15,
    marginTop: 10
  }
})