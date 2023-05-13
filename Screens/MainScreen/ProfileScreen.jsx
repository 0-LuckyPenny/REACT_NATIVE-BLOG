import { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
  FlatList,
  SafeAreaView,
  ScrollView,
} from 'react-native'
import { colors } from '../../helpers/colors'
import Post from '../../components/Post'
import { useDispatch, useSelector } from 'react-redux'
import { authSignOutUser } from '../../redux/auth/authOperations'
import { likedPostsHandler } from '../../helpers/likedPostsHandler'
import { handleImagePicker } from '../../helpers/handleImagePicker.js'
import { addUserPhoto } from '../../helpers/addUserPhoto'
import { app } from '../../firebase/config'
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import { removeUserPhoto } from '../../helpers/removeUserPhoto'
import { AvatarBox } from '../../components/AvatarBox'
import { getAuth } from 'firebase/auth'
import { uploadPhotoToServer } from '../../helpers/uploadPhotoToServer'

const db = getFirestore(app)
const auth = getAuth(app)

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

  const getUserPhoto = async () => {
    const result = await handleImagePicker()
    setNewUserPhoto(result)
    const photoForDownload = await uploadPhotoToServer(result, 'usersAvatars')
    addUserPhoto(photoForDownload)
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bgImage}
        source={require('../../assets/images/bg_image.jpg')}
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
          <Text style={styles.nickName}>{nickName}</Text>

          <FlatList
            data={updatedPosts}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Post
                updatedPosts={updatedPosts}
                item={item}
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
  },
  profileContainer: {
    position: 'relative',
    alignItems: 'flex-end',
    marginTop: 103,
    backgroundColor: colors.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    // width: '100%',
    // height: '100%',
  },
  logoutIcon: {
    marginTop: 22,
    marginHorizontal: 16,
  },
  nickName: {
    marginTop: 32,
    fontSize: 30,
    color: colors.black,
    fontFamily: 'Roboto-Medium',
    lineHeight: 35,
    alignSelf: 'center',
  },
})
