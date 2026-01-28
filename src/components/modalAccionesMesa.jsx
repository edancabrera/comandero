import { StyleSheet, Text, View, Modal, Pressable } from 'react-native'
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';

const ModalAccionesMesa = ({title, mesaPrincipal, area}) => {
  return (
    <Modal 
        animationType="slide" 
        transparent={true} 
        visible={true}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.mesaInfo}>{`Mesa Principal: ${mesaPrincipal}`}</Text>
            <Text style={styles.areaInfo}>{`Area: ${area}`}</Text>
            <Text style={{alignSelf: 'flex-start'}}>Mesas</Text>
            <View style={{flexDirection: 'row'}}>
                <Pressable
                    style = {styles.button}
                >
                    <Feather name="save" size={24} color="blue" />
                    <Text style = {styles.buttonText}>Guardar</Text>
                </Pressable>
                <Pressable
                    style = {styles.button}
                >
                    <AntDesign name="close-circle" size={24} color="red" />
                    <Text style = {styles.buttonText}>Salir</Text>
                </Pressable>
            </View>
            
        </View>
      </View>
    </Modal>
  )
}

export default ModalAccionesMesa

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        width: '50%',
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
    title:{
        width: '100%',
        fontWeight: 'bold',
        fontSize: 32,
        textAlign: 'center',
        backgroundColor: "#faa80f"
    },
    mesaInfo:{
        fontWeight: 'bold',
        fontSize: 18,
        alignSelf: 'flex-start'
    },
    areaInfo:{
        fontWeight: 'bold',
        fontSize: 18,
        alignSelf: 'flex-start'
    },
    button: {
        flex: 1,
        padding: 5,
        margin: 5,
        elevation: 2,
        alignItems:'center',
        backgroundColor: 'lightgrey'
  },
  buttonText: {
    fontWeight: 'bold'
  }
})