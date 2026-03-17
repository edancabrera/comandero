import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import { useComandero } from "../context/ComanderoContext";
import { useEffect, useState } from "react";

const ModalDividirComanda = () => {
  const { 
    modalDividirComandaVisible, 
    setModalDividirComandaVisible,
    mesaSeleccionada,
    obtenerComandaMesa,
    pedido, setPedido,
  } = useComandero();

  const [nuevoPedido, setNuevoPedido] = useState([]);
  const [comandaActualLineaSeleccionada, setComandaActualLineaSeleccionada] = useState(null);
  const [comandaNuevaLineaSeleccionada, setComandaNuevaLineaSeleccionada] = useState(null);

  useEffect( () => {
    if(mesaSeleccionada && modalDividirComandaVisible) {
      cargarComanda();
    };
  }, [modalDividirComandaVisible]);

  useEffect(() => {
    if(!modalDividirComandaVisible){
      setPedido([]);
      setComandaActualLineaSeleccionada(null);
      setNuevoPedido([]);
    }
  }, [modalDividirComandaVisible])

  const cargarComanda = async () => {
    setPedido(await obtenerComandaMesa());
  }

  const moverANuevaComanda = () => {
    if(!comandaActualLineaSeleccionada) return;
    const item = pedido.find(p => p.idLinea === comandaActualLineaSeleccionada);
    if (!item) return;

    setPedido(prev => prev.filter((p => p.idLinea !== comandaActualLineaSeleccionada)));
    setNuevoPedido(prev => [...prev, item]);
    setComandaActualLineaSeleccionada(null);
  }

  const regresarAOriginal = () => {
    if(!comandaNuevaLineaSeleccionada) return;
    const item = nuevoPedido.find(p => p.idLinea === comandaNuevaLineaSeleccionada);
    if(!item) return;

    setNuevoPedido(prev => prev.filter(p => p.idLinea !== comandaNuevaLineaSeleccionada));
    setPedido(prev => [...prev, item]);
    setComandaNuevaLineaSeleccionada(null);


  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalDividirComandaVisible}
      //onRequestClose={() => setModalDividirComandaVisible(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style ={styles.title}>Dividir Comanda - {mesaSeleccionada?.nombre}</Text>
        

          <View style={styles.tablesContainer}>
            
            
            <View style={styles.table}>
              <Text style={styles.tableTitle}>Comanda Actual</Text>
              <View style={styles.tableHeader}>
                <Text style={styles.colPersona}>Persona</Text>
                <Text style={styles.colPlatillo}>Platillo</Text>
                <Text style={styles.colCantidad}>Cant.</Text>
              </View>
              <ScrollView>
                {pedido.sort((a,b) => a.persona - b.persona)?.map(item => (
                  <Pressable
                    key={item.idLinea}
                    style={[
                      styles.tableRow,
                      item.idLinea === comandaActualLineaSeleccionada && styles.rowSelected
                    ]}
                    onPress={() => setComandaActualLineaSeleccionada(item.idLinea)}
                  >
                    <Text style={styles.colPersona}>{item.persona}</Text>
                    <Text style={styles.colPlatillo}>{item.nombre}</Text>
                    <Text style={styles.colCantidad}>{item.cantidad}</Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>

            <View style={styles.actionButtonsContainer}>
              <Pressable 
                style={({pressed}) => [
                  styles.actionButton,
                  pressed && styles.buttonPressed
                ]}
                onPress={moverANuevaComanda}
              >
                <Text>→</Text>
              </Pressable>

              <Pressable 
                style={({pressed}) => [
                  styles.actionButton,
                  pressed && styles.buttonPressed
                ]}
                onPress={regresarAOriginal}
              >
                <Text>←</Text>
              </Pressable>
            </View>

            <View style={styles.table}>
              <Text style={styles.tableTitle}>Nueva comanda</Text>
              <View style={styles.tableHeader}>
                <Text style={styles.colPersona}>Persona</Text>
                <Text style={styles.colPlatillo}>Platillo</Text>
                <Text style={styles.colCantidad}>Cant.</Text>
              </View>
              <ScrollView>
                {nuevoPedido.sort((a,b) => a.persona - b.persona)?.map(item => (
                  <Pressable
                    key={item.idLinea}
                    style={[
                      styles.tableRow,
                      item.idLinea === comandaNuevaLineaSeleccionada && styles.rowSelected
                    ]}
                    onPress={() => setComandaNuevaLineaSeleccionada(item.idLinea)}
                  >
                    <Text style={styles.colPersona}>{item.persona}</Text>
                    <Text style={styles.colPlatillo}>{item.nombre}</Text>
                    <Text style={styles.colCantidad}>{item.cantidad}</Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>

          </View>

          <View style={styles.buttonsContainer}>
            <Pressable
              style={({pressed}) => [
                styles.button,
                pressed && styles.buttonPressed
              ]}
              onPress={() => {
                setModalDividirComandaVisible(false);
              }}
            >
              <Text>Cancelar</Text>
            </Pressable>

            <Pressable 
              style={({pressed}) => [
                styles.button,
                pressed && styles.buttonPressed
              ]}
            >
              <Text>Guardar</Text>
            </Pressable>

            <Pressable 
              style={({pressed}) => [
                styles.button,
                pressed && styles.buttonPressed
              ]}
            >
              <Text>Imprimir</Text>
            </Pressable>
          </View>

        </View>
      </View>
    </Modal>
  );
};

export default ModalDividirComanda;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: "98%",
    height: "90%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title:{
    backgroundColor: '#faa80f',
    textAlign:'center',
    fontWeight: 'bold',
    fontSize: 16
  },
  tablesContainer: {
    flexDirection: "row",
    flex: 1,
    gap: 5
  },
  tableTitle:{
    backgroundColor: '#fff',
    textAlign:'center',
    fontWeight: 'bold',
    fontSize: 10
  },
  table: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 10,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderColor: "#00000088",
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: "#fff",
    alignContent: "space-evenly",
  },
  tableRow:{
    flexDirection: 'row',
    paddingVertical: 4,
    borderBottomWidth: .5,
    borderColor: "#00000088",
  },
  rowSelected: {
    backgroundColor: "#e0f2ff"
  },
  colPersona: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
  },
  colPlatillo: {
    flex: 2,
    textAlign: "center",
    fontWeight: "bold",
  },
  colCantidad: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
  },
  actionButtonsContainer:{
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5
  },
  actionButton:{
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 6,
    margin: 10,
    alignItems: "center",
    width: 40,
  },
  buttonsContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
      backgroundColor: "#f5f5f5",
      padding: 20,
      borderRadius: 5,
      margin: 5,
      alignItems: "center",
      width: 145,
    },
  buttonPressed: {
    backgroundColor: "#e0e0e0"
  }
});
