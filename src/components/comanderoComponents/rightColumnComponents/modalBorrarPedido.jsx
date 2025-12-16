import { useState } from "react";
import { StyleSheet, Text, View, Modal, Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

const ModalBorrarPedido = () => {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <Modal 
        animationType="slide" 
        transparent={true} 
        visible={modalVisible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <AntDesign name="question-circle" size={48} color="red" />
          <Text style={[styles.modalText, styles.modalTextTitle]}>
            ¿Desea borrar todos los platillos?
          </Text>
          <Text style={[styles.modalText, styles.modalTextParagraph]}>
            La tabla del pedido quedará vacía
          </Text>

          <View style={{ flexDirection: "row" }}>
            <Pressable
              style={[styles.button, styles.buttonNo]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.buttonText}>No</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonSi]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.buttonText}>Sí</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalBorrarPedido;

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
    color: "white",
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
});
