import { StyleSheet, Text, Pressable } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const BotonCobrarCuenta = () => {
  return (
    <Pressable 
        style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed
        ]}
    >
        <MaterialCommunityIcons name="cash-edit" size={24} color="green" />
        <Text style = {styles.buttonText}>Cobrar cuenta</Text>
    </Pressable>
  )
}

export default BotonCobrarCuenta

const styles = StyleSheet.create({
    button: {
        padding:5,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: '#faa80f',
        margin: 5
    },
    buttonPressed: {
        backgroundColor: "#c68000"
    },
    buttonText:{
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 16
    }
})