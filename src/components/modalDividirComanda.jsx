import { StyleSheet, Text, View, Modal, Pressable } from "react-native";
import { useComandero } from "../context/ComanderoContext";

const ModalDividirComanda = () => {
    const {modalDividirComandaVisible, setModalDividirComandaVisible} = useComandero();
  return (
    <Modal 
        animationType="slide" 
        transparent={true} 
        visible={modalDividirComandaVisible}
        onRequestClose={() => setModalDividirComandaVisible(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
            <Pressable
                style={styles.button}
                onPress={() => setModalDividirComandaVisible(false)}
            >
                <Text>Cerrar modal</Text>
            </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ModalDividirComanda ;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
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
  },
  button: {
    backgroundColor: "red",
    padding: 20,
    borderRadius: 5,
    margin: 5,
    alignItems: "center",
    width: 145,
  },
});
