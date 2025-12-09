import { StyleSheet, Text, View, TextInput } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";

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