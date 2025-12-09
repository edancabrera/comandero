import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";

const Articulos = () => {
  const productos = [
    { id: "1", clave: "A001", nombre: "Coca-Cola 600ml", precio: 18 },
    { id: "2", clave: "A002", nombre: "Pepsi 600ml", precio: 17 },
    { id: "3", clave: "B055", nombre: "Agua Ciel 1L", precio: 14 },
    { id: "4", clave: "M020", nombre: "Jugo Del Valle", precio: 22 },
  ];

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
          <View>
            <Text >{item.nombre}</Text>
            <Text>${item.precio}</Text>
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
    fontSize: 16
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderColor: "#ffffff88",
    marginBottom:6,
  },
  headerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  }
})