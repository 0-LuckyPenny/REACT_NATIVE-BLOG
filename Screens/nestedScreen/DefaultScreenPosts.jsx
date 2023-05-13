import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import { colors } from '../../helpers/colors'
import Post from '../../components/Post'
import { collection, getFirestore, onSnapshot } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { likedPostsHandler } from '../../helpers/likedPostsHandler'
import { app } from '../../firebase/config'

const db = getFirestore(app)

export default function DefaultScreenPosts({ route, navigation }) {
  const [initPosts, setInitPosts] = useState([])
  const [updatedPosts, setUpdatedPosts] = useState([])

  const { userId, nickName, userEmail, userPhoto } = useSelector(
    state => state.auth
  )

  const getAllPosts = async () => {
    onSnapshot(collection(db, 'posts'), snapshot => {
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  profileContainer: {
    marginHorizontal: 16,
    marginTop: 32,
  },
  userImageBox: {
    position: 'relative',
    width: 60,
    height: 60,
    borderRadius: 16,
    resizeMode: 'cover',
    backgroundColor: colors.background,
  },
  userData: {
    position: 'absolute',
    top: 16,
    left: 60,
    marginLeft: 8,
    color: colors.black,
  },
  userName: {
    fontFamily: 'Roboto-Bold',
    fontSize: 13,
  },
  userEmail: {
    fontFamily: 'Roboto-Regular',
    fontSize: 11,
  },
})
