import { StyleSheet, Text, View } from 'react-native'
import { FONTS, FONTSIZES } from '../constants/theme'

const ErrorContainer = ({ children }) => (
  <View style={styles.container}>
    <Text style={styles.errorText}>{children}</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: FONTSIZES[6],
    fontFamily: FONTS.medium,
  },
})

export default ErrorContainer
