import { useEffect, useState } from "react";
import { useComandero } from "../../context/ComanderoContext";

import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";

import { buildApiUrl } from "../../utils/apiConfig";

const ListaCategorias = () => {
  const [categorias, setCategorias] = useState([]);

  const { menuSeleccionado, seleccionarCategoria } = useComandero();

  const Obtenercategorias = async () => {
    try {
      const url = await buildApiUrl(`/categoria-platillo/${menuSeleccionado}`);
      const response = await fetch(url);
      if(!response.ok){
        throw new Error ('Error en la respuesta  servidor');
      }
      const data = await response.json();
      setCategorias(data);
    } catch (error) {
      console.error('Error al obtener categorías', error)
    }
  }

  useEffect(()=>{
    Obtenercategorias();
  }, [menuSeleccionado]);

  return (
    <ScrollView stickyHeaderIndices={[0]} >
      <View><Text style={{backgroundColor: "#2596be", fontWeight: 'bold'}}>Clasificación de platillos - {menuSeleccionado.menu}</Text></View>
      <View style={styles.container}>
        {categorias.map((categoria) => (
          <Pressable 
            key={categoria.id} 
            style={styles.categoriaButton}
            onPress={()=> seleccionarCategoria(categoria)}
          >
            <Text style={styles.categoriaButtonText}>{categoria.nombre}</Text>
          </Pressable>
        ))}

      </View>
    </ScrollView>
  );
};

export default ListaCategorias;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  categoriaButton: {
    backgroundColor: "#faa80f",
    padding: 20,
    borderRadius: 5,
    margin: 5,
    alignItems: "center",
    width: 145
  },
  categoriaButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
