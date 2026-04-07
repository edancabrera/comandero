import { useComandero } from '../../../context/ComanderoContext';
import { useUI, MODALS } from '../../../context/UIContext';

import { StyleSheet, Text, View, Pressable, Alert } from 'react-native'

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

const FinalizarComanda = () => {
  const {pedido, setPedidoACancelarEnviadoACocina, verificarImpresora, calcularAgregados, detallesAEliminar} = useComandero();

  const { openModal, setPrintConfErrorMsg } = useUI();

  const handleEnviarCocina = async () => {
    try {
      if(!pedido.length){
        openModal(MODALS.COMANDA_VACIA);
        return;
      }
      if(calcularAgregados().length === 0 && detallesAEliminar.length === 0) {
        openModal(MODALS.COMANDA_SIN_CAMBIOS);
        return;
      };
      await verificarImpresora("COCINA");
      openModal(MODALS.ENVIAR_COCINA);
    } catch (error) {
      setPrintConfErrorMsg(error.message);
      openModal(MODALS.ERROR_IMPRESORA);
    }
  }

  const handleEnviarUrgente = async () => {
    try {
      if(!pedido.length){
        openModal(MODALS.COMANDA_VACIA);
        return;
      }
      if(calcularAgregados().length === 0 && detallesAEliminar.length === 0) {
        openModal(MODALS.COMANDA_SIN_CAMBIOS);
        return;
      };
      await verificarImpresora("COCINA");
      openModal(MODALS.ENVIAR_URGENTE)
    } catch (error) {
      setPrintConfErrorMsg(error.message);
      openModal(MODALS.ERROR_IMPRESORA);
    }
  }

  const handleCancelar = () => {
    if(pedido.length===0)return;
    if(pedido.every(item => item.estatusCocina === 0)){
      setPedidoACancelarEnviadoACocina(false)
    } else {
      setPedidoACancelarEnviadoACocina(true)
    }
    openModal(MODALS.CANCELAR_COMANDA);    
  }

  return (
    <View style={styles.buttonsContainer}>
      <Pressable
        style={({ pressed }) => ([
          styles.button,
          {
            marginLeft: 0,
            backgroundColor: pressed ? '#faa80f' : '#2596be' 
          }
        ])}
        onPress={handleEnviarCocina}
      >
        {({ pressed }) => (
          <>
            <MaterialCommunityIcons name="chef-hat" size={24} color={ pressed ? "#fff" : '#000'} />
            <Text style={styles.buttonText}>Enviar a cocina</Text>
          </>
        )} 
      </Pressable>
      <Pressable 
        style={({ pressed }) => ([
          styles.button,
          { backgroundColor: pressed ? '#faa80f' : '#2596be' }
        ])}
        onPress={handleEnviarUrgente}
      >
        {({ pressed }) => (
          <>
            <AntDesign name="fire" size={24} color={ pressed ? "red" : '#000'} />
            <Text style={styles.buttonText}>Enviar urgente</Text>
          </>
        )} 
      </Pressable>
      <Pressable 
        style={({ pressed }) => ([
          styles.button,
          {
            marginRight: 0,
            backgroundColor: pressed ? 'red' : '#2596be' 
          }
        ])}
        onPress={handleCancelar}
      >
        {({ pressed }) => (
          <>
            <MaterialCommunityIcons name="printer-pos-cancel-outline" size={24} color={ pressed ? "#fff" : '#000'} />
            <Text style={styles.buttonText}>Cancelar</Text>
          </>
        )} 
      </Pressable>
    </View>
  )
}

export default FinalizarComanda

const styles = StyleSheet.create({
  buttonsContainer:{
    flex:1,
    flexDirection:'row',
    paddingTop: 10,
    paddingBottom: 2
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
    borderRadius: 5,
    paddingVertical: 5
  },
  buttonText: {
    color: '#fff'
  }
})