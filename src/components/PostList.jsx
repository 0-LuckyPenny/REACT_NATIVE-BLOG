import { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import { FontAwesome, SimpleLineIcons, AntDesign } from '@expo/vector-icons'
import { COLORS, FONTS, SPACE, FONTSIZES, RADII } from '../constants/theme'
import { addLikeHandler } from '../helpers/addLikeHandler'
import { likedPostsHandler } from '../helpers'

export default function PostList({ initPosts, navigation, userId }) {
  const [updatedPosts, setUpdatedPosts] = useState([])

  useEffect(() => {
    setUpdatedPosts(likedPostsHandler(initPosts, userId))
  }, [initPosts])

  return (
    <FlatList
      data={updatedPosts}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={styles.post}>
          <Image source={{ uri: item.photo }} style={styles.postImg} />
          <Text style={styles.postName}>{item.title}</Text>

          <View style={styles.description}>
            <View style={styles.commentCont}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Comments', { data: item })}
                style={styles.descriptionItem}
              >
                <FontAwesome
                  name='comment'
                  size={24}
                  color={
                    item.commentsNumber > 0 ? COLORS.orange : COLORS.textColor
                  }
                />
                <Text style={styles.value}>{item.commentsNumber}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.likes}
              onPress={() => addLikeHandler(item, userId)}
            >
              <AntDesign
                name='like2'
                size={24}
                color={item.isLiked ? COLORS.orange : COLORS.textColor}
              />
              <Text style={styles.value}>{item.likes.length}</Text>
            </TouchableOpacity>

            <View style={styles.locationCont}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Map', {
                    location: item.location,
                    coords: item.coords,
                    title: item.title,
                  })
                }
                style={styles.descriptionItem}
              >
                <SimpleLineIcons
                  name='location-pin'
                  size={24}
                  color={COLORS.textColor}
                />
                <Text style={styles.locationName}>{item.location}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  post: {
    marginTop: SPACE[4],
    marginHorizontal: SPACE[3],
  },
  postImg: {
    height: 240,
    width: 360,
    borderRadius: RADII.md,
  },
  postName: {
    fontSize: FONTSIZES[3],
    fontFamily: FONTS.medium,
    marginTop: 8,
    color: COLORS.black,
  },
  description: {
    flexDirection: 'row',
    marginTop: SPACE[2],
    justifyContent: 'space-between',
  },
  descriptionItem: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  commentCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    marginLeft: SPACE[2],
    fontSize: FONTSIZES[3],
  },
  likes: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: SPACE[5],
  },
  locationCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationName: {
    marginLeft: SPACE[1],
    fontSize: FONTSIZES[3],
    color: COLORS.black,
    textDecorationLine: 'underline',
  },
})
