import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import { useComandero } from "../../../context/ComanderoContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";

const Pedido = () => {
  const { pedido } = useComandero();
  return (
    <View style={{flex:1}}>
      {/* Tabla */}
      <View style={{flex:1, backgroundColor: '#fff'}}>
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

      <View style={{flex:1}}>
        {/* Botones*/}
        <View style={{ flexDirection: "row", justifyContent: 'space-around' }}>
          <Pressable>
            <Ionicons name="trash-outline" size={24} color="black" />
          </Pressable>
          <Pressable>
            <MaterialCommunityIcons
              name="food-variant"
              size={24}
              color="black"
            />
          </Pressable>
          <Pressable>
            <Feather name="user-plus" size={24} color="black" />
          </Pressable>
          <Pressable>
            <AntDesign name="close" size={24} color="black" />
          </Pressable>
        </View>

        {/* Input para comentarios */}
        <View>
          <Text style={{ fontWeight: "bold" }}>Comentarios</Text>
          <TextInput style={styles.inputComentarios} />
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Pressable style={{ flexDirection: "row" }}>
              <Feather name="plus" size={24} color="green" />
              <Text>Agregar</Text>
            </Pressable>
            <Pressable style={{ flexDirection: "row" }}>
              <AntDesign name="close-circle" size={24} color="red" />
              <Text>Borrar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Pedido;

const styles = StyleSheet.create({
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderColor: "#00000088",
    paddingVertical: 5,
    backgroundColor: "#fff",
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
  inputComentarios: {
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 5,
  },
});
