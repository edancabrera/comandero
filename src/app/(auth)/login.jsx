import { StyleSheet, Text, View, Image, TextInput, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useState } from "react";
import { useRouter } from "expo-router";
import { useLogin } from "../../context/LoginContext";
import { useComandero } from "../../context/ComanderoContext";
import { useUI, MODALS } from "../../context/UIContext";

import Numpad from "../../components/loginComponents/numpad";
import ModalConfiguracionDeIP from "../../components/loginComponents/modalConfiguracionDeIP";
import ModalLoginError from "../../components/loginComponents/modalLoginError";

import Logo from "../../../assets/crovrestaurante.png";
import { checkServer, loginRequest } from "../../services/authService";

const login = () => {

    const router = useRouter();
    const { serverIp, clearServerIp } = useLogin();
    const { setUsuario } = useComandero();
    const { openModal } = useUI();

    const [numeroEmpleado, setNumeroEmpleado] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState (null);
    

    const handleLogin = async () => {
      if(loading) return;

      if(!serverIp){
        setError({title:"No se ha configurado la IP", message:"Por favor, configura la IP"});
        openModal(MODALS.LOGIN_ERROR);
        return;
      }

      if(numeroEmpleado.length !== 6){
        setError({title:"Error de formato", message:"La clave debe tener exactamente 6 caracteres"});
        openModal(MODALS.LOGIN_ERROR);
        return;
      }

      try {
        setLoading(true);

        const data = await loginRequest(numeroEmpleado);

        setUsuario(data);
        setNumeroEmpleado("");
        router.replace('/dashboard');
        
      } catch (error) {
        let title = "Error";
        let message = error.message;

        switch (error.type) {
          case "NETWORK_ERROR":
            title = "Servidor no disponible";            
            break;
        
          case "TIMEOUT":
            title = "Tiempo de espera agotado"
            break;
          
          case "SERVER_ERROR":
            title = "Error del servidor"
            break;
        }

        setError({ title, message});
        openModal(MODALS.LOGIN_ERROR);
        setNumeroEmpleado("");
      } finally {
        setLoading(false);
      }
    }

  return (
    <SafeAreaView style={styles.container}>
      <ModalConfiguracionDeIP />
      <ModalLoginError error={error}/>
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
        {serverIp ? (
          <Text style = {{color: '#fff'}}>Configurado con la IP: {serverIp}</Text>
          ) : (
          <Text style = {{color: '#fff'}}>No se ha configurado la IP</Text>
        )}
          <Pressable 
            style = {[
              styles.configButton,
              loading && { opacity: 0.6 }
            ]}
            onPress={() => {
              if(loading) return;
              openModal(MODALS.CONFIG_IP);
            }}
          >
            <Text style = {styles.configButtonText}>
              { serverIp ? 'Probar conexión' : 'Configurar IP' } 
            </Text>
        </Pressable>

        <Pressable 
          style = {styles.configButton}
          onPress={clearServerIp}
        >
          <Text style = {styles.configButtonText}>
            Borrar IP
          </Text>
        </Pressable>
      </View>
      <View style={{flex:0.4}}>
        <Numpad
          value={numeroEmpleado}
          onAppend={(d) => {
            if (numeroEmpleado.length >= 6) return;
            setNumeroEmpleado(prev => prev + d)
          }}
          onBackspace={() => setNumeroEmpleado(prev => prev.slice(0, -1))}
  onClear={() => setNumeroEmpleado("")}
          onSubmit={handleLogin}
          loading={loading}
        />
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
