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
import { AvatarBox, Background, Post } from '../../components'
import { handleImagePicker, likedPostsHandler } from '../../helpers'

export default function ProfileScreen({ navigation }) {
  const [initPosts, setInitPosts] = useState([])
  const [updatedPosts, setUpdatedPosts] = useState([])
  const dispatch = useDispatch()
  const { uid } = auth.currentUser
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
    <Background isProfileScreen={true}>
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
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Post
              updatedPosts={updatedPosts}
              item={item}
              toComment={() => navigation.navigate('Comments', { data: item })}
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
    </Background>
  )
}

const styles = StyleSheet.create({
  profileContainer: {
    position: 'relative',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RADII.xlg,
    borderTopRightRadius: RADII.xlg,
    width: '100%',
    height: '100%',
    paddingTop: 92,
    marginTop: 103,
  },
  logoutIcon: {
    position: 'absolute',
    top: 22,
    right: 16,
  },
  nickName: {
    marginBottom: SPACE[5],
    fontSize: FONTSIZES[8],
    color: COLORS.black,
    fontFamily: FONTS.medium,
    lineHeight: 35,
  },
})
