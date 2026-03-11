import { StyleSheet, Text, View, Modal } from "react-native";

const ModalDividirComanda = () => {
  return (
    <Modal 
        animationType="slide" 
        transparent={true} 
        visible={true}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
            <Text>Modal Dividir Comanda</Text>
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
  }
});
