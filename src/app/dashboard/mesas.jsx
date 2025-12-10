import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";

import Areas from '../../components/areas'
import { useState } from 'react';

const Mesas = () => {
  const [selectedArea, setSelectedArea] = useState(null)
  return (
    <SafeAreaView style={styles.container}>

      <ScrollView style={styles.layoutMesas}>
        {/* Insertar map para renderizar las mesas */}
      </ScrollView>

      <View style={styles.layoutAreas}>
        <Areas onSelectArea={setSelectedArea}/>
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