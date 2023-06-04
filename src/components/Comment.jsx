import { View, Text, StyleSheet, Image } from 'react-native'
import {
  COLORS,
  SPACE,
  FONTSIZES,
  RADII,
} from '../constants/theme'

export default function Comment({
  isCurrentUser,
  userNickName,
  userPhoto,
  userComment,
  currentDate,
}) {
  return (
    <View
      style={
        isCurrentUser ? styles.currentUserComment : styles.otherUserComment
      }
    >
      {userPhoto ? (
        <Image style={styles.userPhoto} source={{ uri: userPhoto }} />
      ) : (
        <View style={styles.photoBox} />
      )}

      <View
        style={
          isCurrentUser
            ? styles.currentUserCommentDescr
            : styles.otherUserCommentDescr
        }
      >
        <Text style={styles.userNickName}>{userNickName}</Text>
        <Text style={styles.userComment}>{userComment}</Text>
        <Text style={styles.currentDate}>{currentDate}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  currentUserComment: {
    flexDirection: 'row-reverse',
    flexWrap: 'nowrap',
    width: '100%',
    paddingRight: SPACE[7],
    marginBottom: SPACE[5],
  },
  otherUserComment: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    textAlign: 'right',
    paddingRight: SPACE[7],
    marginBottom: SPACE[5],
    width: '100%',
  },
  currentUserCommentDescr: {
    width: '100%',
    marginRight: SPACE[3],
    backgroundColor: COLORS.bgWithOpacity,
    borderRadius: RADII.l,
    borderTopRightRadius: RADII.none,
    padding: SPACE[2],
  },
  otherUserCommentDescr: {
    width: '100%',
    marginLeft: SPACE[3],
    backgroundColor: COLORS.bgWithOpacity,
    borderRadius: RADII.l,
    borderTopLeftRadius: RADII.none,
    padding: SPACE[2],
  },
  userNickName: {
    fontWeight: 'bold',
    marginBottom: SPACE[2],
  },
  userComment: {
    marginBottom: SPACE[2],
  },
  userPhoto: {
    borderRadius: RADII.xxl,
    height: 40,
    width: 40,
  },
  photoBox: {
    backgroundColor: COLORS.background,
    borderRadius: RADII.xxl,
    height: 40,
    width: 40,
  },
  currentDate: {
    fontSize: FONTSIZES[1],
  },
})
