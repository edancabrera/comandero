import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'

import categoria_platillo from '../../data/categoria_platillo.json'

const ListaMenus = ({onSelectMenu}) => {
    const obtenerMenusUnicos = () => {
        const menus = categoria_platillo.map(item => item.menu);
        return [...new Set(menus)];
    }
    const menus = obtenerMenusUnicos();

  return (
    <ScrollView 
        style= {{margin: 5}}
        stickyHeaderIndices={[0]}
    >
        <View style={{backgroundColor: '#2596be'}}>
            <Text style={{fontWeight: 'bold'}}>Menus</Text>
        </View>
      {menus.map(menu => (
        <Pressable 
            key={menu} 
            style={styles.menuButton}
            onPress={()=> onSelectMenu(menu)}
        >
            <Text style={styles.menuButtonText}>{menu}</Text>
        </Pressable>
      ))
      }

    </ScrollView>
  )
}

export default ListaMenus

const styles = StyleSheet.create({
    menuButton: {
        backgroundColor: "#faa80f",
        padding: 25,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center'
    },
    menuButtonText: {
        color: '#fff',
        fontWeight: 'bold'
    }
})