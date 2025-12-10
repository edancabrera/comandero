import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";

import Areas from '../../components/areas'

const Mesas = () => {
  return (
    <SafeAreaView>
      <Text>Contenido de mesas</Text>
      <Areas />
    </SafeAreaView>
  )
}

export default Mesas

const styles = StyleSheet.create({})