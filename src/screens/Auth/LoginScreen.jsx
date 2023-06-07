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
import { authSignInUser } from '../../redux/authOperations'
import SubmitButton from '../../components/SubmitButton'
import {
  Background,
  CustomInput,
  Loader,
  ShowHidePassword,
} from '../../components'
import { selectAuth } from '../../redux/selectors'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginValidationSchema } from '../../helpers'

export default function LoginScreen({ navigation }) {
  const [secureTextEntry, setSecureTextEntry] = useState(true)
  const { isLoading } = useSelector(selectAuth)

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginValidationSchema),
  })

  const dispatch = useDispatch()

  const onSubmit = data => {
    dispatch(authSignInUser(data))
    reset()
    Keyboard.dismiss() //hides the keyboard
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <Background>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={-60}
      >
        <View style={styles.form}>
          <Text style={styles.formTitle}>Log in</Text>

          <View style={styles.inputContainer}>
            <CustomInput name='email' control={control} placeholder={'Email'} />

            <View>
              <CustomInput
                name='password'
                control={control}
                placeholder={'Password'}
                secureTextEntry={secureTextEntry}
              />
              <ShowHidePassword
                secureTextEntry={secureTextEntry}
                onPress={() => {
                  setSecureTextEntry(state => !state)
                }}
              />
            </View>
          </View>

          <SubmitButton title={'Log in'} onPress={handleSubmit(onSubmit)} />

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
    </Background>
  )
}

const styles = StyleSheet.create({
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
