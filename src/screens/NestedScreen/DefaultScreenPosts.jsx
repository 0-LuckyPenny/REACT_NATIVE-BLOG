import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import { COLORS, FONTS, SPACE, FONTSIZES, RADII } from '../../constants/theme'
import { collection, onSnapshot } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { likedPostsHandler } from '../../helpers'
import { Post } from '../../components'
import { firestore } from '../../firebase/config'
import { selectAuth } from '../../redux/selectors'

export default function DefaultScreenPosts({ route, navigation }) {
  const [initPosts, setInitPosts] = useState([])
  const [updatedPosts, setUpdatedPosts] = useState([])
  const { userId, nickName, userEmail, userPhoto } = useSelector(selectAuth)

  const getAllPosts = async () => {
    onSnapshot(collection(firestore, 'posts'), snapshot => {
      setInitPosts(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    })
  }

  useEffect(() => {
    getAllPosts()
  }, [])

  useEffect(() => {
    setUpdatedPosts(likedPostsHandler(initPosts, userId))
  }, [initPosts])

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

      <FlatList
        data={updatedPosts}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Post
            isLike={true}
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
