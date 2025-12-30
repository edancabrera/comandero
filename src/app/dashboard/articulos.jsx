import { StyleSheet, Text, View, TextInput, FlatList, Pressable } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect, useMemo } from 'react';
import { buildApiUrl } from '../../utils/apiConfig';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Articulos = () => {
  const [search, setSearch] = useState("");
  const [platillos, setPlatillos] = useState([]);

  const obtenerPrecioProductos = async () => {
      try {
        const url = await buildApiUrl('/precios');
        const response = await fetch(url);
        if(!response.ok){
          throw new Error ('Error en la respuesta del servidor');
        }
        const data = await response.json();
        setPlatillos(data);
      } catch (error) {
        console.error('Error al obtener la lista de precios', error)
      }
    }

  useEffect( () => {
    obtenerPrecioProductos();
  }, [])

  const filteredProducts = useMemo(() => {
  return platillos.filter((producto) =>
    producto.nombre.toLowerCase().includes(search.toLowerCase())
  );
}, [platillos, search]);

  return (
    <SafeAreaView 
      style={styles.container}
      edges={["left", "right", "bottom"]}
    >

      {/* Barra de búsqueda  y botón para borrar*/}
      <View style={{flexDirection: 'row', width: '80%', alignSelf:'center', paddingTop: 10}}>
        <TextInput 
          placeholder='Buscar'
          placeholderTextColor="#ccc"
          style={styles.searchBar}
          value={search}
          onChangeText={setSearch}
        />
        <Pressable onPress={()=>setSearch('')} >
          <MaterialIcons name="cleaning-services" size={24} color="#fff" style={{margin:10}}  />
        </Pressable>
      </View>

      {/* Header de la tabla */}
      <View style={styles.header}>
        <Text style={[styles.headerText, {flex:2}]}>Platillo/Bebida</Text>
        <Text style={[styles.headerText]}>Precio</Text>
      </View>

      {/* Tabla */}
      <FlatList 
        data={filteredProducts}
        keyExtractor={(item) => item.idProducto.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={[styles.cell, {flex: 2}]} >{item.nombre}</Text>
            <Text style={[styles.cell]} >${item.precio1}</Text>
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
    flex: 1
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