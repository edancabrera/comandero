import { Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';

const Numpad = ({ numeroEmpleado, setNumeroEmpleado }) => {

    const numpadContent = [
    [
      { id: '#7', display: <Text style={styles.innerButton}>7</Text>, value: 7 },
      { id: '#8', display: <Text style={styles.innerButton}>8</Text>, value: 8 },
      { id: '#9', display: <Text style={styles.innerButton}>9</Text>, value: 9 },
    ],
     [
      { id: '#4', display: <Text style={styles.innerButton}>4</Text>, value: 4 },
      { id: '#5', display: <Text style={styles.innerButton}>5</Text>, value: 5 },
      { id: '#6', display: <Text style={styles.innerButton}>6</Text>, value: 6 },
    ],
    [
      { id: '#1', display: <Text style={styles.innerButton}>1</Text>, value: 1 },
      { id: '#2', display: <Text style={styles.innerButton}>2</Text>, value: 2 },
      { id: '#3', display: <Text style={styles.innerButton}>3</Text>, value: 3 },
    ],
    [
      { id: '#0', display: <Text style={styles.innerButton}>0</Text>, value: 0 },
      { id: '#backspace', display: <Ionicons name="backspace-outline" size={24} color="#000" />, value: -1 },
      { id: '#submit', display: <AntDesign name="check" size={24} color="#000" />, value: 10 },
    ]
  ]

  const handlePress = (value) => {
    if(value === -1){
        setNumeroEmpleado(numeroEmpleado.slice(0, -1));
    } else if (value === 10){
        //Opción de envío
    } else {
        setNumeroEmpleado(prev => prev + value);
    }
  }

  return (
    <View style={styles.container}>
      {numpadContent.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
            {row.map((button) => (
                <Pressable
                    key={button.id}
                    onPress={() => handlePress(button.value)}
                    style={({ pressed }) => [
                        styles.button,
                        pressed && styles.buttonPressed
                    ]}
                >
                    {button.display}
                </Pressable>
            ))}
        </View>
      ))}
    </View>
  );
};

export default Numpad;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems: 'center'
    },
    innerButton: {
        fontSize: 20
    },
    row: {
        flexDirection: 'row',
    },
    button: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        margin: 5,
        borderRadius: 10
    },
    buttonPressed: {
        backgroundColor:'#e0e0e0',
        transform: [{ scale: 0.95 }]
    }
});
