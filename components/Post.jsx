import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { FontAwesome, SimpleLineIcons, AntDesign } from '@expo/vector-icons'
import { colors } from '../helpers/colors'

export default function Post({
  photo,
  title,
  commentsValue,
  location,
  likes,
  toMap,
  toComment,
}) {
  return (
    <View style={styles.post}>
      <Image source={{ uri: photo }} style={styles.postImg} />
      <Text style={styles.postName}>{title}</Text>

      <View style={styles.description}>
        <View style={styles.commentCont}>
          <TouchableOpacity onPress={toComment} style={styles.descriptionItem}>
            <FontAwesome
              name='comment-o'
              size={24}
              color={commentsValue > 0 ? colors.orange : colors.textColor}
              style={[commentsValue > 0 && { backgroundColor: colors.orange }]}
            />
            <Text style={styles.commentsValue}>{commentsValue}</Text>
          </TouchableOpacity>
        </View>

        {likes && (
          <View style={styles.likes}>
            <AntDesign name='like2' size={24} color={colors.orange} />
            <Text style={{ marginLeft: 6 }}>{likes}</Text>
          </View>
        )}

        <View style={styles.locationCont}>
          <TouchableOpacity onPress={toMap} style={styles.descriptionItem}>
            <SimpleLineIcons
              name='location-pin'
              size={24}
              color={colors.textColor}
            />
            <Text style={styles.locationName}>{location}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  post: {
    marginTop: 32,
    marginHorizontal: 16,
  },
  postImg: {
    height: 240,
    width: 360,
    borderRadius: 8,
  },
  postName: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    marginTop: 8,
    color: colors.black,
  },
  description: {
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'space-between',
  },
  descriptionItem: {
    flexDirection: 'row',
  },
  commentCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentsValue: {
    marginLeft: 8,
    fontSize: 16,
  },
  likes: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 24,
  },
  locationCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationName: {
    marginLeft: 4,
    fontSize: 16,
    color: colors.black,
    textDecorationLine: 'underline',
  },
})
