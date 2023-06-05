import { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text, View, ImageBackground, FlatList } from 'react-native'
import { COLORS, FONTS, SPACE, FONTSIZES, RADII } from '../../constants/theme'
import { useDispatch, useSelector } from 'react-redux'
import {
  authSignOutUser,
  removeAvatarFromServer,
  uploadAvatarToServer,
} from '../../redux/authOperations'
import { auth, firestore } from '../../firebase/config'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { selectAuth } from '../../redux/selectors'
import { AvatarBox, Post } from '../../components'
import { handleImagePicker, likedPostsHandler } from '../../helpers'

export default function ProfileScreen({ navigation }) {
  const [initPosts, setInitPosts] = useState([])
  const [updatedPosts, setUpdatedPosts] = useState([])
  const [newUserPhoto, setNewUserPhoto] = useState(null)
  const dispatch = useDispatch()
  const { uid, photoURL } = auth.currentUser
  const { nickName, userId, userPhoto } = useSelector(selectAuth)

  useEffect(() => {
    getUserPosts()
  }, [])

  useEffect(() => {
    setUpdatedPosts(likedPostsHandler(initPosts, uid))
  }, [initPosts])

  const getUserPosts = async () => {
    const q = query(
      collection(firestore, 'posts'),
      where('userId', '==', userId)
    )
    await onSnapshot(q, snapshot => {
      setInitPosts(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    })
  }

  const removeUserAvatar = () => {
    dispatch(removeAvatarFromServer())
  }

  const getUserPhoto = async () => {
    const result = await handleImagePicker()
    dispatch(uploadAvatarToServer(result))
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
            color={COLORS.textColor}
            style={styles.logoutIcon}
            onPress={() => dispatch(authSignOutUser())}
          />
          <AvatarBox
            userPhoto={userPhoto}
            getUserPhoto={getUserPhoto}
            removeUserPhoto={removeUserAvatar}
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
    backgroundColor: COLORS.white,
  },
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  profileContainer: {
    position: 'relative',
    alignItems: 'flex-end',
    marginTop: 103,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RADII.xlg,
    borderTopRightRadius: RADII.xlg,
    width: '100%',
    height: '100%',
  },
  logoutIcon: {
    marginTop: SPACE[4],
    marginHorizontal: SPACE[3],
  },
  nickName: {
    marginTop: SPACE[6],
    fontSize: FONTSIZES[8],
    color: COLORS.black,
    fontFamily: FONTS.medium,
    lineHeight: 35,
    alignSelf: 'center',
  },
})
