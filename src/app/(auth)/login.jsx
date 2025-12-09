import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

import Numpad from "../../components/numpad";

import Logo from "../../../assets/crovrestaurante.png";

const login = () => {
    const [numeroEmpleado, setNumeroEmpleado] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex:0.6, alignItems: 'center'}}>
        <Image source={Logo} />
        <Text style={styles.title}>Autenticación</Text>
        <TextInput
          placeholder="Numero de empleado"
          editable={false}
          style={styles.input}
          value={numeroEmpleado}
        />
      </View>
      <View style={{flex:0.4}}>
        <Numpad numeroEmpleado={numeroEmpleado} setNumeroEmpleado={setNumeroEmpleado} />
      </View>
    </SafeAreaView>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#2596be",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 5,
    width: "80%",
    textAlign: "center",
  },
});
