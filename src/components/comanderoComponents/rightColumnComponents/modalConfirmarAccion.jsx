import {useComandero} from '../../../context/ComanderoContext';
import { StyleSheet, Text, View, Modal, Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

const ModalConfirmarAccion = ({title, paragraph, action}) => {
  const {modalConfirmarAccionVisible, setModalConfirmarAccionVisible} = useComandero();
  return (
    <Modal 
        animationType="slide" 
        transparent={true} 
        visible={modalConfirmarAccionVisible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <AntDesign name="question-circle" size={48} color="red" />
          <Text style={[styles.modalText, styles.modalTextTitle]}>
            {title}
          </Text>
          <Text style={[styles.modalText, styles.modalTextParagraph]}>
            {paragraph}
          </Text>

          <View style={{ flexDirection: "row" }}>
            <Pressable
              style={[styles.button, styles.buttonNo]}
              onPress={() => setModalConfirmarAccionVisible(!modalConfirmarAccionVisible)}
            >
              <Text style={styles.buttonText}>No</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonSi]}
              onPress={() => {
                action();
                setModalConfirmarAccionVisible(!modalConfirmarAccionVisible)
            }}
            >
              <Text style={styles.buttonText}>Sí</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalConfirmarAccion;

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
