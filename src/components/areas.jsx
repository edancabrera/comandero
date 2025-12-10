import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';

import areas from '../data/areas.json';

const Areas = () => {
  return (
    <View>
      <Text>Areas</Text>
      <ScrollView>
        {areas.map((area)=>(
            <Pressable key={area.id}>
                <Text>{area.nombre}</Text>
            </Pressable>
        ))}
      </ScrollView>
    </View>
  )
}

export default Areas

const styles = StyleSheet.create({})