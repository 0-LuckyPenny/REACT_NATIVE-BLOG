import { useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { COLORS, FONTS, FONTSIZES, RADII, SPACE } from '../constants/theme'

export default function CustomInput({
  isPrimaryInput = true,
  secureTextEntry = false,
  onChangeText,
  placeholder,
  value,
  paddingLeft = 16,
  marginBottom = 16,
}) {
  const [onInput, setOnInput] = useState(false)
  const { primaryInput, secondaryInput } = styles

  const onFocusBlurPrimaryTextInputStyles = {
    backgroundColor: onInput ? COLORS.white : COLORS.background,
    borderColor: onInput ? COLORS.orange : COLORS.borderColor,
  }

  const onFocusBlurSecondaryTextInputStyles = {
    backgroundColor: 'transparent',
    borderBottomColor: onInput ? COLORS.orange : COLORS.borderColor,
  }

  const inputStyles = isPrimaryInput
    ? {
        ...primaryInput,
        ...onFocusBlurPrimaryTextInputStyles,
        paddingLeft,
      }
    : {
        ...secondaryInput,
        ...onFocusBlurSecondaryTextInputStyles,
        paddingLeft,
        marginBottom,
      }

  return (
    <TextInput
      placeholder={placeholder}
      style={inputStyles}
      placeholderTextColor={COLORS.textColor}
      onChangeText={onChangeText}
      value={value}
      onFocus={() => setOnInput(true)}
      onBlur={() => setOnInput(false)}
      secureTextEntry={secureTextEntry}
    />
  )
}

const styles = StyleSheet.create({
  primaryInput: {
    position: 'relative',
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    height: 50,
    padding: SPACE[3],
    borderRadius: RADII.md,
    backgroundColor: COLORS.background,
    marginTop: SPACE[3],
    marginHorizontal: SPACE[3],
    paddingVertical: SPACE[3],
    fontFamily: FONTS.regular,
    fontSize: FONTSIZES[3],
    color: COLORS.black,
    shadowColor: COLORS.iconColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  secondaryInput: {
    position: 'relative',
    height: 50,
    borderBottomWidth: 1,
    fontFamily: FONTS.regular,
    fontSize: FONTSIZES[3],
    color: COLORS.black,
    paddingVertical: SPACE[3],
  },
})
