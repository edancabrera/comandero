import { StyleSheet, Text, View, Image, TextInput, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";

import { useLogin } from "../../context/LoginContext";

import Numpad from "../../components/loginComponents/numpad";
import ModalConfiguracionDeIP from "../../components/loginComponents/modalConfiguracionDeIP";
import { getServerIp, clearIp } from "../../utils/apiConfig";

import Logo from "../../../assets/crovrestaurante.png";

const login = () => {
    const { numeroEmpleado } = useLogin();
    const [modalConfiguracionDeIPVisible, setModalConfiguracionDeIPVisible] = useState(false);
    const [serverIp, setServerIp] = useState(null);

    const obtenerIp = async () => {
        const ip = await getServerIp();
        setServerIp(ip)
      }
    useEffect(() => {
      obtenerIp();
    }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ModalConfiguracionDeIP modalConfiguracionDeIPVisible = {modalConfiguracionDeIPVisible }setModalConfiguracionDeIPVisible = {setModalConfiguracionDeIPVisible}
      onIpSaved = {obtenerIp}
      />
      <View style={{flex:0.6, alignItems: 'center'}}>
        <Image source={Logo} />
        <Text style={styles.title}>Autenticación</Text>
        <TextInput
          secureTextEntry={true}
          placeholder="Numero de empleado"
          editable={false}
          style={styles.input}
          value={numeroEmpleado}
        />
        {serverIp ? <Text>Conectado al servidor con la IP: {serverIp}</Text>: <Text>No se ha configurado la IP</Text>}
        {serverIp ? 
          <Pressable 
            style = {styles.configButton}
            onPress={() => {
              setModalConfiguracionDeIPVisible(true)
            }}
          >
            <Text style = {styles.configButtonText}>
              Probar conexión
            </Text>
        </Pressable> :
        <Pressable 
          style = {styles.configButton}
          onPress={() => {
            setModalConfiguracionDeIPVisible(true)
          }}
        >
          <Text style = {styles.configButtonText}>
            Configurar IP
          </Text>
        </Pressable>
        }
        <Pressable 
          style = {styles.configButton}
          onPress={() => {clearIp(); setServerIp(null)}}
        >
          <Text style = {styles.configButtonText}>
            Borrar IP
          </Text>
        </Pressable>
      </View>
      <View style={{flex:0.4}}>
        <Numpad />
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
  configButton: {
    backgroundColor: '#faa80f',
    borderRadius: 5,
    padding: 15,
    marginTop: 10
  },
  configButtonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});
