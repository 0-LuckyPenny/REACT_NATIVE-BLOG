import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { FontAwesome, SimpleLineIcons, AntDesign } from '@expo/vector-icons'
import { COLORS, FONTS, SPACE, FONTSIZES, RADII } from '../constants/theme'
import { addLikeHandler } from '../helpers/addLikeHandler'

export default function Post({
  updatedPosts,
  item,
  toMap,
  toComment,
  isLike = false,
}) {
  return (
    <View style={styles.post}>
      <Image source={{ uri: item.photo }} style={styles.postImg} />
      <Text style={styles.postName}>{item.title}</Text>

      <View style={styles.description}>
        <View style={styles.commentCont}>
          <TouchableOpacity onPress={toComment} style={styles.descriptionItem}>
            <FontAwesome
              name='comment'
              size={24}
              color={item.commentsNumber > 0 ? COLORS.orange : COLORS.textColor}
            />
            <Text style={styles.value}>{item.commentsNumber}</Text>
          </TouchableOpacity>
        </View>

        {isLike && (
          <TouchableOpacity
            style={styles.likes}
            onPress={() => addLikeHandler(updatedPosts, item.id, item.userId)}
          >
            <AntDesign
              name='like2'
              size={24}
              color={item.likesNumber > 0 ? COLORS.orange : COLORS.textColor}
            />
            <Text style={styles.value}>{item.likesNumber}</Text>
          </TouchableOpacity>
        )}

        <View style={styles.locationCont}>
          <TouchableOpacity onPress={toMap} style={styles.descriptionItem}>
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
