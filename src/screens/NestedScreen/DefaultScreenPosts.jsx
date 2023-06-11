import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { collection, onSnapshot } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { COLORS, FONTS, SPACE, FONTSIZES, RADII } from '../../constants/theme'
import { Loader, PostList } from '../../components'
import { firestore } from '../../firebase/config'
import { selectAuth } from '../../redux/selectors'

export default function DefaultScreenPosts({ navigation }) {
  const [initPosts, setInitPosts] = useState([])
  const { isLoading, nickName, userEmail, userId, userPhoto } =
    useSelector(selectAuth)

  const getAllPosts = async () => {
    onSnapshot(collection(firestore, 'posts'), snapshot => {
      setInitPosts(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    })
  }

  useEffect(() => {
    getAllPosts()
  }, [])

  if (isLoading) {
    return <Loader />
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {userPhoto ? (
          <Image source={{ uri: userPhoto }} style={styles.userImageBox} />
        ) : (
          <View style={styles.userImageBox} />
        )}

        <View style={styles.userData}>
          <Text style={styles.userName}>{nickName}</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>
        </View>
      </View>

      <PostList initPosts={initPosts} navigation={navigation} userId={userId} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: SPACE[6],
  },
  profileContainer: {
    marginHorizontal: SPACE[3],
    marginBottom: SPACE[6],
  },
  userImageBox: {
    position: 'relative',
    width: 60,
    height: 60,
    borderRadius: RADII.lg,
    resizeMode: 'cover',
    backgroundColor: COLORS.background,
  },
  userData: {
    position: 'absolute',
    top: 16,
    left: 60,
    marginLeft: SPACE[2],
    color: COLORS.black,
  },
  userName: {
    fontFamily: FONTS.medium,
    fontSize: FONTSIZES[2],
  },
  userEmail: {
    fontFamily: FONTS.regular,
    fontSize: FONTSIZES[1],
  },
})
