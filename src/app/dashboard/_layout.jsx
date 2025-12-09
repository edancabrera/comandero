import { StyleSheet } from 'react-native'
import { Tabs } from 'expo-router'

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
        <Tabs.Screen name = "mesas"/>
        <Tabs.Screen name = "articulos"/>
    </Tabs>
  )
}

export default dashbaordLayout

const styles = StyleSheet.create({})