import { useComandero } from '../../context/ComanderoContext';

import { StyleSheet, Text, View, Pressable } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import ListaMenus from '../../components/comanderoComponents/listaMenus';
import ListaCategorias from '../../components/comanderoComponents/listaCategorias';
import ListaPlatillos from '../../components/comanderoComponents/listaPlatillos';

const Comandero = () => {

    const {areaSeleccionada, mesaSeleccionada, menuSeleccionado} = useComandero();

  return (
    <SafeAreaView style={styles.container}>

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

        </View>
      
    </SafeAreaView>
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