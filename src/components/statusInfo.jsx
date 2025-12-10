import { StyleSheet, Text, View } from 'react-native'

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const StatusInfo = () => {

    const statusExistentes = [
        {
            estado: 'Disponible',
            color: '#12ff12'
        },
        {
            estado: 'Ocupada',
            color: '#fe1616'
        },
        {
            estado: 'Por liberarse',
            color: '#fbfb1b'
        },
        {
            estado: 'Mesa unida',
            color: '#79caf5'
        },

    ]

  return (
    <View>
      <Text style={{alignSelf: 'center', fontWeight: 'bold', }}>Estados</Text>
      {statusExistentes.map((status, index) => (
        <View key={index} style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text>{status.estado}</Text>
        <MaterialCommunityIcons name="square-rounded" size={24} color={status.color} />
      </View>
      ))}
    </View>
  )
}

export default StatusInfo

const styles = StyleSheet.create({})