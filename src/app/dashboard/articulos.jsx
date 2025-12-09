import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";

import productos from '../../data/productos.json'

const Articulos = () => {
  return (
    <SafeAreaView style={styles.container}>

      {/* Barra de búsqueda */}
      <TextInput 
        placeholder='Buscar'
        placeholderTextColor="#ccc"
        style={styles.searchBar}
      />

      {/* Header de la tabla */}
      <View style={styles.header}>
        <Text style={[styles.headerText, {flex:2}]}>Platillo/Bebida</Text>
        <Text style={[styles.headerText]}>Precio</Text>
      </View>

      {/* Tabla */}
      <FlatList 
        data={productos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={[styles.cell, {flex: 2}]} >{item.nombre}</Text>
            <Text style={[styles.cell]} >${item.precio}</Text>
          </View>
        )}
      />

    </SafeAreaView>
  )
}

export default Articulos

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2596be"
  },
  searchBar: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    width: '80%',
    alignSelf: 'center'
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderColor: "#ffffff88",
    marginBottom:6,
    width: '80%',
    alignSelf: 'center'
  },
  headerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  row: {
    flexDirection: "row",
    backgroundColor: "#faa80f",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 8,
    width: '80%',
    alignSelf: 'center'
  },
  cell: {
    fontSize: 15,
    color: "black",
  }
})