import { StyleSheet, Text, View, Modal, Pressable } from "react-native";
import { useLogin } from "../../context/LoginContext";
import Ionicons from '@expo/vector-icons/Ionicons';

const ModalLoginError = () => {
    const {modalLoginErrorVisible, setModalLoginErrorVisible, error} = useLogin();
  return (
    <Modal
        transparent={true}
        visible={modalLoginErrorVisible}
    >
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Ionicons name="warning-outline" size={48} color="#faa80f" />
                <Text style={styles.title}>{error?.title}</Text>
                <Text style={styles.paragraph}>{error?.message}</Text>
                <Pressable 
                    style={styles.button} 
                    onPress={()=>{setModalLoginErrorVisible(false)}}
                >
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
    padding: 20,
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
    width: '80%',
    alignItems: 'center',
    backgroundColor: '#faa80f',
    borderRadius: 5,
    padding: 15,
    marginVertical: 10
  },
  buttonText: {
    color:'#fff',
    fontWeight: 'bold'
  },
  title:{
    fontSize:18,
    marginBottom: 15
  },
  paragraph: {
    fontSize: 16,
    color: 'red'
  }
});
