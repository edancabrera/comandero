import { StyleSheet, Text, View, Modal, Pressable } from "react-native";
import { useComandero } from "../context/ComanderoContext";
import { useUI, MODALS } from "../context/UIContext";
import { useRouter } from 'expo-router';

import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Foundation from '@expo/vector-icons/Foundation';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';


const ModalOpcionesDeMesa = () => {
   const { abrirComandaMesa, reimprimirTicket, imprimirCuenta, verificarImpresora, mesaSeleccionada } = useComandero();

   const { modals, openModal, closeModal, setPrintConfErrorMsg } = useUI();

   const router = useRouter();
  return (
    <Modal 
        animationType="slide" 
        transparent={true} 
        visible={modals[MODALS.OPCIONES_MESA]}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
            <Pressable 
                onPress={()=> closeModal(MODALS.OPCIONES_MESA) }
                style={{ position: 'absolute', top: 5, right: 10}}
            >
                <Ionicons name="close" size={36} color="red" />
            </Pressable>
            <View style={{flexDirection:'row', flexWrap: 'wrap'}}>
                <OpcionesDeMesaButton
                    icono={<AntDesign name="printer" size={24} color="black" />}
                    opcion={'IMPRIMIR CUENTA'}
                    action={async () => {
                        try {
                            await verificarImpresora("COCINA");
                            await verificarImpresora("ADMIN");
                            await imprimirCuenta();
                        } catch (error) {
                            setPrintConfErrorMsg(error.message);
                            openModal(MODALS.ERROR_IMPRESORA);
                        }
                        closeModal(MODALS.OPCIONES_MESA);
                    }}
                />
                <OpcionesDeMesaButton
                    icono={<MaterialIcons name="account-balance-wallet" size={24} color="black" />}
                    opcion={'VER CUENTA'}
                    action={async () => {
                        closeModal(MODALS.OPCIONES_MESA);
                        openModal(MODALS.VER_CUENTA);
                    }}
                />
                <OpcionesDeMesaButton
                    icono={<Foundation name="clipboard-pencil" size={24} color="black" />}
                    opcion={'ABRIR COMANDA'}
                    action={async () =>{
                        await abrirComandaMesa();
                        router.replace("/dashboard/comandero");
                        closeModal(MODALS.OPCIONES_MESA);
                    }}
                />
                <OpcionesDeMesaButton
                    icono={<MaterialCommunityIcons name="table-furniture" size={24} color="black" />}
                    opcion={'UNIR MESAS'}
                    action={() => {
                        closeModal(MODALS.OPCIONES_MESA);
                        openModal(MODALS.UNION_MESAS);
                    }}
                />
                <OpcionesDeMesaButton
                    icono={<MaterialCommunityIcons name="table-furniture" size={24} color="black" />}
                    opcion={'CAMBIAR DE MESA'}
                    disabled = {mesaSeleccionada?.mesasHijasIds.length > 0}
                    action={()=> {
                        closeModal(MODALS.OPCIONES_MESA);
                        openModal(MODALS.CAMBIO_MESA);
                    }}
                />
                <OpcionesDeMesaButton
                    icono={<MaterialCommunityIcons name="table-furniture" size={24} color="black" />}
                    opcion={'DESUNIR MESA'}
                    disabled = {mesaSeleccionada?.mesasHijasIds.length <= 0}
                    action={() => {
                        closeModal(MODALS.OPCIONES_MESA);
                        openModal(MODALS.DESUNION_MESAS);
                    }}
                />
                <OpcionesDeMesaButton
                    icono={<MaterialCommunityIcons name="printer-pos-refresh-outline" size={24} color="black" />}
                    opcion={'REIMPRIMIR PEDIDO'}
                    action={async () => {
                        try {
                            await verificarImpresora("COCINA");
                            await reimprimirTicket();
                        } catch (error) {
                            setPrintConfErrorMsg(error.message);
                            openModal(MODALS.ERROR_IMPRESORA);
                        }
                        closeModal(MODALS.OPCIONES_MESA);
                    }}
                />
                <OpcionesDeMesaButton
                    icono={<MaterialCommunityIcons name="pencil-box-multiple-outline" size={24} color="black" />}
                    opcion={'DIVIDIR COMANDA'}
                    action={() => {
                        closeModal(MODALS.OPCIONES_MESA);
                        openModal(MODALS.DIVIDIR_COMANDA);
                    }}
                />
                <OpcionesDeMesaButton
                    icono={<MaterialCommunityIcons name="pencil-box-multiple" size={24} color="black" />}
                    opcion={'EDITAR MESA'}
                    action={()=>{
                        closeModal(MODALS.OPCIONES_MESA);
                        openModal(MODALS.EDITAR_MESA);
                    }}
                />
            </View>
        </View>
      </View>
    </Modal>
  );
};

const OpcionesDeMesaButton = ({icono, opcion, action, disabled = false}) => {
    return (
        <Pressable 
            style={[
                styles.button,
                disabled && styles.buttonDisabled
            ]}
            onPress={action}
            disabled={disabled}
        >
            {icono}
            <Text style={[
                styles.buttonText,
                disabled && styles.buttonDisabledText
            ]}>{opcion}</Text>
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
  buttonDisabled:{
    backgroundColor: "#185e78",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonDisabledText: {
    color: "#cabebe"
  }
});
