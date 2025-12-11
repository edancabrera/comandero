import { StyleSheet, Text, View, Pressable } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import ListaMenus from '../../components/comanderoComponents/listaMenus';

const Comandero = () => {
  return (
    <SafeAreaView style={styles.container}>

        {/*Columna izquierda*/}
        <View style={styles.leftColumnContainer}>
            <Text style={{margin: 5, color: '#fff', fontWeight: 'bold', alignSelf: 'center'}}>Mesa x Area x</Text>
            <ListaMenus />
            <Pressable style={styles.cobrarButton}>
                <MaterialCommunityIcons name="account-cash-outline" size={24} color="#000" />
                <Text>Cobrar Cuenta</Text>
            </Pressable>
        </View>
        
        {/*Columna central*/}
        <View style={styles.centralColumnContainer}>

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
        backgroundColor:'red'
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