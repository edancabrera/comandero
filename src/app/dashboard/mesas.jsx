import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import Areas from '../../components/areas'
import { useState } from 'react';

const Mesas = () => {
  const [selectedArea, setSelectedArea] = useState(null)
  return (
    <SafeAreaView style={styles.container}>

      <ScrollView style={styles.layoutMesas}>
        {selectedArea ? (
          <>
          <Text>{selectedArea.nombre}</Text>
          {selectedArea.mesas.map((mesa)=>(
            <Pressable key={mesa.id}>
              <MaterialIcons name="table-bar" size={24} color="black" />
              <Text>{mesa.nombre}</Text>
            </Pressable>
          ))}
          </>
        ):(
          <Text>Selecciona un área para ver sus mesas</Text>
        )

        }
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