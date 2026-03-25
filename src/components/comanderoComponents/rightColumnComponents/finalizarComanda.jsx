import { useComandero } from '../../../context/ComanderoContext';
import { useUI, MODALS } from '../../../context/UIContext';

import { StyleSheet, Text, View, Pressable } from 'react-native'

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

const FinalizarComanda = () => {
  const {pedido, setPedidoACancelarEnviadoACocina} = useComandero();

  const { openModal } = useUI();

  return (
    <View style={{flex:1, flexDirection:'row', justifyContent: 'space-around', alignItems: 'center'}}>
      <Pressable 
        style={{alignItems: 'center'}}
        onPress={() => { !pedido.length ? openModal(MODALS.COMANDA_VACIA) : openModal(MODALS.ENVIAR_COCINA) }}
      >
        <MaterialCommunityIcons name="chef-hat" size={24} color="black" />
        <Text>Enviar a cocina</Text>
      </Pressable>
      <Pressable 
        style={{alignItems: 'center'}}
        onPress={() => { !pedido.length ? openModal(MODALS.COMANDA_VACIA) : openModal(MODALS.ENVIAR_URGENTE) }}
      >
        <AntDesign name="fire" size={24} color="red" />
        <Text>Enviar urgente</Text>
      </Pressable>
      <Pressable 
        style={{alignItems: 'center'}}
        onPress={()=>{
          if(pedido.length===0)return;
          if(pedido.every(item => item.estatusCocina === 0)){
            setPedidoACancelarEnviadoACocina(false)
          } else {
            setPedidoACancelarEnviadoACocina(true)
          }
          openModal(MODALS.CANCELAR_COMANDA);
        }}
      >
        <MaterialCommunityIcons name="printer-pos-cancel-outline" size={24} color="black" />
        <Text>Cancelar</Text>
      </Pressable>
    </View>
  )
}

export default FinalizarComanda

const styles = StyleSheet.create({})