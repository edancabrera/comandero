import { StyleSheet, Text, View} from "react-native";

const Pedido = () => {
  return (
    <View style={styles.tableHeader}>
      <Text style={styles.tableHeaderText}>Persona</Text>
      <Text style={styles.tableHeaderText}>Platillo</Text>
      <Text style={styles.tableHeaderText}>Cantidad</Text>
      <Text style={styles.tableHeaderText}>Comentarios</Text>
    </View>
  );
};

export default Pedido;

const styles = StyleSheet.create({
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 5,
    borderBottomWidth: 2,
    borderColor: "#ffffff88",
    marginBottom:6,
  },
  tableHeaderText: {
    fontSize: 12,
    fontWeight: 'bold'
  },
});
