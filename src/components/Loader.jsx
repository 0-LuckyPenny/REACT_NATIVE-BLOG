import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { COLORS } from '../constants/theme'

const Loader = () => (
  <View style={styles.container}>
    <ActivityIndicator size='large' color={COLORS.orange} />
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Loader
