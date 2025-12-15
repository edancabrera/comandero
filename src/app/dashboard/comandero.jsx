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

const Comandero = () => {
    const {areaSeleccionada, mesaSeleccionada, menuSeleccionado, seleccionarMenu, seleccionarCategoria} = useComandero();

    const router = useRouter();

  return (
    <>
    <Tabs.Screen
        options={{
            headerRight: ()=>(
                <Pressable
                    onPress={() =>{
                         router.replace("/dashboard/mesas")
                         seleccionarMenu(null);
                         seleccionarCategoria(null);
                    }}
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

        {/*Columna izquierda*/}
        <View style={styles.leftColumnContainer}>
            <Text style={{margin: 5, color: '#fff', fontWeight: 'bold', alignSelf: 'center'}}>{mesaSeleccionada?.nombre} {areaSeleccionada?.nombre}</Text>
            <ListaMenus />
            <Pressable style={styles.cobrarButton}>
                <MaterialCommunityIcons name="account-cash-outline" size={24} color="#000" />
                <Text>Cobrar Cuenta</Text>
            </Pressable>
        </View>
        
        {/*Columna central*/}
        <View style={styles.centralColumnContainer}>

            {menuSeleccionado === null ? (
                <Text>Selecciona un menú</Text>
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
                <View style={{flex: 0.2, backgroundColor: '#f2bfe6'}}>
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
        flex:0.2,
        justifyContent: 'space-between'
    },
    centralColumnContainer: {
        flex:0.5,
    },
    rightColumnContainer: {
        flex:0.3,
        backgroundColor: 'white'
    },
    cobrarButton: {
        padding:20,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: '#faa80f',
        margin: 5
    }
})