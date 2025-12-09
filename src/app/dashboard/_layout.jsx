import { StyleSheet } from 'react-native'
import { Tabs } from 'expo-router'

const dashbaordLayout = () => {
  return (
    <Tabs>
        <Tabs.Screen name = "mesas"/>
        <Tabs.Screen name = "articulos"/>
    </Tabs>
  )
}

export default dashbaordLayout

const styles = StyleSheet.create({})