import { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
} from 'react-native'
import { COLORS, FONTS, SPACE, FONTSIZES, RADII } from '../../constants/theme'
import { useDispatch, useSelector } from 'react-redux'
import { authSignUpUser } from '../../redux/authOperations'
import { handleImagePicker } from '../../helpers'
import {
  CustomInput,
  ShowHidePassword,
  SubmitButton,
  AvatarBox,
  Background,
  Loader,
} from '../../components'
import { selectAuth } from '../../redux/selectors'

const initialState = {
  login: '',
  email: '',
  password: '',
  avatar: null,
}

export default function RegistrationScreen({ navigation }) {
  const [inputValue, setInputValue] = useState(initialState)
  const [secureTextEntry, setSecureTextEntry] = useState(true)
  const { isLoading } = useSelector(selectAuth)

  const dispatch = useDispatch()

  const getUserPhoto = async () => {
    const result = await handleImagePicker()
    setInputValue(prevState => ({ ...prevState, avatar: result }))
  }

  const handleSubmit = () => {
    dispatch(authSignUpUser(inputValue))
    setInputValue(initialState) //set values
    Keyboard.dismiss() //hides the keyboard
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <Background>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={-120}
      >
        <View style={styles.form}>
          <AvatarBox
            getUserPhoto={getUserPhoto}
            userPhoto={inputValue.avatar}
          />
          <Text style={styles.formTitle}>Sign in</Text>

          <View style={styles.inputContainer}>
            <CustomInput
              placeholder={'Login'}
              value={inputValue.login}
              onChangeText={value =>
                setInputValue(prevState => ({
                  ...prevState,
                  login: value,
                }))
              }
            />
            <CustomInput
              placeholder={'Email'}
              value={inputValue.email}
              onChangeText={value =>
                setInputValue(prevState => ({
                  ...prevState,
                  email: value,
                }))
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

          <SubmitButton title={'Sign in'} onPress={handleSubmit} />

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
    </Background>
  )
}

const styles = StyleSheet.create({
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
