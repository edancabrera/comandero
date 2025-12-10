import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";

import Areas from '../../components/areas'

const Mesas = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.layoutMesas}>
        <Text>Aquí se mostrarán las mesas correspondientes a cada área</Text>
      </View>
      <View style={styles.layoutAreas}>
        <Areas />
      </View>
    </SafeAreaView>
  )
}

export default Mesas

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'row',
    backgroundColor: "#2596be",
  },
  layoutMesas :{
    flex:0.8,

    backgroundColor:'white'
  },
  layoutAreas: {
    flex:0.2,
  }
})