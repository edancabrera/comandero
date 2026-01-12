import { Modal, StyleSheet, Text, View } from 'react-native'


const ModalComplementos = () => {
    
  return (
    <Modal
        animationType='slide'
        transparent={true}
        visible={true}
    >
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text>modal complementos</Text>
            </View>
        </View>
    </Modal>
  )
}

export default ModalComplementos

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
})