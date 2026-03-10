import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'

import { useComandero } from '../../context/ComanderoContext';
import { buildApiUrl } from '../../utils/apiConfig';

const ListaMenus = () => {
    const [menus, setMenus] = useState([]);

    const { seleccionarMenu, menuSeleccionado } = useComandero();

    const obtenerMenus = async () => {
        try {
            const url = await buildApiUrl('/categoria-platillo/menus');
            const response = await fetch(url);
            if(!response.ok){
                throw new Error ('Error en la respuesta  servidor');
            }
            const data = await response.json();
            setMenus(data);
        } catch (error) {
            console.error('Error al obtener menús', error)
        }
    }

    useEffect(()=>{
        obtenerMenus();
    },[]);

  return (
    <ScrollView 
        style= {{margin: 5}}
        stickyHeaderIndices={[0]}
    >
        <View style={{backgroundColor: '#2596be'}}>
            <Text style={{fontWeight: 'bold'}}>Menus</Text>
        </View>
      {menus?.map((menu, index) => (
        <Pressable 
            key={index} 
            onPress={()=> seleccionarMenu(menu)}
            style={[
                styles.menuButton,
                menu === menuSeleccionado && styles.menuButtonSelected
                ]}
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
        padding: 20,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center'
    },
    menuButtonSelected: {
        backgroundColor: "#c68000"
    },
    menuButtonText: {
        color: '#fff',
        fontWeight: 'bold'
    }
})