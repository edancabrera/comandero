import { StyleSheet, Text, View, Modal, Pressable, ScrollView } from 'react-native';
import { useComandero } from '../context/ComanderoContext';
import { useUI, MODALS } from '../context/UIContext';
import { useEffect, useState } from 'react';

const ModalVerCuenta = () => {
    const { mesaSeleccionada, crearCuenta } = useComandero();

    const { modals, closeModal } = useUI();

    const [cuentaTexto, setCuentaTexto] = useState("");

    useEffect( ()=>{
        if (!modals[MODALS.VER_CUENTA] || !mesaSeleccionada) return;
        const cargarCuenta = async () => {
            const cuenta = await crearCuenta();
            if (cuenta) {
                setCuentaTexto(cuenta);
        }
    };
    cargarCuenta();
    },[modals[MODALS.VER_CUENTA], mesaSeleccionada])
  return (
    <Modal 
        animationType="fade" 
        transparent={true} 
        visible={modals[MODALS.VER_CUENTA]}
        statusBarTranslucent={true}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={[styles.modalText, styles.modalTextTitle]}>
            {`Cuenta de la mesa ${mesaSeleccionada?.nombre ?? ""}`}
          </Text>
          <ScrollView>
            <Text style={styles.modalTextParagraph}>
                {cuentaTexto}
            </Text>
          </ScrollView>
          <View style={{ flexDirection: "row" }}>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed
              ]}
              onPress={() => {
                closeModal(MODALS.VER_CUENTA);
                setCuentaTexto("");
            }}
            >
              <Text style={styles.buttonText}>Salir</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default ModalVerCuenta

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  modalView: {
    maxHeight: '90%',
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
    padding: 10,
    margin: 5,
    elevation: 2,
    flex: 1,
    backgroundColor: "rgb(255, 0, 0)",
    borderRadius: 5
  },
  buttonPressed: {
    backgroundColor: "rgba(255, 0, 0, 0.5)"
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: 'bold'
  },
  modalTextTitle: {
    fontSize: 24,
    color: "#000",
  },
  modalTextParagraph: {
    fontSize: 16
  },
});