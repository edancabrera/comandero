import { StyleSheet, Text, View, Modal, Pressable } from "react-native";
import { useComandero } from "../context/ComanderoContext";

import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Foundation from '@expo/vector-icons/Foundation';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';


const ModalOpcionesDeMesa = () => {
   const {modalOpcionesDeMesaVisible, setModalOpcionesDeMesaVisible} = useComandero();
  return (
    <Modal 
        animationType="slide" 
        transparent={true} 
        visible={modalOpcionesDeMesaVisible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
            <Pressable 
                onPress={()=>setModalOpcionesDeMesaVisible(false)}
                style={{ position: 'absolute', top: 5, right: 10}}
            >
                <Ionicons name="close" size={36} color="red" />
            </Pressable>
            <View style={{flexDirection:'row', flexWrap: 'wrap'}}>
                <OpcionesDeMesaButton
                    icono={<AntDesign name="printer" size={24} color="black" />}
                    opcion={'IMPRIMIR CUENTA'}
                />
                <OpcionesDeMesaButton
                    icono={<MaterialIcons name="account-balance-wallet" size={24} color="black" />}
                    opcion={'VER CUENTA'}
                />
                <OpcionesDeMesaButton
                    icono={<Foundation name="clipboard-pencil" size={24} color="black" />}
                    opcion={'ABRIR COMANDA'}
                />
                <OpcionesDeMesaButton
                    icono={<MaterialCommunityIcons name="table-furniture" size={24} color="black" />}
                    opcion={'UNIR MESAS'}
                />
                <OpcionesDeMesaButton
                    icono={<MaterialCommunityIcons name="table-furniture" size={24} color="black" />}
                    opcion={'CAMBIAR DE MESA'}
                />
                <OpcionesDeMesaButton
                    icono={<MaterialCommunityIcons name="table-furniture" size={24} color="black" />}
                    opcion={'DESUNIR MESA'}
                />
                <OpcionesDeMesaButton
                    icono={<MaterialCommunityIcons name="printer-pos-refresh-outline" size={24} color="black" />}
                    opcion={'REIMPRIMIR PEDIDO'}
                />
                <OpcionesDeMesaButton
                    icono={<MaterialCommunityIcons name="pencil-box-multiple-outline" size={24} color="black" />}
                    opcion={'DIVIDIR COMANDA'}
                />
                <OpcionesDeMesaButton
                    icono={<MaterialCommunityIcons name="pencil-box-multiple" size={24} color="black" />}
                    opcion={'EDITAR MESA'}
                />
            </View>
        </View>
      </View>
    </Modal>
  );
};

const OpcionesDeMesaButton = ({icono, opcion}) => {
    return (
        <Pressable style={styles.button}>
            {icono}
            <Text style={styles.buttonText}>{opcion}</Text>
        </Pressable>
    )
}

export default ModalOpcionesDeMesa;

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
  },
  button: {
    padding: 10,
    margin: 5,
    elevation: 2,
    backgroundColor: "#2596be",
    alignItems: 'center',
    borderRadius: 5,
    width: 120
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  }
});
