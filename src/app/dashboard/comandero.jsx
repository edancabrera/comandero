import { StyleSheet, Text, View, Pressable } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";

const Comandero = () => {
  return (
    <SafeAreaView style={styles.container}>

        {/*Columna izquierda*/}
        <View style={styles.leftColumnContainer}>
            <Text>Mesa x Area x</Text>
            {/*Aqui va la lista de menus*/}
            <Pressable style={styles.cobrarButton}>
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
        flex:0.4,
        backgroundColor:'red'
    },
    rightColumnContainer: {
        flex:0.4,
        backgroundColor: 'white'
    },
    cobrarButton: {
        padding:20,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: '#faa80f',
    }
})