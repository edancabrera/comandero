import { StyleSheet, Text, View, Pressable } from 'react-native'

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

const FinalizarComanda = () => {
  return (
    <View style={{flex:1, flexDirection:'row', justifyContent: 'space-around', alignItems: 'center'}}>
      <Pressable style={{alignItems: 'center'}}>
        <MaterialCommunityIcons name="chef-hat" size={24} color="black" />
        <Text>Enviar a cocina</Text>
      </Pressable>
      <Pressable style={{alignItems: 'center'}}>
        <AntDesign name="fire" size={24} color="red" />
        <Text>Enviar urgente</Text>
      </Pressable>
      <Pressable style={{alignItems: 'center'}}>
        <MaterialCommunityIcons name="printer-pos-cancel-outline" size={24} color="black" />
        <Text>Cancelar</Text>
      </Pressable>
    </View>
  )
}

export default FinalizarComanda

const styles = StyleSheet.create({})