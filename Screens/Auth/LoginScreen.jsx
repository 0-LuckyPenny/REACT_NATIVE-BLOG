import { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native'
import { COLORS, FONTS, SPACE, FONTSIZES, RADII } from '../../constants/theme'
import { useDispatch } from 'react-redux'
import { authSignInUser } from '../../redux/authOperations'

const initialState = {
  email: '',
  password: '',
}

export default function LoginScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false)
  const [inputValue, setInputValue] = useState(initialState)

  const dispatch = useDispatch()

  const keyboardHide = () => {
    setIsShowKeyboard(false)
    Keyboard.dismiss() //hides the keyboard
  }

  const handleSubmit = () => {
    dispatch(authSignInUser(inputValue))
    keyboardHide()
    setInputValue(inputValue) //set values
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.bgImage}
          source={require('../../assets/images/bg_image.jpg')}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={-70}
          >
            <View style={styles.form}>
              <Text style={styles.formTitle}>Log in</Text>
              <TextInput
                style={{ ...styles.input, marginTop: 32 }}
                placeholder='Email'
                placeholderTextColor={COLORS.textColor}
                onFocus={() => setIsShowKeyboard(true)}
                value={inputValue.email}
                onChangeText={value =>
                  setInputValue(prevState => ({ ...prevState, email: value }))
                }
              />
              <TextInput
                style={styles.input}
                placeholder='Password'
                placeholderTextColor={COLORS.textColor}
                maxLength={16}
                secureTextEntry={true}
                onFocus={() => setIsShowKeyboard(true)}
                value={inputValue.password}
                onChangeText={value =>
                  setInputValue(prevState => ({
                    ...prevState,
                    password: value,
                  }))
                }
              />
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={handleSubmit}
              >
                <Text style={styles.btnTitle}>Log in</Text>
              </TouchableOpacity>
              <View style={styles.signInBox}>
                <Text>Don't have an account?</Text>
                <Text
                  style={styles.link}
                  onPress={() => navigation.navigate('Register')}
                >
                  Sign in
                </Text>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  form: {
    position: 'relative',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RADII.xlg,
    borderTopRightRadius: RADII.xlg,
    paddingTop: SPACE[6],
    paddingBottom: SPACE[8],
  },
  formTitle: {
    textAlign: 'center',
    fontSize: FONTSIZES[8],
    color: COLORS.black,
    alignItems: 'center',
    fontFamily: FONTS.medium,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    height: 50,
    padding: SPACE[3],
    borderRadius: RADII.md,
    backgroundColor: COLORS.background,
    marginTop: SPACE[3],
    marginHorizontal: SPACE[3],
  },
  btn: {
    borderRadius: 100,
    marginTop: 43,
    padding: SPACE[3],
    justifyContent: 'center',
    marginHorizontal: SPACE[3],
    alignItems: 'center',
    backgroundColor: COLORS.orange,
  },
  btnTitle: {
    color: COLORS.white,
    fontSize: FONTSIZES[3],
  },
  signInBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    color: COLORS.blue,
    marginTop: SPACE[3],
    fontSize: FONTSIZES[3],
    lineHeight: 19,
  },
  link: {
    color: COLORS.blue,
    marginLeft: SPACE[2],
  },
})
