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

const initialState = {
  login: '',
  email: '',
  password: '',
  avatar: null,
}

export default function RegistrationScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false)
  const [inputValue, setInputValue] = useState(initialState)

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
            keyboardVerticalOffset={-100}
          >
            <View style={styles.form}>
              <AvatarBox
                getUserPhoto={getUserPhoto}
                newUserPhoto={inputValue.avatar}
              />
              <Text style={styles.formTitle}>Sign in</Text>
              <TextInput
                style={{ ...styles.input, marginTop: 32 }}
                placeholder='Login'
                placeholderTextColor={COLORS.textColor}
                onFocus={() => setIsShowKeyboard(true)}
                value={inputValue.login}
                onChangeText={value =>
                  setInputValue(prevState => ({ ...prevState, login: value }))
                }
              />
              <TextInput
                style={styles.input}
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
                <Text style={styles.btnTitle}>Sign in</Text>
              </TouchableOpacity>
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
    paddingBottom: 45,
  },
  formTitle: {
    marginTop: 92,
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
    padding: 16,
    borderRadius: 8,
    backgroundColor: COLORS.background,
    marginTop: 16,
    marginHorizontal: 16,
  },
  btn: {
    borderRadius: RADII.xxxxl,
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
