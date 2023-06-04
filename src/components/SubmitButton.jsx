import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { COLORS, FONTSIZES, SPACE, RADII } from '../constants/theme'

export default function SubmitButton({ onPress, title }) {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={onPress}>
      <Text style={styles.btnTitle}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACE[3],
    marginHorizontal: SPACE[3],
    borderRadius: RADII.xxxxl,
    backgroundColor: COLORS.orange,
  },
  btnTitle: {
    color: COLORS.white,
    fontSize: FONTSIZES[3],
  },
})
