import { StyleSheet, Text, View, Modal, Pressable } from "react-native";

const ModalLoginError = () => {
  return (
    <Modal
        transparent={true}
    >
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text>Error</Text>
                <Text>Ocurrió un error</Text>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Aceptar</Text>
                </Pressable>
            </View>
        </View>
    </Modal>
  );
};

export default ModalLoginError;

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
    width: "50%",
  },
  button:{
    backgroundColor: '#2dbd4f',
    borderRadius: 5,
    padding: 15,
    marginVertical: 10
  },
  buttonText: {
    color:'#fff',
    fontWeight: 'bold'
  }
});
