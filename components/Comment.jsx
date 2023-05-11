import { View, Text, StyleSheet, Image } from 'react-native'
import { colors } from '../helpers/colors'

export default function Comment({
  isCurrenUser,
  userNickName,
  userPhoto,
  userComment,
  currentDate,
}) {
  return (
    <View
      style={isCurrenUser ? styles.currentUserComment : styles.otherUserComment}
    >
      <Image style={styles.commentUserPhoto} source={userPhoto} />
      <View
        style={
          isCurrenUser
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
  // commentContainer: {
  //   flexDirection: 'row',
  //   marginBottom: 24,
  //   color: colors.black,
  // },
  // userAva: {
  //   borderRadius: 14,
  //   height: 28,
  //   width: 28,
  // },
  // textContainer: {
  //   flex: 1,
  //   padding: 16,
  //   backgroundColor: colors.background,
  //   fontFamily: 'Roboto-Regular',
  //   marginLeft: 16,
  //   borderBottomLeftRadius: 6,
  //   borderBottomRightRadius: 6,
  //   borderTopRightRadius: 6,
  //   borderTopLeftRadius: 6,
  // },
  // comment: {
  //   fontSize: 13,
  //   color: colors.black,
  //   lineHeight: 18,
  // },
  // date: {
  //   fontSize: 10,
  //   marginTop: 8,
  //   color: colors.textColor,
  //   textAlign: 'right',
  // },
  // currentUserNickName: {
  //   fontWeight: 'bold',
  //   marginBottom: 6,
  // },
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
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 10,
    borderTopRightRadius: 0,
    padding: 10,
  },
  otherUserCommentDescr: {
    width: '100%',
    marginLeft: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
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
  commentUserPhoto: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  currentDate: {
    fontSize: 11,
  },
})
