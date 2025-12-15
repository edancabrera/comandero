import { useComandero } from "../../context/ComanderoContext";

import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";

const ListaPlatillos = () => {
  const { categoriaSeleccionada, agregarPlatillo } = useComandero();

  return (
    <ScrollView stickyHeaderIndices={[0]}>
      {categoriaSeleccionada && (<View><Text style={{ backgroundColor: "#2596be", fontWeight: 'bold' }}>Platillos - {categoriaSeleccionada.nombre}</Text></View>)}
      <View style={styles.container}>
        {categoriaSeleccionada === null ? (
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}><Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18}}>Selecciona una categoría</Text></View>
        ) : (
          <View style={styles.container}>
            {categoriaSeleccionada.producto.map((platillo) => (
              <Pressable 
                key={platillo.idproducto}
                style={styles.platilloButton}
                onPress={()=> agregarPlatillo(platillo)}
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
    width: 145,
  },
  platilloButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
