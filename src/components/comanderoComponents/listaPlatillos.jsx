import { useEffect, useState } from "react";
import { useComandero } from "../../context/ComanderoContext";

import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import { buildApiUrl } from "../../utils/apiConfig";

const ListaPlatillos = () => {
  const [platillos, setPlatillos] = useState([]);

  const { categoriaSeleccionada, agregarPlatillo } = useComandero();

  const obtenerPlatillos = async () => {
    try {
      const url = await buildApiUrl(`/platillos/${categoriaSeleccionada?.id}`);
      const response = await fetch(url);
      if(!response.ok){
        throw new Error ('Error en la respuesta  servidor');
      }
      const data = await response.json();
      setPlatillos(data);

    } catch (error) {
      console.error('Error al obtener los platillos', error)
    }
  }

  useEffect(() => {
    if(!categoriaSeleccionada) return;
    obtenerPlatillos();
  }, [categoriaSeleccionada])

  return (
    <ScrollView stickyHeaderIndices={[0]}>
      {categoriaSeleccionada && (<View><Text style={{ backgroundColor: "#2596be", fontWeight: 'bold' }}>Platillos - {categoriaSeleccionada?.nombre}</Text></View>)}
      <View style={styles.container}>
        {categoriaSeleccionada === null ? (
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}><Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18}}>Selecciona una categoría</Text></View>
        ) : (
          <View style={styles.container}>
            {platillos.map((platillo) => (
              <Pressable 
                key={platillo.idProducto}
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
