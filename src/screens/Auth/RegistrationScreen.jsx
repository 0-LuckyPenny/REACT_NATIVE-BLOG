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
import { handleImagePicker, registerValidationSchema } from '../../helpers'
import {
  CustomInput,
  ShowHidePassword,
  SubmitButton,
  AvatarBox,
  Background,
  Loader,
} from '../../components'
import { selectAuth } from '../../redux/selectors'
import { useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

export default function RegistrationScreen({ navigation }) {
  const [avatar, setAvatar] = useState(null)
  const [secureTextEntry, setSecureTextEntry] = useState(true)
  const { isLoading } = useSelector(selectAuth)
  const dispatch = useDispatch()
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      login: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(registerValidationSchema),
  })

  const getUserPhoto = async () => {
    const result = await handleImagePicker()

    setAvatar(result)
  }

  const onSubmit = data => {
    dispatch(authSignUpUser({ ...data, avatar }))
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
        keyboardVerticalOffset={-120}
      >
        <View style={styles.form}>
          <AvatarBox
            getUserPhoto={getUserPhoto}
            userPhoto={avatar}
            removeUserPhoto={() => setAvatar(null)}
          />
          <Text style={styles.formTitle}>Sign in</Text>

          <View style={styles.inputContainer}>
            <CustomInput name='login' control={control} placeholder={'Login'} />

            <View style={{ position: 'relative' }}>
              <CustomInput
                name='email'
                control={control}
                placeholder={'Email'}
              />
            </View>

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

          <SubmitButton title={'Sign in'} onPress={handleSubmit(onSubmit)} />

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
