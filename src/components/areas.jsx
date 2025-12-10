import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';

import areas from '../data/areas.json';

const Areas = ({ onSelectArea }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Areas</Text>
      <ScrollView style={styles.buttonsContainer}>
        {areas.map((area)=>(
            <Pressable 
                key={area.id}
                style={styles.areaButton}
            >
                <Text style={styles.areaButtonText}>{area.nombre}</Text>
            </Pressable>
        ))}
      </ScrollView>
    </View>
  )
}

export default Areas

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontWeight:'bold',
        fontSize: 24,
        marginBottom: 10,
    },
    buttonsContainer: {
        width:'100%',
    },
    areaButton: {
        backgroundColor: "#faa80f",
        padding:30,
        borderRadius: 5,
        marginTop:10,
        alignItems: 'center'
    },
    areaButtonText:{
        color: "#fff",
        fontWeight: "bold"
    }
})