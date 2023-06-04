import { useState, useEffect } from 'react'
import { SimpleLineIcons, AntDesign } from '@expo/vector-icons'
import { nanoid } from 'nanoid'
import 'react-native-get-random-values'
import * as Location from 'expo-location'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from 'react-native'
import { COLORS, FONTS, SPACE, FONTSIZES, RADII } from '../../constants/theme'
import PhotoCamera from '../../components/PhotoCamera'
import { useSelector } from 'react-redux'
import { collection, addDoc } from 'firebase/firestore'
import { uploadPhotoToServer } from '../../helpers/uploadPhotoToServer'
import { selectAuth } from '../../redux/selectors'
import { firestore } from '../../firebase/config'
import Loader from '../../components/Loader'

const initialState = {
  title: '',
  location: '',
  coords: null,
}

export default function CreatePostsScreen({ navigation }) {
  const [state, setState] = useState(initialState)
  const [activeInput, setActiveInput] = useState('')
  const [isShowKeyboard, setIsShowKeyboard] = useState(false)
  const [cameraRef, setCameraRef] = useState(null)
  const [takenPhoto, setTakenPhoto] = useState(null)
  const { userId, nickName, userPhoto, userEmail, isLoading, error } =
    useSelector(selectAuth)

  useEffect(() => {
    ;(async () => {
      //запит на дозвіл використання геолокації
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        console.log('Permission to access location was denied')
        return
      }
    })()
  }, [])

  const takePhoto = async () => {
    const { uri } = await cameraRef.takePictureAsync()
    const location = await Location.getCurrentPositionAsync()
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    }
    setState(prevState => ({
      ...prevState,
      coords: coords,
    }))
    setTakenPhoto(uri)
  }

  const uploadPostToServer = async () => {
    const photoUrl = await uploadPhotoToServer(takenPhoto, 'postsImages')
    try {
      const docRef = await addDoc(collection(firestore, 'posts'), {
        ...state,
        photo: photoUrl,
        userId,
        nickName,
        userPhoto,
        userEmail,
        commentsNumber: 0,
        likesValue: 0,
        likes: [],
        isLiked: false,
      })
      console.log('document id: ', docRef.id)
    } catch (e) {
      console.error('Error adding document: ', e.message)
    }
  }

  const inputValueHandler = (input, value) => {
    setState(prevState => ({
      ...prevState,
      [input]: value,
      id: nanoid(10),
    }))
  }

  const activeInputHandler = inputName => {
    setIsShowKeyboard(true)
    setActiveInput(inputName)
  }

  const showKeyboardHandler = () => {
    setIsShowKeyboard(false)
    setActiveInput('')
    Keyboard.dismiss()
  }

  const submitHandler = async () => {
    uploadPostToServer()
    navigation.navigate('DefaultScreen')
    setState(initialState)
    setTakenPhoto(null)
  }

  return (
    <TouchableWithoutFeedback onPress={showKeyboardHandler}>
      <View style={styles.container}>
        {isLoading && <Loader />}
        {error && <Text>{error.message}</Text>}
        <View style={styles.photoContainer}>
          {takenPhoto ? (
            <Image
              style={styles.photo}
              onPress={Keyboard.dismiss}
              source={{ uri: takenPhoto }}
            />
          ) : (
            <PhotoCamera newPhoto={takePhoto} camera={setCameraRef} />
          )}
        </View>

        <TouchableOpacity>
          {takenPhoto ? (
            <Text onPress={() => setTakenPhoto(null)} style={styles.subTitle}>
              Change photo
            </Text>
          ) : (
            <Text style={styles.subTitle}>Upload photo</Text>
          )}
        </TouchableOpacity>

        <View style={styles.form}>
          <TextInput
            style={{
              ...styles.input,
              borderColor:
                activeInput === 'title' ? COLORS.orange : COLORS.textColor,
            }}
            placeholder='Title...'
            placeholderTextColor={COLORS.textColor}
            value={state.title}
            onChangeText={value => inputValueHandler('title', value)}
            onFocus={() => activeInputHandler('title')}
            onEndEditing={() => showKeyboardHandler()}
          />

          <View>
            <TextInput
              style={{
                ...styles.input,
                paddingLeft: 24,
                borderColor:
                  activeInput === 'location' ? COLORS.orange : COLORS.textColor,
              }}
              placeholder='Location...'
              placeholderTextColor={COLORS.textColor}
              value={state.location}
              onChangeText={value => inputValueHandler('location', value)}
              onFocus={() => activeInputHandler('location')}
            />
            <SimpleLineIcons
              name='location-pin'
              size={24}
              color={COLORS.textColor}
              style={styles.locationIcon}
            />
          </View>

          <TouchableOpacity
            style={{
              ...styles.button,
              backgroundColor: takenPhoto ? COLORS.orange : COLORS.background,
            }}
            onPress={submitHandler}
          >
            <Text
              style={{
                ...styles.buttonText,
                color: takenPhoto ? COLORS.white : COLORS.textColor,
              }}
            >
              Publish
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => {
            setState(initialState)
            setTakenPhoto(null)
          }}
        >
          <AntDesign name='delete' size={24} color={COLORS.textColor} />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  photoContainer: {
    marginHorizontal: SPACE[3],
    height: 240,
  },
  photo: {
    width: '100%',
    height: '100%',
    borderColor: COLORS.borderColor,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderRadius: RADII.md,
  },
  subTitle: {
    color: COLORS.textColor,
    fontSize: FONTSIZES[3],
    marginHorizontal: SPACE[3],
    marginTop: SPACE[2],
  },
  form: {
    marginHorizontal: SPACE[3],
    marginTop: SPACE[3],
  },
  input: {
    marginTop: SPACE[3],
    paddingVertical: SPACE[3],
    borderBottomWidth: 1,
    fontSize: FONTSIZES[3],
    color: COLORS.black,
  },
  locationIcon: {
    position: 'absolute',
    bottom: 22,
    left: -5,
  },
  button: {
    borderRadius: RADII.xxxxl,
    padding: SPACE[3],
    marginTop: SPACE[6],
    justifyContent: 'center',
    alignItems: 'center',
    color: COLORS.black,
  },
  buttonText: {
    fontFamily: FONTS.regular,
    fontSize: FONTSIZES[3],
  },
  deleteBtn: {
    alignSelf: 'center',
    width: 70,
    height: 40,
    borderRadius: RADII.xxl,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 120,
  },
})
