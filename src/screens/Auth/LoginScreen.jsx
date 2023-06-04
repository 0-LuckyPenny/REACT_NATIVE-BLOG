import { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
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
import SubmitButton from '../../components/SubmitButton'
import { CustomInput, ShowHidePassword } from '../../components'

const initialState = {
  email: '',
  password: '',
}

export default function LoginScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false)
  const [inputValue, setInputValue] = useState(initialState)
  const [secureTextEntry, setSecureTextEntry] = useState(true)

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
            keyboardVerticalOffset={-60}
          >
            <View style={styles.form}>
              <Text style={styles.formTitle}>Log in</Text>

              <View style={styles.inputContainer}>
                <CustomInput
                  placeholder={'Email'}
                  value={inputValue.email}
                  onChangeText={value =>
                    setInputValue(prevState => ({ ...prevState, email: value }))
                  }
                />

                <View>
                  <CustomInput
                    placeholder={'Password'}
                    secureTextEntry={secureTextEntry}
                    value={inputValue.password}
                    onChangeText={value =>
                      setInputValue(prevState => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                  />
                  <ShowHidePassword
                    secureTextEntry={secureTextEntry}
                    onPress={() => {
                      setSecureTextEntry(state => !state)
                    }}
                  />
                </View>
              </View>

              <SubmitButton title={'Log in'} onPress={handleSubmit} />

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
    marginBottom: SPACE[6],
  },
  inputContainer: {
    marginBottom: SPACE[6],
    gap: SPACE[3],
  },
  signInBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    color: COLORS.blue,
    marginTop: SPACE[3],
    fontSize: FONTSIZES[3],
  },
  link: {
    color: COLORS.blue,
    marginLeft: SPACE[2],
  },
})
