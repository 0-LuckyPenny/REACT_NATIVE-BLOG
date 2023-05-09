import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import { colors } from '../../helpers/colors'
import Post from '../../components/Post'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useSelector } from 'react-redux'
import { likedPostsHandler } from '../../helpers/likedPostsHandler'

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
        <Image style={styles.userImage} source={{ uri: userPhoto }} />
        <View style={styles.userData}>
          <Text style={styles.userName}>{nickName}</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>
        </View>
      </View>

      <FlatList
        data={updatedPosts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Post
            photo={item.photo}
            title={item.title}
            comments={item.commentsValue}
            location={item.location}
            toComment={() => navigation.navigate('Comments', { item })}
            toMap={() =>
              navigation.navigate('Map', {
                location: item.location,
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
  userImage: {
    position: 'relative',
    width: 60,
    height: 60,
    borderRadius: 16,
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
