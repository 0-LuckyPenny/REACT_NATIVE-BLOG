import { ActivityIndicator, StyleSheet, View } from 'react-native'

const Loader = () => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size='large' color='#0000ff' />
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
})

export default Loader
