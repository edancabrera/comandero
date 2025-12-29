import { useState } from "react";
import { StyleSheet, Text, View, Modal, TextInput, Pressable } from "react-native";
import { saveServerIp, buildApiUrl } from "../../utils/apiConfig";

import Ionicons from '@expo/vector-icons/Ionicons';

const ModalConfiguracionDeIP = ({modalConfiguracionDeIPVisible, setModalConfiguracionDeIPVisible}) => {
    const [ip, setIp] = useState("");
    const [status, setStatus] = useState("");
    const [error, setError] = useState("");

    const testApiConnection = async () => {
        try {
            setError("");
            setStatus("Probando conexión...");

            //Validación de formato de IP
            const ipRegex = /^(?:\d{1,3}\.){3}\d{1,3}$/;
            if(!ipRegex.test(ip)) {
                setError("Formato de IP inválido");
                setStatus("");
                return;
            }

            await saveServerIp(ip);

            const url = await buildApiUrl("/ping");

            const response = await fetch(url);
            const data = await response.json();

            if(response.ok) {
                setStatus(data.message);
            } else {
                setStatus("No se pudo conectar");
            }
        } catch (error) {
            setStatus("Error de conexión");
        }
    }
  return (
    <Modal 
        animationType="slide" 
        transparent={true} 
        visible={modalConfiguracionDeIPVisible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
            <Pressable 
                onPress={()=>setModalConfiguracionDeIPVisible(false)}
                style={{ position: 'absolute', top: 5, right: 10}}
            >
                <Ionicons name="close" size={36} color="red" />
            </Pressable>
          <TextInput 
            style={styles.input}
            placeholder="Ingresa la IP del servidor"
            value={ip}
            onChangeText={setIp}
          />
          {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
          <Pressable 
            style={styles.testButton}
            onPress={testApiConnection}
        >
            <Text style={styles.testButtonText}>
                Probar conexión
            </Text>
          </Pressable>
          <Text>
            Estado de la conexión: {status}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default ModalConfiguracionDeIP;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "50%",
  },
  input: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 5,
    borderWidth: 1,
    width: "80%",
    textAlign: "center",
  },
  testButton: {
    backgroundColor: '#2dbd4f',
    borderRadius: 5,
    padding: 15,
    marginVertical: 10
  },
  testButtonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});
