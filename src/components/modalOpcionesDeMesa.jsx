import { StyleSheet, Text, View, Modal, Pressable, ActivityIndicator } from "react-native";
import { useComandero } from "../context/ComanderoContext";
import { useUI, MODALS, LOADINGS } from "../context/UIContext";
import { useRouter } from 'expo-router';

import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Foundation from '@expo/vector-icons/Foundation';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';


const ModalOpcionesDeMesa = () => {
   const { abrirComandaMesa, reimprimirTicket, imprimirCuenta, verificarImpresora, mesaSeleccionada } = useComandero();

   const { modals, openModal, closeModal, setPrintConfErrorMsg, loadings, startLoading, finishLoading } = useUI();

   const router = useRouter();
  return (
    <Modal 
        animationType="fade" 
        transparent={true} 
        visible={modals[MODALS.OPCIONES_MESA]}
        statusBarTranslucent={true}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
            {loadings[LOADINGS.OPCIONES_MESA] && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size='120' />
                </View>
            )}
            <Pressable 
                onPress={()=> closeModal(MODALS.OPCIONES_MESA) }
                style={({ pressed }) => [
                    { position: 'absolute', top: 5, right: 10, borderRadius: 5},
                    pressed && {backgroundColor: 'rgba(255,0,0,0.5)'}
                ]}
            >
                <Ionicons name="close" size={36} color="red" />
            </Pressable>
            <View style={{flexDirection:'row', flexWrap: 'wrap', justifyContent: 'center'}}>
                <OpcionesDeMesaButton
                    icono={<Foundation name="clipboard-pencil" size={24} color="black" />}
                    opcion={'ABRIR COMANDA'}
                    action={async () =>{
                        try {
                            startLoading(LOADINGS.OPCIONES_MESA);
                            await abrirComandaMesa();
                        } catch {
                        } finally {
                            finishLoading(LOADINGS.OPCIONES_MESA);
                            router.replace("/dashboard/comandero");
                            closeModal(MODALS.OPCIONES_MESA);
                        }
                    }}
                    bgColors={{normal:"#faa80f", disabled: "#c38512", pressed: "#f6ba4a"}}
                />
                <OpcionesDeMesaButton
                    icono={<AntDesign name="printer" size={24} color="black" />}
                    opcion={'IMPRIMIR CUENTA'}
                    action={async () => {
                        try {
                            startLoading(LOADINGS.OPCIONES_MESA);
                            await verificarImpresora("COCINA");
                            await verificarImpresora("ADMIN");
                            await imprimirCuenta();
                        } catch (error) {
                            setPrintConfErrorMsg(error.message);
                            openModal(MODALS.ERROR_IMPRESORA);
                        } finally {
                            finishLoading(LOADINGS.OPCIONES_MESA);
                            closeModal(MODALS.OPCIONES_MESA);
                        }
                    }}
                    bgColors={{normal:"#faa80f", disabled: "#c38512", pressed: "#f6ba4a"}}
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
                            startLoading(LOADINGS.OPCIONES_MESA);
                            await verificarImpresora("COCINA");
                            await reimprimirTicket();
                        } catch (error) {
                            setPrintConfErrorMsg(error.message);
                            openModal(MODALS.ERROR_IMPRESORA);
                        } finally {
                            finishLoading(LOADINGS.OPCIONES_MESA);
                            closeModal(MODALS.OPCIONES_MESA);
                        }
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

const OpcionesDeMesaButton = ({icono, opcion, action, disabled = false, bgColors = {normal: "#2596be", disabled: "#185e78", pressed: "#35bbec"}}) => {
    const { loadings } = useUI();
    return (
        <Pressable 
            style={({ pressed }) => [
                styles.button,
                {backgroundColor: bgColors.normal},
                disabled && {backgroundColor: bgColors.disabled},
                loadings[LOADINGS.OPCIONES_MESA] && {backgroundColor: bgColors.disabled},
                pressed && {backgroundColor: bgColors.pressed}
            ]}
            onPress={action}
            disabled={disabled || loadings[LOADINGS.OPCIONES_MESA]}
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
  },
  button: {
    padding: 10,
    margin: 5,
    elevation: 2,
    alignItems: 'center',
    borderRadius: 5,
    width: 120
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonDisabledText: {
    color: "#cabebe"
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10
  }
});
