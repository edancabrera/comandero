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
          <View>
            {categoriaSeleccionada.producto.map((platillo) => (
              <Pressable key={platillo.idproducto}>
                <Text>{platillo.nombre}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default ListaPlatillos;

const styles = StyleSheet.create({});
