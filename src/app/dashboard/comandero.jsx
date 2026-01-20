import { useComandero } from '../../context/ComanderoContext';

import { StyleSheet, Text, View, Pressable } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { Tabs, useRouter } from 'expo-router';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Ionicons } from "@expo/vector-icons";

import ListaMenus from '../../components/comanderoComponents/listaMenus';
import ListaCategorias from '../../components/comanderoComponents/listaCategorias';
import ListaPlatillos from '../../components/comanderoComponents/listaPlatillos';
import Pedido from '../../components/comanderoComponents/rightColumnComponents/pedido';
import FinalizarComanda from '../../components/comanderoComponents/rightColumnComponents/finalizarComanda';

import ModalConfirmarAccion from '../../components/comanderoComponents/rightColumnComponents/modalConfirmarAccion';

import ModalComplementos from '../../components/comanderoComponents/rightColumnComponents/modalComplementos';

const Comandero = () => {
    const {areaSeleccionada, mesaSeleccionada, menuSeleccionado, seleccionarMenu, seleccionarCategoria, borrarPedido, eliminarLineaPedidoSeleccionada, modalQuitarPlatilloVisible,
        setModalQuitarPlatilloVisible, modalBorrarPedidoVisible, setModalBorrarPedidoVisible, modalSalirDeLaComanda, 
        setModalSalirDeLaComanda, seleccionarPersona, restablecerArregloPersonas, modalEnviarACocinaVisible, setModalEnviarACocinaVisible, enviarComanda } = useComandero();

    const router = useRouter();

  return (
    <>
    <Tabs.Screen
        options={{
            headerRight: ()=>(
                <Pressable
                    onPress={() =>{ setModalSalirDeLaComanda(true);}}
                    style={{ marginRight: 60 }}
                >
                    <Ionicons
                        name = "arrow-back"
                        size = {24}
                        color = '#fff'
                    />
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
            action={() => {
                router.replace("/dashboard/mesas")
                seleccionarMenu(null);
                seleccionarCategoria(null);
                borrarPedido();
                seleccionarPersona(1);
                restablecerArregloPersonas();
            }}
            visiblity={modalSalirDeLaComanda}
            setVisiblity={setModalSalirDeLaComanda}
        />
        <ModalConfirmarAccion
            title='¿Desea borrar todos los platillos?'
            paragraph='La tabla del pedido quedará vacía'
            action={()=> borrarPedido()}
            visiblity={modalBorrarPedidoVisible}
            setVisiblity={setModalBorrarPedidoVisible}
        />
        <ModalConfirmarAccion
            title='¿Desea quitar el platillo?'
            paragraph='Solo se eliminará el platillo seleccionado'
            action={()=> eliminarLineaPedidoSeleccionada()}
            visiblity={modalQuitarPlatilloVisible}
            setVisiblity={setModalQuitarPlatilloVisible}
        />
        <ModalComplementos />
        <ModalConfirmarAccion 
            title='¿Enviar Comanda a cocina?'
            paragraph='La Comanda se generará para empezar a cocinarla'
            action={()=> enviarComanda()}
            visiblity={modalEnviarACocinaVisible}
            setVisiblity={setModalEnviarACocinaVisible}
        />
        
        {/*Columna izquierda*/}
        <View style={styles.leftColumnContainer}>
            <Text style={{ color: '#000', alignSelf: 'center'}}>{mesaSeleccionada?.nombre} {areaSeleccionada?.nombre}</Text>
            <ListaMenus />
            <Pressable style={styles.cobrarButton}>
                <MaterialCommunityIcons name="account-cash-outline" size={24} color="#000" />
                <Text>Cobrar Cuenta</Text>
            </Pressable>
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
    },
    cobrarButton: {
        padding:10,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: '#faa80f',
        margin: 5
    }
})