import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'

import categoria_platillo from '../../data/categoria_platillo.json'

const ListaMenus = () => {
    const obtenerMenusUnicos = () => {
        const menus = categoria_platillo.map(item => item.menu);
        return [...new Set(menus)];
    }
    const menus = obtenerMenusUnicos();

  return (
    <ScrollView>
      <Text>Menus</Text>
      {menus.map(menu => (
        <Pressable key={menu}>
            <Text>{menu}</Text>
        </Pressable>
      ))
      }

    </ScrollView>
  )
}

export default ListaMenus

const styles = StyleSheet.create({})