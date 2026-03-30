import { Pressable, StyleSheet, Text, View, ActivityIndicator } from "react-native";

import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';

const Numpad = ({value, onAppend, onBackspace, onClear, onSubmit, loading}) => {
    const isReady = value.length === 6 && !loading;

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
      { id: '#submit', display: <AntDesign name="check" size={24} color="#000" />, value: 'submit' },
    ]
  ]

  const handlePress = (value) => {
    if(loading) return;
    if(value === -1) return onBackspace();
    if(value === 'clear')return onClear();
    if(value === 'submit') return onSubmit();
    onAppend(String(value));
  }

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size='120' />
        </View>
      )}
      {numpadContent.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
            {row.map((button) => (
                <Pressable
                    key={button.id}
                    onPress={() => handlePress(button.value)}
                    onLongPress={() => {
                      if (button.id === '#backspace'){
                        handlePress('clear') 
                      }}}
                    delayLongPress={300}
                    style={({ pressed }) => [
                        styles.button,
                        pressed && styles.buttonPressed,
                        loading && {backgroundColor: '#ccc', opacity: 0.6},
                        button.id === '#submit' && !isReady && { backgroundColor: '#ccc', opacity: 0.6 }
                    ]}
                    disabled={button.id === '#submit' ? !isReady : loading}
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
        alignItems: 'center',
        position: 'relative'
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
        backgroundColor:'#faa80f',
        //transform: [{ scale: 0.95 }]
    },
    loadingOverlay: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10
    }
});
