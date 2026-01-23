import { useComandero } from "../context/ComanderoContext";
import { StyleSheet, Text, View, Modal, Pressable } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const ModalMesaUnida = ({mesa}) => {
    const { modalMesaUnidaVisible, setModalMesaUnidaVisible } = useComandero();
  return (
    <Modal 
        animationType="slide" 
        transparent={true} 
        visible={modalMesaUnidaVisible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <MaterialCommunityIcons name="table-furniture" size={48} color="#12ff12" />
          <Text style={[styles.modalText, styles.modalTextTitle]}>
            Mesa Unida
          </Text>
          <Text style={[styles.modalText, styles.modalTextParagraph]}>
            {mesa?.nombre} unida con {mesa?.mesaPrincipal?.nombre}
          </Text>

          <View style={{ flexDirection: "row" }}>
            <Pressable
              style={styles.button}
              onPress={() => setModalMesaUnidaVisible(!modalMesaUnidaVisible)}
            >
              <Text style={styles.buttonText}>OK</Text>
            </Pressable>
            
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalMesaUnida;

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
    backgroundColor: "#12ff12"
  },
  buttonText: {
    color: "white",
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
    color: "red",
  },
  modalTextParagraph: {
    fontSize: 16
  },
});
