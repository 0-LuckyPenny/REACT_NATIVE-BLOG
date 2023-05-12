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
import { colors } from '../../helpers/colors'
import { useDispatch } from 'react-redux'
import { authSignUpUser } from '../../redux/auth/authOperations'
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
                placeholderTextColor={colors.textColor}
                onFocus={() => setIsShowKeyboard(true)}
                value={inputValue.login}
                onChangeText={value =>
                  setInputValue(prevState => ({ ...prevState, login: value }))
                }
              />
              <TextInput
                style={styles.input}
                placeholder='Email'
                placeholderTextColor={colors.textColor}
                onFocus={() => setIsShowKeyboard(true)}
                value={inputValue.email}
                onChangeText={value =>
                  setInputValue(prevState => ({ ...prevState, email: value }))
                }
              />
              <TextInput
                style={styles.input}
                placeholder='Password'
                placeholderTextColor={colors.textColor}
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
    backgroundColor: colors.white,
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
    backgroundColor: colors.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingBottom: 45,
  },
  formTitle: {
    marginTop: 92,
    textAlign: 'center',
    fontSize: 30,
    color: colors.black,
    alignItems: 'center',
    fontFamily: 'Roboto-Medium',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    height: 50,
    padding: 16,
    borderRadius: 8,
    backgroundColor: colors.background,
    marginTop: 16,
    marginHorizontal: 16,
  },
  btn: {
    borderRadius: 100,
    marginTop: 43,
    padding: 16,
    justifyContent: 'center',
    marginHorizontal: 16,
    alignItems: 'center',
    backgroundColor: colors.orange,
  },
  btnTitle: {
    color: colors.white,
    fontSize: 16,
  },
  signInBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    color: colors.blue,
    marginTop: 16,
    fontSize: 16,
    lineHeight: 19,
  },
  link: {
    color: colors.blue,
    marginLeft: 6,
  },
})
