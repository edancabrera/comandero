import { StyleSheet, Text, View, ScrollView} from "react-native";
import { useComandero } from "../../../context/ComanderoContext";

const Pedido = () => {
  const {pedido} = useComandero();
  return (
    <View>
      {/* Encabezado */}
      <View style={styles.tableHeader}>
        <Text style={styles.colPersona}>Persona</Text>
        <Text style={styles.colPlatillo}>Platillo</Text>
        <Text style={styles.colCantidad}>Cant.</Text>
        <Text style={styles.colComentarios}>Comentarios</Text>
      </View>

      {/* Filas */}
      <ScrollView>
      {pedido?.map((item, index) => (
        <View key={index} style={styles.tableRow}>
          <Text style={styles.colPersona}>{item.persona}</Text>
          <Text style={styles.colPlatillo}>{item.nombre}</Text>
          <Text style={styles.colCantidad}>{item.cantidad}</Text>
          <Text style={styles.colComentarios}>{item.comentarios}</Text>
        </View>
      ))}
      </ScrollView>
    </View>
  );
};

export default Pedido;

const styles = StyleSheet.create({
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderColor: "#ffffff88",
    paddingVertical: 5,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 4,
  },
  colPersona: {
    width: 60,
    fontWeight: "bold",
  },
  colPlatillo: {
    flex: 1,
  },
  colCantidad: {
    width: 50,
    textAlign: "center",
  },
  colComentarios: {
    flex: 1,
    color: "#aaa",
  },
});

