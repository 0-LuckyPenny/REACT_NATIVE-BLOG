import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { COLORS, FONTS, FONTSIZES } from '../constants/theme'

export default function ShowHidePassword({ onPress, secureTextEntry }) {
  const passwordText = secureTextEntry ? 'Show' : 'Hide'

  return (
    <TouchableOpacity onPress={onPress} style={styles.showPassword}>
      <Text style={styles.showPasswordText}>{passwordText}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  showPassword: {
    position: 'absolute',
    right: 32,
    bottom: 16,
  },
  showPasswordText: {
    fontFamily: FONTS.regular,
    fontsSize: FONTSIZES[3],
    color: COLORS.blue,
  },
})
