import { useState } from 'react'
import { StyleSheet, Text, TextInput } from 'react-native'
import { COLORS, FONTS, FONTSIZES, RADII, SPACE } from '../constants/theme'
import { Controller } from 'react-hook-form'

export default function CustomInput({
  isPrimaryInput = true,
  secureTextEntry = false,
  placeholder,
  paddingLeft = 16,
  marginBottom = 16,
  name,
  control,
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
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <>
          <TextInput
            placeholder={placeholder}
            style={[styles.input, inputStyles]}
            placeholderTextColor={COLORS.textColor}
            onChangeText={onChange}
            value={value}
            onFocus={() => setOnInput(true)}
            onBlur={() => setOnInput(false)}
            secureTextEntry={secureTextEntry}
          />

          {error && (
            <Text style={styles.errorMessage}>{error.message || 'Error'}</Text>
          )}
        </>
      )}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    position: 'relative',
    height: 50,
    color: COLORS.black,
    padding: SPACE[3],
    fontSize: FONTSIZES[3],
    fontFamily: FONTS.regular,
    marginTop: SPACE[3],
  },
  primaryInput: {
    borderWidth: 1,
    borderRadius: RADII.md,
    marginHorizontal: SPACE[3],
    backgroundColor: COLORS.background,
    borderColor: COLORS.borderColor,
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
    borderBottomWidth: 1,
  },
  errorMessage: {
    position: 'absolute',
    top: 65,
    left: 22,
    fontSize: FONTSIZES[1],
    color: COLORS.error,
  },
})
