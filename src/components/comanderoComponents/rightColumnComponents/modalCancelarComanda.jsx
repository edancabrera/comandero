import { useComandero } from '../../../context/ComanderoContext'
import { StyleSheet, Text, View, Modal, Pressable } from 'react-native'

const ModalCancelarComanda = () => {
    const {modalCancelarComandaVisible, setModalCancelarComandaVisible, pedidoACancelarEnviadoACocina} = useComandero();
  return (
    <Modal 
            animationType="slide"
            transparent={true} 
            visible={modalCancelarComandaVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={[styles.modalText, styles.modalTextTitle, pedidoACancelarEnviadoACocina && {color:'green'}]}>{pedidoACancelarEnviadoACocina? "Comanda Cancelada": "¿Está seguro de cancelar la comanda?"}</Text>
              <Text style={[styles.modalText, styles.modalTextParagraph]}>{pedidoACancelarEnviadoACocina? "Comanda cancelada exitosamente": "La comanda ya fue enviada a cocina, ¿está seguro de continuar?"}</Text>
              <View style={{flexDirection: 'row'}}>
                {!pedidoACancelarEnviadoACocina &&
                    <Pressable
                        style={[styles.button, styles.buttonNo]}
                        onPress={()=>{setModalCancelarComandaVisible(false)}}
                    >
                        <Text style={styles.buttonText}>NO</Text>
                    </Pressable>
                }
                <Pressable
                    style={[styles.button, styles.buttonSi]}
                    onPress={() => {
                        if(pedidoACancelarEnviadoACocina){
                            //Cerrar la modal y resetear los estados
                        }else{
                            //Cerrar la modal, resetar los estados y llamar a la API al enpdoint correspondiente
                        }
                    }}
                >
                    <Text style={styles.buttonText}>{pedidoACancelarEnviadoACocina? "Aceptar": "Si"}</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
  )
}

export default ModalCancelarComanda

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
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '50%'
  },
  button: {
    padding: 20,
    margin: 5,
    elevation: 2,
    flex: 1,
  },
  buttonSi: {
    backgroundColor: "green",
  },
  buttonNo: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: 'bold'
  },
  modalTextTitle: {
    fontSize: 24,
    color: "red",
  },
  modalTextParagraph: {
    fontSize: 16
  },
})