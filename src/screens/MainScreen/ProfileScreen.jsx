import { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text, View } from 'react-native'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { COLORS, FONTS, SPACE, FONTSIZES, RADII } from '../../constants/theme'
import { useDispatch, useSelector } from 'react-redux'
import {
  authSignOutUser,
  removeAvatarFromServer,
  uploadAvatarToServer,
} from '../../redux/authOperations'
import { firestore } from '../../firebase/config'
import { selectAuth } from '../../redux/selectors'
import { AvatarBox, Background, Loader, PostList } from '../../components'
import { handleImagePicker } from '../../helpers'

export default function ProfileScreen({ navigation }) {
  const [initPosts, setInitPosts] = useState([])

  const dispatch = useDispatch()
  const { isLoading, nickName, userId, userPhoto } = useSelector(selectAuth)

  useEffect(() => {
    getUserPosts()
  }, [])

  const getUserPosts = async () => {
    const q = query(
      collection(firestore, 'posts'),
      where('userId', '==', userId)
    )
    onSnapshot(q, snapshot => {
      setInitPosts(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    })
  }

  const getUserPhoto = async () => {
    const result = await handleImagePicker()
    dispatch(uploadAvatarToServer(result))
  }

  if (isLoading) {
    return <Loader />
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
          removeUserPhoto={() => dispatch(removeAvatarFromServer())}
        />
        <Text style={styles.nickName}>{nickName}</Text>

        <PostList
          initPosts={initPosts}
          navigation={navigation}
          userId={userId}
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
