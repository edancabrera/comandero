import { StyleSheet, Pressable } from 'react-native';
import { Tabs, useRouter, Redirect } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useComandero } from '../../context/ComanderoContext';
import { useUI, MODALS } from '../../context/UIContext';


const dashbaordLayout = () => {
    const { usuario } = useComandero();
    const { openModal } = useUI();
    if (!usuario) {
        return <Redirect href="/login" />;
    }
  return (
    <Tabs
        screenOptions={{
            headerShown: true,
            headerTitle: usuario?.nombre,
            headerStyle : {
                backgroundColor: "#2596be",
                height: 70
            },
            headerTitleStyle: {
                fontSize: 14,
                fontWeight: "bold",
                color: "#fff",
            },
            headerRight: () => (
                <Pressable 
                    onPress={()=> openModal(MODALS.CERRAR_SESION)} 
                    style={{marginRight: 60}}
                >
                    {({ pressed }) => (
                        <AntDesign name="poweroff" size={24} color={pressed ? "#c0baba" :"#fff"} />
                    )}
                </Pressable>
            ),
            tabBarActiveTintColor: "#faa80f",
            tabBarInactiveTintColor: "#fff",
            tabBarStyle: {
                backgroundColor: "#2596be",
                paddingBottom: 8
            },
            tabBarLabelStyle: {
                fontSize: 18,
                fontWeight: 'bold'
            }
        }}
    >
        <Tabs.Screen 
            name = "mesas"
            options={{
                title: "Mesas",
                tabBarIcon: ({ color, size }) => (
                <Ionicons name="grid" color={color} size={size} />
          ),
            }}
        />
        <Tabs.Screen 
            name = "articulos"
            options={{
                title: "Ver precios",
                tabBarIcon: ({ color, size }) => (
                <Ionicons name="pricetag" color={color} size={size} />
          ),
            }}
        />
        <Tabs.Screen
            name='comandero'
            options={{
                href: null,
                tabBarStyle: {display: 'none'}
            }}
        />
    </Tabs>
  )
}

export default dashbaordLayout

const styles = StyleSheet.create({})