import { View, Text, StyleSheet, Image } from 'react-native'
import { colors } from '../helpers/colors'

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
    paddingRight: 60,
    width: '100%',
    marginBottom: 24,
  },
  otherUserComment: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    textAlign: 'right',
    paddingRight: 60,
    width: '100%',
    marginBottom: 24,
  },
  currentUserCommentDescr: {
    width: '100%',
    marginRight: 16,
    backgroundColor: colors.bgWithOpacity,
    borderRadius: 10,
    borderTopRightRadius: 0,
    padding: 10,
  },
  otherUserCommentDescr: {
    width: '100%',
    marginLeft: 16,
    backgroundColor: colors.bgWithOpacity,
    borderRadius: 10,
    borderTopLeftRadius: 0,
    padding: 10,
  },
  userNickName: {
    fontWeight: 'bold',
    marginBottom: 6,
  },
  userComment: {
    marginBottom: 10,
  },
  userPhoto: {
    borderRadius: 20,
    height: 40,
    width: 40,
  },
  photoBox: {
    backgroundColor: colors.background,
    borderRadius: 20,
    height: 40,
    width: 40,
  },
  currentDate: {
    fontSize: 11,
  },
})
