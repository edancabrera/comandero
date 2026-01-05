import { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, Modal, TextInput, Pressable, ActivityIndicator } from "react-native";
import { useLogin } from "../../context/LoginContext";

import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

const ModalConfiguracionDeIP = () => {
    const {modalConfiguracionDeIPVisible, setModalConfiguracionDeIPVisible, serverIp, saveIp} = useLogin();
    const [ip, setIp] = useState("");
    const [status, setStatus] = useState("");
    const [error, setError] = useState("");
    const abortControllerRef = useRef(null);

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

            const url = `http://${ip}:8080/ping`;

            abortControllerRef.current = new AbortController();

            const response = await fetch(url, {
              signal: abortControllerRef.current.signal
            });
            const data = await response.json();

            if(response.ok) {
              await saveIp(ip);
              setStatus(data.message);
              setTimeout(() => {
                setModalConfiguracionDeIPVisible(false);
            }, 1000);
            }
        } catch (error) {
          if(error.name === "AbortError"){
            setStatus("Prueba de conexión cancelada")
          } else {
            setStatus("Error de conexión");
            setError("Verifica la IP");
          }
        } finally {
          abortControllerRef.current = null;
        }
    }

    const cancelRequest = () => {
      if (abortControllerRef.current){
        abortControllerRef.current.abort();
      }
    }

    useEffect( () => {
        if (modalConfiguracionDeIPVisible) {
          setIp(serverIp ?? "");
        }
    }, [modalConfiguracionDeIPVisible]);

  return (
    <Modal 
        animationType="slide" 
        transparent={true} 
        visible={modalConfiguracionDeIPVisible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
            <Pressable 
                onPress={()=>{
                  cancelRequest();
                  setModalConfiguracionDeIPVisible(false);
                  setStatus("");
                  setError("");
                }}
                style={{ position: 'absolute', top: 5, right: 10}}
            >
                <Ionicons name="close" size={36} color="red" />
            </Pressable>
            {error ? <MaterialIcons name="error-outline" size={48} color="red" />: null}
            {status === "Probando conexión..." ? <ActivityIndicator size="large"/> : null}
            {status === "Conexión exitosa con la API" ? <AntDesign name="check-circle" size={36} color="green" /> : null}
          <TextInput 
            style={styles.input}
            placeholder="Ingresa la IP del servidor"
            value={ip}
            onChangeText={setIp}
            editable={status=== "Probando conexión..." ? false: true}
          />
          {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
          {status === "Probando conexión..." ?
            <Pressable 
              style={[styles.testButton, {backgroundColor: 'grey'}]}
              onPress={cancelRequest}
            >
              <Text style={styles.testButtonText}>
                  Cancelar
              </Text>
            </Pressable>:
            <Pressable 
              style={[styles.testButton, ip ? {} : { backgroundColor: 'grey' }]}
              onPress={testApiConnection}
              disabled={!ip}
            >
              <Text style={styles.testButtonText}>
                Probar conexión
              </Text>
            </Pressable>
          }
          <Text>
            {status}
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
