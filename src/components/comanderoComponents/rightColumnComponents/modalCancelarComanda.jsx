import { useComandero } from '../../../context/ComanderoContext'
import { useUI, MODALS, LOADINGS } from '../../../context/UIContext';
import { StyleSheet, Text, View, Modal, Pressable } from 'react-native'
import { useRouter } from 'expo-router';

const ModalCancelarComanda = () => {
    const {
      pedidoACancelarEnviadoACocina, 
      cancelarComanda,
      limpiarEstado
    } = useComandero();

    const { modals, closeModal, loadings, startLoading, finishLoading } = useUI();

    const router = useRouter();
  return (
    <Modal 
            animationType="fade"
            transparent={true} 
            visible={ modals[MODALS.CANCELAR_COMANDA]}
            statusBarTranslucent={true}
            onRequestClose={()=>{closeModal(MODALS.CANCELAR_COMANDA)}}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={[styles.modalText, styles.modalTextTitle, !pedidoACancelarEnviadoACocina && {color:'green'}]}>{pedidoACancelarEnviadoACocina? "¿Está seguro de cancelar la comanda?": "Comanda Cancelada"}</Text>
              <Text style={[styles.modalText, styles.modalTextParagraph]}>{pedidoACancelarEnviadoACocina? "La comanda ya fue enviada a cocina, ¿está seguro de continuar?": "Comanda cancelada exitosamente"}</Text>
              <View style={{flexDirection: 'row'}}>
                {pedidoACancelarEnviadoACocina &&
                    <Pressable
                        style={({ pressed }) => [
                        styles.button, 
                        styles.buttonNo,
                        pressed && styles.buttonNoPressed
                      ]}
                        onPress={()=>{closeModal(MODALS.CANCELAR_COMANDA)}}
                    >
                        <Text style={styles.buttonText}>NO</Text>
                    </Pressable>
                }
                <Pressable
                    style={({ pressed }) => [
                      styles.button, 
                      styles.buttonSi,
                      pressed && styles.buttonSiPressed,
                      loadings[LOADINGS.ENVIAR_O_COBRAR_COMANDA] && styles.buttonSiPressed
                    ]}
                    onPress={ async () => {
                      try {
                        startLoading(LOADINGS.ENVIAR_O_COBRAR_COMANDA);
                        await cancelarComanda();
                        limpiarEstado();
                        router.replace("/dashboard/mesas");
                        closeModal(MODALS.CANCELAR_COMANDA);
                      } catch (error) {
                        console.error('Error', error)
                      } finally {
                        finishLoading(LOADINGS.ENVIAR_O_COBRAR_COMANDA);
                      }
                    }}
                    disabled={loadings[LOADINGS.ENVIAR_O_COBRAR_COMANDA]}
                >
                    <Text style={styles.buttonText}>{pedidoACancelarEnviadoACocina? "Si" : "Aceptar"}</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
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
    borderRadius: 5
  },
  buttonSi: {
      backgroundColor: 'green',
  },
  buttonSiPressed: {
    backgroundColor: 'rgba(0, 128, 0, 0.5)',
  },
  buttonNo: {
    backgroundColor: "red",
  },
  buttonNoPressed: {
    backgroundColor: 'rgba(128, 0, 0, 0.5)',
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