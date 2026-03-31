import { StyleSheet, Text, View, Modal, Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";


const ModalAccionesDividirComanda  = ({title, paragraph, action, visiblity, setVisiblity, infoOnlyModal = false, infoAndActionModal = false, alert = false, question = false, successfull = false, titleColor = 'red'}) => {
  return (
    <Modal 
        animationType="fade" 
        transparent={true} 
        visible={visiblity}
        statusBarTranslucent={true}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          { question && <AntDesign name="question-circle" size={48} color="red" />}
          { alert && <AntDesign name="exclamation-circle" size={48} color="red" />}
          { successfull && <AntDesign name="check-circle" size={48} color="green" />}
          <Text style={[styles.modalText, styles.modalTextTitle, {color: titleColor}]}>
            {title}
          </Text>
          <Text style={[styles.modalText, styles.modalTextParagraph]}>
            {paragraph}
          </Text>

          <View style={{ flexDirection: "row" }}>
            <Pressable
              style={({ pressed }) => [
                styles.button, 
                styles.buttonNo,
                pressed && styles.buttonNoPressed
              ]}
              onPress={() => {
                if(infoAndActionModal){
                    action();
                }
                setVisiblity(!visiblity)
            }}
            >
              <Text style={styles.buttonText}>{infoOnlyModal? "Aceptar": "No"}</Text>
            </Pressable>
            {!infoOnlyModal &&
              <Pressable
                style={({ pressed }) => [
                styles.button, 
                styles.buttonSi,
                pressed && styles.buttonSiPressed
              ]}
                onPress={() => {
                  action();
                  setVisiblity(!visiblity)
              }}
              >
                <Text style={styles.buttonText}>Sí</Text>
              </Pressable>
            }
            
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalAccionesDividirComanda;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
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
  buttonSiPressed: {
    backgroundColor: "rgba(0, 255, 0, 0.5)"
  },
  buttonNo: {
    backgroundColor: "red",
  },
  buttonNoPressed: {
    backgroundColor: "rgba(255, 0, 0, 0.5)"
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
