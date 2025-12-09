import { StyleSheet } from 'react-native'
import { Tabs } from 'expo-router'
import { Ionicons } from "@expo/vector-icons";

const dashbaordLayout = () => {
  return (
    <Tabs
        screenOptions={{
            headerShown: false,
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
    </Tabs>
  )
}

export default dashbaordLayout

const styles = StyleSheet.create({})