import { useState, useEffect } from 'react'
import { SimpleLineIcons, AntDesign } from '@expo/vector-icons'
import { Input } from 'react-native-elements'
import { nanoid } from 'nanoid'
import * as Location from 'expo-location'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import { colors } from '../../helpers/colors'
import PhotoCamera from '../../components/PhotoCamera'
import { useSelector } from 'react-redux'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

const storage = getStorage()

const initialState = {
  title: '',
  location: '',
  coords: null,
}

export default function CreatePostsScreen({ navigation }) {
  const [state, setState] = useState(initialState)
  const [cameraRef, setCameraRef] = useState(null)
  const [takenPhoto, setTakenPhoto] = useState(null)
  // const [isLoadingPhoto, setIsLoadingPhoto] = useState(false)

  const { userId, nickName, userPhoto, userEmail } = useSelector(
    state => state.auth
  )

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

  const inputValueHandler = (input, value) => {
    setState(prevState => ({
      ...prevState,
      [input]: value,
    }))
  }

  const uploadPhotoToServer = async () => {
    const uniquePostId = nanoid()
    const storageRef = ref(storage, `postsImages/${uniquePostId}.jpg`)
    const response = await fetch(takenPhoto)
    const uploadedFile = await response.blob()
    await uploadBytes(storageRef, uploadedFile)
    const photoUrl = await getDownloadURL(
      ref(storage, `postsImages/${uniquePostId}.jpg`)
    )
    setState(prevState => ({
      ...prevState,
    }))
    return photoUrl
  }

  const uploadPostToServer = async () => {
    const createdPhoto = await uploadPhotoToServer()
    try {
      const docRef = await addDoc(collection(db, 'posts'), {
        ...state,
        photo: createdPhoto,
        userId,
        nickName,
        userPhoto,
        userEmail,
        commentsValue: 0,
        likesValue: 0,
        likes: [],
        isLiked: false,
      })
      console.log('document id: ', docRef.id)
    } catch (e) {
      console.error('Error adding document: ', e.message)
    }
  }

  const submitHandler = async () => {
    uploadPostToServer()
    navigation.navigate('DefaultScreen')
    setState(initialState)
    setTakenPhoto(null)
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
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
            <Text onPress={() => {}} style={styles.subTitle}>
              Upload photo
            </Text>
          )}
        </TouchableOpacity>

        <View style={styles.form}>
          <Input
            style={{ ...styles.input, fontFamily: 'Roboto-Medium' }}
            placeholder='Name...'
            placeholderTextColor={colors.textColor}
            value={state.title}
            onChangeText={value => inputValueHandler('title', value)}
          />
          <Input
            leftIcon={
              <SimpleLineIcons
                name='location-pin'
                size={24}
                color={colors.textColor}
                style={{ marginRight: 4 }}
              />
            }
            style={{ ...styles.input, fontFamily: 'Roboto-Regular' }}
            placeholder='Location...'
            placeholderTextColor={colors.textColor}
            value={state.location}
            onChangeText={value => inputValueHandler('location', value)}
          />

          <TouchableOpacity
            style={{
              ...styles.button,
              backgroundColor: takenPhoto ? colors.orange : colors.background,
            }}
            onPress={submitHandler}
          >
            <Text
              style={{
                ...styles.buttonText,
                color: takenPhoto ? colors.white : colors.textColor,
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
          <AntDesign name='delete' size={24} color={colors.textColor} />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  photoContainer: {
    marginHorizontal: 16,
    height: 240,
  },
  photo: {
    width: '100%',
    height: '100%',
    borderColor: colors.borderColor,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderRadius: 8,
  },
  subTitle: {
    color: colors.textColor,
    fontSize: 16,
    marginHorizontal: 16,
    marginTop: 8,
  },
  form: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  input: {
    marginTop: 16,
    paddingTop: 16,
    paddingLeft: 0,
    paddingBottom: 15,
    fontSize: 16,
    borderBottomColor: colors.textColor,
    color: colors.black,
  },
  button: {
    borderRadius: 100,
    padding: 16,
    marginTop: 32,
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.black,
  },
  buttonText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
  },
  deleteBtn: {
    alignSelf: 'center',
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
})
