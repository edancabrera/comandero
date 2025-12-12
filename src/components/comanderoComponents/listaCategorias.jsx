import { useComandero } from "../../context/ComanderoContext";

import { StyleSheet, Text, View, Pressable } from "react-native";

import categoria_platillo from '../../data/categoria_platillo.json'

const ListaCategorias = () => {
  const { menuSeleccionado } = useComandero();

  // Filtrar categorías según el menú seleccionado
  const categoriasFiltradas = menuSeleccionado
    ? categoria_platillo.filter(
        (categoria) => categoria.menu === menuSeleccionado
      )
    : [];

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.5 }}>
        {categoriasFiltradas.map((categoria) => (
          <Pressable key={categoria.id} style={{ padding: 10 }}>
            <Text>{categoria.nombre}</Text>
          </Pressable>
        ))}
      </View>
      <View style={{ flex: 0.5, backgroundColor: "purple" }}>
        <Text style={{ color: "#fff" }}>Area para mostar los platillos</Text>
      </View>
    </View>
  );
};

export default ListaCategorias;

const styles = StyleSheet.create({});
