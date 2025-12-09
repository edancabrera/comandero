import { StyleSheet, Text, View, Image, TextInput } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";

import Logo from '../../../assets/crovrestaurante.png'

const login = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={Logo} />
      <Text style={styles.title}>Autenticación</Text>
      <TextInput
        placeholder='Numero de empleado'
        editable={false}
        style={styles.input}
      />
    </SafeAreaView>
  )
}

export default login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2596be',
        alignItems:'center',
        justifyContent: 'center'
    },
    title: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20
    },
    input: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 5,
        width: '80%',
        textAlign: 'center'
    }
})