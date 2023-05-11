import { useEffect, useState } from 'react'
import { Ionicons, AntDesign } from '@expo/vector-icons'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Image,
  Platform,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native'
import { colors } from '../../helpers/colors'
import Post from '../../components/Post'
import { useDispatch, useSelector } from 'react-redux'
import { authSignOutUser } from '../../redux/auth/authOperations'
import { likedPostsHandler } from '../../helpers/likedPostsHandler'
import { handleImagePicker } from '../../helpers/handleImagePicker.js'
import { addUserPhoto } from '../../helpers/addUserPhoto'
import { app, auth } from '../../firebase/config'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { removeUserPhoto } from '../../helpers/removeUserPhoto'
import { AvatarBox } from '../../components/AvatarBox'

const db = getFirestore(app)
const storage = getStorage()

export default function ProfileScreen({ navigation }) {
  const [initPosts, setInitPosts] = useState([])
  const [updatedPosts, setUpdatedPosts] = useState([])
  const [newUserPhoto, setNewUserPhoto] = useState(null)
  const dispatch = useDispatch()
  const { uid, displayName, photoURL } = auth.currentUser
  const { nickName, userId } = useSelector(state => state.auth)

  useEffect(() => {
    getUserPosts()
  }, [])

  useEffect(() => {
    setUpdatedPosts(likedPostsHandler(initPosts, uid))
  }, [initPosts])

  const getUserPosts = async () => {
    const q = query(collection(db, 'posts'), where('userId', '==', userId))
    await onSnapshot(q, snapshot => {
      setInitPosts(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    })
  }

  const uploadedUserImage = async (login, avatar) => {
    const storageRef = ref(storage, `usersAvatars/${login}.jpg`)
    const response = await fetch(avatar)
    const uploadedFile = await response.blob()
    await uploadBytes(storageRef, uploadedFile)

    const photoUrl = await getDownloadURL(
      ref(storage, `usersAvatars/${login}.jpg`)
    )
    return photoUrl
  }

  const getUserPhoto = async () => {
    const result = await handleImagePicker()
    setNewUserPhoto(result)
    const photoForDownload = await uploadedUserImage(displayName, result)
    addUserPhoto(photoForDownload)
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bgImage}
        source={require('../../assets/images/bg_image.jpg')}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={-100}
        >
          <View style={styles.profileContainer}>
            <Ionicons
              name='exit-outline'
              size={24}
              color={colors.textColor}
              style={styles.logoutIcon}
              onPress={() => dispatch(authSignOutUser())}
            />
            <AvatarBox
              photoURL={photoURL}
              getUserPhoto={getUserPhoto}
              newUserPhoto={newUserPhoto}
              removeUserPhoto={removeUserPhoto}
            />

            <Text style={styles.title}>{nickName}</Text>
            <FlatList
              data={updatedPosts}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <Post
                  photo={item.photo}
                  title={item.title}
                  comments={item.commentsValue}
                  likes={item.likes}
                  location={item.location}
                  toComment={() =>
                    navigation.navigate('Comments', { data: item })
                  }
                  toMap={() =>
                    navigation.navigate('Map', {
                      location: item.location,
                      coords: item.coords,
                      title: item.title,
                    })
                  }
                />
              )}
            />
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  profileContainer: {
    position: 'relative',
    alignItems: 'flex-end',
    marginTop: 103,
    backgroundColor: colors.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  logoutIcon: {
    marginTop: 22,
    marginHorizontal: 16,
  },
  userImage: {
    borderRadius: 16,
    backgroundColor: colors.background,
  },
  btnAddUserImage: {
    position: 'absolute',
    transform: [{ rotate: '-45deg' }],
    bottom: 14,
    right: -12.5,
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12.5,
    borderWidth: 1,
    borderColor: colors.borderColor,
    backgroundColor: colors.white,
  },
  title: {
    marginTop: 46,
    fontSize: 30,
    color: colors.black,
    fontFamily: 'Roboto-Medium',
    lineHeight: 35,
    alignSelf: 'center',
  },
})
