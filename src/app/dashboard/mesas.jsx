import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import Areas from '../../components/areas'
import { useState } from 'react';

const Mesas = () => {
  const [selectedArea, setSelectedArea] = useState(null);

    const getMesasButtonBackgroundColor = (estatus) => {
      switch(estatus){
        case 'DISPONIBLE':
          return "#12ff12";
        case 'OCUPADO':
          return "#ff4d4d";
        case 'POR LIBERARSE':
          return "#ffeb3b";
        case 'MESA UNIDA':
          return "#3b82f6";
        default:
          return "#12ff12"
      }
    }

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView 
        style={styles.layoutMesas}
        stickyHeaderIndices={[0]}
      >
        <View style={styles.stickyHeader}>
          <Text style={styles.mesasTitle}>{selectedArea?.nombre}</Text>
        </View>
        
        {selectedArea ? (
          <>
            <View style={styles.mesasButtonsContainer}>
            {selectedArea.mesas.map((mesa)=>(
              <Pressable key={mesa.id} style={[styles.mesasButton, {backgroundColor: getMesasButtonBackgroundColor(mesa.estatus)}]}>
                <MaterialIcons name="table-bar" size={32} color="#cf8a5e" />
                <Text style={styles.mesasButtonText}>{mesa.nombre}</Text>
              </Pressable>
            ))}
            </View>
          </>
        ):(
          <View style={{alignItems: 'center'}}>
            <Text style={styles.mesasTitle}>Selecciona un área para ver sus mesas</Text>
          </View>
          
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
    backgroundColor: "#2596be"
  },
  layoutMesas :{
    flex:0.8,
  },
  stickyHeader: {
    backgroundColor: '#2596be',
    paddingVertical: 5
  },
  mesasTitle:{
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff'
  },
  mesasButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  mesasButton:{
    padding: 20,
    borderRadius: 5,
    margin: 5,
    alignItems: 'center',
    width: 150
  },
  mesasButtonText:{
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16
  },
  layoutAreas: {
    flex:0.2,
  }
})