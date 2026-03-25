import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import { useComandero } from "../context/ComanderoContext";
import { useUI, MODALS } from "../context/UIContext";
import { useEffect, useState } from "react";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { buildApiUrl } from "../utils/apiConfig";
import ModalAccionesDividirComanda from "./modalAccionesDividirComanda";

const ModalDividirComanda = () => {
  const { 
    mesaSeleccionada, areaSeleccionada,
    obtenerComandaMesa,
    usuario
  } = useComandero();

  const { modals, closeModal } = useUI();

  const [pedido, setPedido] = useState([]);
  const [nuevoPedido, setNuevoPedido] = useState([]);
  const [comandaActualLineaSeleccionada, setComandaActualLineaSeleccionada] = useState(null);
  const [comandaNuevaLineaSeleccionada, setComandaNuevaLineaSeleccionada] = useState(null);
  const [comandasDivididas, setComandasDivididas] = useState([]);

  const [modalCancelar, setModalCancelar] = useState(false);
  const [modalImprimir, setModalImprimir] = useState(false);
  const [modalCuentaDivididaExitosamente, setModalCuentaDivididaExitosamente] = useState(false);
  const [modalGuardar, setModalGuardar] = useState(false);
  const [modalCuentasGuardadasExitosamente, setModalCuentasGuardadasExitosamente] = useState(false);

  useEffect( () => {
    if(mesaSeleccionada && modals[MODALS.DIVIDIR_COMANDA]) {
      cargarComanda();
    };
  }, [modals[MODALS.DIVIDIR_COMANDA]]);

  useEffect(() => {
    if(!modals[MODALS.DIVIDIR_COMANDA]){
      setPedido([]);
      setComandaActualLineaSeleccionada(null);
      setNuevoPedido([]);
    }
  }, [modals[MODALS.DIVIDIR_COMANDA]])

  const cargarComanda = async () => {
    setPedido(await obtenerComandaMesa());
  }

  const moverCompletoANuevaComanda = () => {
    if(!comandaActualLineaSeleccionada) return;
    const item = pedido.find(p => p.idLinea === comandaActualLineaSeleccionada);
    if (!item) return;

    setPedido(prev => prev.filter((p => p.idLinea !== comandaActualLineaSeleccionada)));

    setNuevoPedido(prev => {
      const existe = prev.find(p => p.idLinea === comandaActualLineaSeleccionada);

      if (existe) {
        return prev.map(p =>
          p.idLinea === comandaActualLineaSeleccionada
          ? { ...p, cantidad: p.cantidad + item.cantidad }
          : p
        );
      } else {
        return [...prev, {...item}];
      }
    });
    setComandaNuevaLineaSeleccionada(comandaActualLineaSeleccionada);
    setComandaActualLineaSeleccionada(null);
  }

  const regresarCompletoAOriginal = () => {
    if(!comandaNuevaLineaSeleccionada) return;
    const item = nuevoPedido.find(p => p.idLinea === comandaNuevaLineaSeleccionada);
    if(!item) return;

    setNuevoPedido(prev => prev.filter((p => p.idLinea !== comandaNuevaLineaSeleccionada)));

    setPedido(prev => {
      const existe = prev.find(p => p.idLinea === comandaNuevaLineaSeleccionada);
      if(existe){
        return prev.map(p =>
          p.idLinea === comandaNuevaLineaSeleccionada
          ? { ...p, cantidad: p.cantidad + item.cantidad }
          : p
        );
      } else {
        return [...prev, {...item}];
      }
    });

    setComandaActualLineaSeleccionada(comandaNuevaLineaSeleccionada);
    setComandaNuevaLineaSeleccionada(null);
  }

  const moverParcialmenteANuevaComanda = () => {
    if(!comandaActualLineaSeleccionada) return;

    const id = comandaActualLineaSeleccionada;
    const item = pedido.find(p => p.idLinea === id);
    if (!item || item.cantidad <= 0) return;

    const updated = pedido.map(p => 
      p.idLinea === id
      ? { ...p, cantidad: p.cantidad - 1 }
      : p
    ).filter( p => p.cantidad > 0);

    const sigueExistiendo = updated.some(p => p.idLinea === id);

    setPedido(updated);

    if(!sigueExistiendo){ setComandaActualLineaSeleccionada(null) };

    setNuevoPedido(prev => {
      const existe = prev.find(p => p.idLinea === id);
      if(existe){
        return prev.map(p => 
          p.idLinea === id
          ? {...p, cantidad: p.cantidad + 1 }
          : p
        )
      } else {
        return [...prev, {...item, cantidad: 1}];
      }
    });

    setComandaNuevaLineaSeleccionada(id)
  }

  const regresarParcialmenteAOriginal = () => {
    if(!comandaNuevaLineaSeleccionada) return;

    const id = comandaNuevaLineaSeleccionada;
    const item = nuevoPedido.find(p => p.idLinea === id);
    if(!item || item.cantidad <= 0) return;

    const updated = nuevoPedido.map(p => 
      p.idLinea === id
      ? {...p, cantidad: p.cantidad - 1 }
      : p
    ).filter(p => p.cantidad > 0);

    const sigueExistiendo = updated.some(p => p.idLinea === id);

    setNuevoPedido(updated);

    if(!sigueExistiendo){ setComandaNuevaLineaSeleccionada(null) }

    setPedido(prev => {
      const existe = prev.find(p => p.idLinea === id);
      if(existe){
        return prev.map(p => 
          p.idLinea === id
          ? {...p, cantidad: p.cantidad + 1 }
          : p
        );
      } else {
        return [...prev, {...item, cantidad: 1}];
      }
    });

    setComandaActualLineaSeleccionada(id);
  }

  const imprimirNuevaComanda = async () => {
    if(!nuevoPedido.length) return;

    try {
      const payloadTicket = {
        mesero: usuario.nombre,
        mesa: `${mesaSeleccionada.nombre} - ${areaSeleccionada.nombre}`,
        fecha: new Date().toLocaleString(),
        detalle: nuevoPedido.map(detalle => ({
          nombre: detalle.nombre,
          cantidad: detalle.cantidad,
          precioUnitario: detalle.precio,
          subtotal: detalle.cantidad * detalle.precio,
          iva: detalle.iva
        })),
        total: nuevoPedido.reduce((acc, detalle) => { 
          return acc + (detalle.cantidad * detalle.precio);
        }, 0).toFixed(2)
      }

      const url = await buildApiUrl('/ticket-cobro');
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payloadTicket)
      });

      if(!response.ok) {
        throw new Error("Error al mandar a cobrar")
      }
      setModalCuentaDivididaExitosamente(true);
      setComandasDivididas(prev => [...prev, [...nuevoPedido]]);
      setNuevoPedido([]);
      setComandaNuevaLineaSeleccionada(null);

    } catch (error) {
      console.error("Error ", error);
    }
  }

  const guardarComandasDivididas = async () => {
    if(comandasDivididas.length === 0) return; 

    const idComandaPrincipal = comandasDivididas[0][0].idComanda;

    const payload = construirPayloadComandasDivididas(comandasDivididas);

    try {
      const url = await buildApiUrl(`/comanda/${idComandaPrincipal}/guardar-divididos`);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if(!response.ok) {
        throw new Error(`Error al guardar comandas divididas de la comanda principal ${idComandaPrincipal}`);
      }
      
      setModalCuentasGuardadasExitosamente(true);
      setComandasDivididas([]);
    } catch (error) {
      console.error("Error ", error);
    }
  }

  const construirPayloadComandasDivididas = (comandas) => {
    const { id: idMesa } = mesaSeleccionada;
    const { idu: idMesero } = usuario;

    return comandas.map(comanda =>(
      {
        idMesa,
        idMesero,
        detalles: comanda.map(c => ({
          idPlatillo: c.idPlatillo,
          cantidad: c.cantidad,
          persona: c.persona,
          comentarios: c.comentarios
        }))
      }));
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modals[MODALS.DIVIDIR_COMANDA]}
      //onRequestClose={() => setModalDividirComandaVisible(false)}
    >
      <ModalAccionesDividirComanda 
        title="Advertencia"
        paragraph="Se perderán todas las modificaciones, ¿Aún así desea cancelar?"
        action={() => closeModal(MODALS.DIVIDIR_COMANDA)}
        visiblity={modalCancelar}
        setVisiblity={setModalCancelar}
        alert = {true}
      />

      <ModalAccionesDividirComanda 
        title={nuevoPedido.length !== 0 ? "Confirmar" : "Error"}
        paragraph={nuevoPedido.length !== 0 ? "¿Está seguro de las modificaciones?" : "Debe agregar al menos un producto a la nueva comanda"}
        action={() => { if (nuevoPedido.length !== 0) { imprimirNuevaComanda()}}}
        visiblity={modalImprimir}
        setVisiblity={setModalImprimir}
        infoOnlyModal={nuevoPedido.length !== 0 ? false : true}
        alert={nuevoPedido.length === 0}
        question={nuevoPedido.length !== 0}
      />

      <ModalAccionesDividirComanda 
        title={"Cuenta impresa"}
        paragraph={"Cuenta separada correctamente"}
        visiblity={modalCuentaDivididaExitosamente}
        setVisiblity={setModalCuentaDivididaExitosamente}
        infoOnlyModal={true}
        successfull={true}
        titleColor="green"
      />

      <ModalAccionesDividirComanda 
        title={( 
          pedido.length !== 0 || nuevoPedido.length !== 0 || comandasDivididas.length === 0)
            ? "Error"
            : "Confirmar"
          }
        paragraph={
          pedido.length !== 0
            ? "Debe modificar completamente la comanda original para guardar"
            : nuevoPedido.length !== 0
            ? "Debe mandar a imprimir todas las comandas nuevas para guardar"
            : comandasDivididas.length === 0
            ? "No hay comandas nuevas que guardar"
            : "¿Desea guardar las comandas separadas?"
        }
        action={() => {
          if (pedido.length === 0 && nuevoPedido.length === 0) {
            guardarComandasDivididas();
          } 
        }}
        visiblity={modalGuardar}
        setVisiblity={setModalGuardar}
        infoOnlyModal={pedido.length !== 0 || nuevoPedido.length !== 0 || comandasDivididas.length === 0}
        alert={pedido.length !== 0 || nuevoPedido.length !== 0 || comandasDivididas.length === 0}
        question={pedido.length === 0 && nuevoPedido.length === 0 && comandasDivididas.length !== 0}
      />

      <ModalAccionesDividirComanda 
        title={"Cuenta dividida"}
        paragraph={"Cuenta separada correctamente"}
        action={() => closeModal(MODALS.DIVIDIR_COMANDA)}
        visiblity={modalCuentasGuardadasExitosamente}
        setVisiblity={setModalCuentasGuardadasExitosamente}
        infoOnlyModal={true}
        infoAndActionModal={true}
        successfull={true}
        titleColor="green"
      />

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
                {[...pedido].sort((a,b) => a.persona - b.persona)?.map(item => (
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
                onPress={moverParcialmenteANuevaComanda}
              >
                <Text>→</Text>
              </Pressable>

              <Pressable 
                style={({pressed}) => [
                  styles.actionButton,
                  pressed && styles.buttonPressed
                ]}
                onPress={regresarParcialmenteAOriginal}
              >
                <Text>←</Text>
              </Pressable>

              <Pressable 
                style={({pressed}) => [
                  styles.actionButton,
                  pressed && styles.buttonPressed
                ]}
                onPress={moverCompletoANuevaComanda}
              >
                <FontAwesome name="angle-double-right" size={24} color="black" />
              </Pressable>

              <Pressable 
                style={({pressed}) => [
                  styles.actionButton,
                  pressed && styles.buttonPressed
                ]}
                onPress={regresarCompletoAOriginal}
              >
                <FontAwesome name="angle-double-left" size={24} color="black" />
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
                {[...nuevoPedido].sort((a,b) => a.persona - b.persona)?.map(item => (
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
                setModalCancelar(true);
              }}
            >
              <Text>Cancelar</Text>
            </Pressable>

            <Pressable 
              style={({pressed}) => [
                styles.button,
                pressed && styles.buttonPressed
              ]}
              onPress={() => { setModalGuardar(true) }}
            >
              <Text>Guardar</Text>
            </Pressable>

            <Pressable 
              style={({pressed}) => [
                styles.button,
                pressed && styles.buttonPressed
              ]}
              onPress={() =>{ setModalImprimir(true) }}
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
    padding: 5,
    borderRadius: 6,
    margin: 5,
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
