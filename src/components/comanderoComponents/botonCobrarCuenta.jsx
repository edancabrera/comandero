import { StyleSheet, Text, Pressable } from 'react-native'
import { useComandero } from '../../context/ComanderoContext';
import { useUI, MODALS, LOADINGS } from '../../context/UIContext';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const BotonCobrarCuenta = () => {
    const { pedido, verificarImpresora } = useComandero();
    const { openModal, setPrintConfErrorMsg, loadings, startLoading, finishLoading } = useUI();
  return (
    <Pressable 
        style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
            loadings[LOADINGS.ENVIAR_O_COBRAR_COMANDA] && styles.buttonPressed
        ]}

         onPress={async () => { 
            try {
                startLoading(LOADINGS.ENVIAR_O_COBRAR_COMANDA);
                if(!pedido.length){
                openModal(MODALS.COMANDA_VACIA);
                return;
                }
                await verificarImpresora("COCINA");
                await verificarImpresora("ADMIN");
                openModal(MODALS.ENVIAR_Y_COBRAR);
            } catch (error) {
                setPrintConfErrorMsg(error.message);
                openModal(MODALS.ERROR_IMPRESORA);
            } finally {
                finishLoading(LOADINGS.ENVIAR_O_COBRAR_COMANDA);
            }
        }}
    >
        <MaterialCommunityIcons name="cash-edit" size={24} color="green" />
        <Text style = {styles.buttonText}>Cobrar cuenta</Text>
    </Pressable>
  )
}

export default BotonCobrarCuenta

const styles = StyleSheet.create({
    button: {
        padding:5,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: '#faa80f',
        margin: 5
    },
    buttonPressed: {
        backgroundColor: "#c68000"
    },
    buttonText:{
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 16
    }
})