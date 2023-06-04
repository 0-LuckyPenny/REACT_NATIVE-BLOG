import { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Dimensions,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native'
import { COLORS, FONTS, SPACE, FONTSIZES, RADII } from '../../constants/theme'
import { useDispatch } from 'react-redux'
import { authSignUpUser } from '../../redux/authOperations'
import { AvatarBox } from '../../components/AvatarBox'
import { handleImagePicker } from '../../helpers/handleImagePicker'
import { CustomInput, ShowHidePassword, SubmitButton } from '../../components'

const initialState = {
  login: '',
  email: '',
  password: '',
  avatar: null,
}

export default function RegistrationScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false)
  const [inputValue, setInputValue] = useState(initialState)
  const [secureTextEntry, setSecureTextEntry] = useState(true)

  const dispatch = useDispatch()

  const getUserPhoto = async () => {
    const result = await handleImagePicker()
    setInputValue(prevState => ({ ...prevState, avatar: result }))
  }

  const keyboardHide = () => {
    setIsShowKeyboard(false)
    Keyboard.dismiss() //hides the keyboard
  }

  const handleSubmit = () => {
    dispatch(authSignUpUser(inputValue))
    setInputValue(initialState) //set values
    keyboardHide()
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
            keyboardVerticalOffset={-120}
          >
            <View style={styles.form}>
              <AvatarBox
                getUserPhoto={getUserPhoto}
                newUserPhoto={inputValue.avatar}
              />
              <Text style={styles.formTitle}>Sign in</Text>

              <View style={styles.inputContainer}>
                <CustomInput
                  placeholder={'Login'}
                  value={inputValue.login}
                  onChangeText={value =>
                    setInputValue(prevState => ({ ...prevState, login: value }))
                  }
                />
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
                    secureTextEntry={true}
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

              <SubmitButton title={'Sign in'} handleSubmit={handleSubmit} />

              <View style={styles.signInBox}>
                <Text>Already have an account?</Text>
                <Text
                  style={styles.link}
                  onPress={() => navigation.navigate('Login')}
                >
                  Log in
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
    paddingTop: 92,
    paddingBottom: SPACE[7],
  },
  formTitle: {
    marginBottom: SPACE[6],
    textAlign: 'center',
    fontSize: FONTSIZES[8],
    color: COLORS.black,
    alignItems: 'center',
    fontFamily: FONTS.medium,
  },
  inputContainer: {
    gap: SPACE[3],
    marginBottom: SPACE[6],
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
