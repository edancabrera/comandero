import { useComandero } from "../../context/ComanderoContext";

import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";

import categoria_platillo from "../../data/categoria_platillo.json";

const ListaCategorias = () => {
  const { menuSeleccionado, seleccionarCategoria } = useComandero();

  // Filtrar categorías según el menú seleccionado
  const categoriasFiltradas = menuSeleccionado
    ? categoria_platillo.filter(
        (categoria) => categoria.menu === menuSeleccionado
      )
    : [];

  return (
    <ScrollView stickyHeaderIndices={[0]} >
      <View><Text style={{backgroundColor: "#2596be", fontWeight: 'bold'}}>Clasificación de platillos</Text></View>
      <View style={styles.container}>
        {categoriasFiltradas.map((categoria) => (
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
