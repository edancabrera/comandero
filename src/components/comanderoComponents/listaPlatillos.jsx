import { useComandero } from "../../context/ComanderoContext";

import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";

const ListaPlatillos = () => {
  const { categoriaSeleccionada } = useComandero();

  return (
    <ScrollView stickyHeaderIndices={[0]}>
      <Text style={{ backgroundColor: "#2596be" }}>Platillos</Text>
      <View style={styles.container}>
        {categoriaSeleccionada === null ? (
          <Text>Selecciona una categoría</Text>
        ) : (
          <View style={styles.container}>
            {categoriaSeleccionada.producto.map((platillo) => (
              <Pressable 
                key={platillo.idproducto}
                style={styles.platilloButton}
            >
                <Text style={styles.platilloButtonText}>{platillo.nombre}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default ListaPlatillos;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  platilloButton: {
    backgroundColor: "#faa80f",
    padding: 20,
    borderRadius: 5,
    margin: 5,
    alignItems: "center",
    width: 150,
  },
  platilloButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
