import { useComandero } from '../../context/ComanderoContext';
import { useUI, MODALS } from '../../context/UIContext';

import { StyleSheet, Text, View, Pressable } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { Tabs, useRouter } from 'expo-router';

import { Ionicons } from "@expo/vector-icons";

import ListaMenus from '../../components/comanderoComponents/listaMenus';
import BotonCobrarCuenta from '../../components/comanderoComponents/botonCobrarCuenta';
import ListaCategorias from '../../components/comanderoComponents/listaCategorias';
import ListaPlatillos from '../../components/comanderoComponents/listaPlatillos';
import Pedido from '../../components/comanderoComponents/rightColumnComponents/pedido';
import FinalizarComanda from '../../components/comanderoComponents/rightColumnComponents/finalizarComanda';

import ModalConfirmarAccion from '../../components/comanderoComponents/rightColumnComponents/modalConfirmarAccion';
import ModalComplementos from '../../components/comanderoComponents/rightColumnComponents/modalComplementos';
import ModalCancelarComanda from '../../components/comanderoComponents/rightColumnComponents/modalCancelarComanda';

const Comandero = () => {
    const {
        areaSeleccionada,
        mesaSeleccionada,
        menuSeleccionado,
        borrarPedido,
        eliminarLineaPedidoSeleccionada,
        limpiarEstado,
        enviarComanda,
        enviarComandaACocinaYCobrarCuenta
    } = useComandero();
    
    const { modals, openModal, closeModal, printConfErrorMsg } = useUI();

    const router = useRouter();

  return (
    <>
    <Tabs.Screen
        options={{
            headerRight: ()=>(
                <Pressable
                    onPress={() =>{ openModal(MODALS.SALIR_COMANDA) }}
                    style={{ marginRight: 60 }}
                >
                    {({ pressed }) => (
                        <Ionicons name = "arrow-back"
                        size = {24} color={pressed ? "#c0baba" :"#fff"} />
                    )}
                </Pressable>
            )
        }}
    />

    <SafeAreaView 
        style={styles.container}
        edges={["left", "right", "bottom"]}
    >
        <ModalConfirmarAccion 
            title='¿Estás seguro de salir de la comanda?'
            paragraph='Los datos no guardados se perderan'
            onConfirm={() => {
                limpiarEstado();
                router.replace("/dashboard/mesas")
            }}
            visible={ modals[MODALS.SALIR_COMANDA] }
            onClose={ () => closeModal(MODALS.SALIR_COMANDA) }
        />
        <ModalConfirmarAccion
            title='¿Desea borrar todos los platillos?'
            paragraph='La tabla del pedido quedará vacía'
            onConfirm={()=> borrarPedido()}
            visible={ modals[MODALS.BORRAR_PEDIDO] }
            onClose={ () => closeModal(MODALS.BORRAR_PEDIDO) }
        />
        <ModalConfirmarAccion
            title='¿Desea quitar el platillo?'
            paragraph='Solo se eliminará el platillo seleccionado'
            onConfirm={()=> eliminarLineaPedidoSeleccionada()}
            visible={ modals[MODALS.QUITAR_PLATILLO] }
            onClose={ () => closeModal(MODALS.QUITAR_PLATILLO) }
        />
        <ModalComplementos />
        <ModalConfirmarAccion 
            title='¿Enviar Comanda a cocina?'
            paragraph='La Comanda se generará para empezar a cocinarla'
            onConfirm={async ()=> {
                try {
                    await enviarComanda();
                    limpiarEstado();
                    router.replace("/dashboard/mesas")
                } catch (error) {
                    console.error("Error al enviar comanda:", error);
                }
            }}
            visible={ modals[MODALS.ENVIAR_COCINA] }
            onClose={ () => closeModal(MODALS.ENVIAR_COCINA) }
        />
        <ModalConfirmarAccion 
            title='¿Enviar Comanda a cocina?'
            paragraph='La Comanda se generará para empezar a cocinarla'
            onConfirm={async ()=> {
                try {
                    await enviarComanda(true);
                    limpiarEstado();
                    router.replace("/dashboard/mesas")
                } catch (error) {
                    console.error("Error al enviar comanda:", error);
                }
            }}
            visible={ modals[MODALS.ENVIAR_URGENTE] }
            onClose={ () => closeModal(MODALS.ENVIAR_URGENTE) }
        />
        <ModalConfirmarAccion 
            title='No se editó la comanda'
            paragraph='Ningún producto se envió a cocina'
            visible={ modals[MODALS.COMANDA_SIN_CAMBIOS] }
            onClose={ () => closeModal(MODALS.COMANDA_SIN_CAMBIOS) }
            infoOnlyModal = {true}
        />
        <ModalConfirmarAccion 
            title='Comanda vacía'
            paragraph='Comanda vacia, agrega platillo/bebida para enviar a cocina'
            visible={ modals[MODALS.COMANDA_VACIA] }
            onClose={ () => closeModal(MODALS.COMANDA_VACIA) }
            infoOnlyModal = {true}
        />
        <ModalConfirmarAccion 
            title='¿Mandar a cobrar cuenta?'
            paragraph='Se enviarán los platillos restantes a la cocina y se enviará a cobrar la cuenta'
            onConfirm={async ()=> {
                try {
                    await enviarComandaACocinaYCobrarCuenta();
                    limpiarEstado();
                    router.replace("/dashboard/mesas")
                } catch (error) {
                    console.error("Error al cobrar cuenta:", error);
                }
            } }
            visible={ modals[MODALS.ENVIAR_Y_COBRAR] }
            onClose={ () => closeModal(MODALS.ENVIAR_Y_COBRAR) }
        />
        <ModalConfirmarAccion 
            title='Impresora no configurada'
            paragraph={printConfErrorMsg || 'Error desconocido'}
            visible={ modals[MODALS.ERROR_IMPRESORA] }
            onClose={ () => closeModal(MODALS.ERROR_IMPRESORA) }
            infoOnlyModal = {true}
        />
        <ModalCancelarComanda />
        
        {/*Columna izquierda*/}
        <View style={styles.leftColumnContainer}>
            <Text style={{ color: '#000', alignSelf: 'center'}}>{mesaSeleccionada?.nombre} {areaSeleccionada?.nombre}</Text>
            <ListaMenus />
            <BotonCobrarCuenta />
        </View>
        
        {/*Columna central*/}
        <View style={styles.centralColumnContainer}>

            {menuSeleccionado === null ? (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}><Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 24}}>Selecciona un menú</Text></View>
                ):(
                <View style={{flex:1}}>
                    <View style={{flex:0.5}}>
                        <ListaCategorias />
                    </View>
                    
                    <View style={{flex: 0.5}}>
                        <ListaPlatillos />
                    </View>
                </View>
            )}

        </View>

        {/*Columna derecha*/}
        <View style={styles.rightColumnContainer}>
            <View style={{flex: 1}}>
                <View style={{flex: 0.8}}>
                    <Pedido />
                </View>
                <View style={{flex: 0.2}}>
                    <FinalizarComanda />
                </View>
            </View>

        </View>
      
    </SafeAreaView>
    </>
  )
}

export default Comandero

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'row',
        backgroundColor: "#2596be"
    },
    leftColumnContainer: {
        flex:0.15,
        justifyContent: 'space-between'
    },
    centralColumnContainer: {
        flex:0.4,
    },
    rightColumnContainer: {
        flex:0.45,
    }
})