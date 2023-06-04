import { useState, useEffect } from 'react'
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  Keyboard,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native'
import {
  COLORS,
  FONTS,
  SPACE,
  FONTSIZES,
  RADII,
} from '../../constants/theme'
import { AntDesign } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import {
  collection,
  onSnapshot,
  addDoc,
  Timestamp,
  updateDoc,
  doc,
} from 'firebase/firestore'
import dayjs from 'dayjs'
import { selectAuth } from '../../redux/selectors'
import { firestore } from '../../firebase/config'
import { Comment } from '../../components'

export default function CommentsScreen({ route }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [allComments, setAllComments] = useState([])
  const [commentsNumber, setCommentsNumber] = useState(0)
  const { id, photo } = route.params.data
  const { userId, nickName, userPhoto } = useSelector(selectAuth)

  useEffect(() => {
    getAllComments()
  }, [])

  useEffect(() => {
    setCommentsNumber(allComments.length)
  }, [allComments])

  useEffect(() => {
    updateCommentsNumber()
  }, [commentsNumber])

  const getAllComments = async () => {
    await onSnapshot(
      collection(firestore, 'posts', id, 'comments'),
      snapshot => {
        setAllComments(
          snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        )
      }
    )
  }

  allComments.map(comment => {
    dayjs(comment.createdAt).format('DD MMMM, YYYY | HH:mm')
  })

  const addComment = async () => {
    try {
      const docRef = await addDoc(
        collection(firestore, 'posts', id, 'comments'),
        {
          newComment,
          createdAt: new Timestamp.now().toMillis(),
          userId,
          userPhoto,
          userNickName: nickName,
        }
      )
      console.log('Document written with ID: ', docRef.id)
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  const showKeyboardHandler = () => {
    setIsShowKeyboard(false)
    Keyboard.dismiss()
  }

  const updateCommentsNumber = async () => {
    const postsCollectionRef = doc(firestore, 'posts', id)
    await updateDoc(postsCollectionRef, {
      commentsNumber,
    })
  }

  const submitHandler = async () => {
    await addComment()
    setNewComment('')
    Keyboard.dismiss()
  }

  return (
    <TouchableWithoutFeedback onPress={showKeyboardHandler}>
      <SafeAreaView style={styles.container}>
        <View style={styles.imageBox}>
          <Image style={styles.image} source={{ uri: photo }} />
        </View>

        <FlatList
          data={allComments}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.commentList}>
              <Comment
                isCurrentUser={item.userId === id ? true : false}
                userNickName={item.userNickName}
                userPhoto={item.userPhoto}
                userComment={item.newComment}
                currentDate={dayjs(item.createdAt).format(
                  'DD MMMM, YYYY | HH:mm'
                )}
              />
            </View>
          )}
        />

        <View style={styles.inputBox}>
          <TextInput
            value={newComment}
            style={styles.input}
            placeholder={'Comment...'}
            placeholderTextColor={COLORS.textColor}
            onChangeText={value => setNewComment(value)}
            onEndEditing={() => showKeyboardHandler()}
            onFocus={() => setIsShowKeyboard(true)}
          />
          <TouchableOpacity
            style={styles.sendBtn}
            activeOpacity={0.6}
            onPress={submitHandler}
          >
            <AntDesign name='arrowup' size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: COLORS.white,
  },
  commentList: {
    marginHorizontal: SPACE[3],
    paddingTop: SPACE[6],
  },
  imageBox: {
    paddingTop: SPACE[6],
    alignItems: 'center',
    marginHorizontal: SPACE[3],
  },
  image: {
    height: 240,
    width: '100%',
    borderRadius: RADII.md,
  },
  inputBox: {
    marginBottom: SPACE[3],
    marginHorizontal: SPACE[3],
  },
  input: {
    paddingLeft: SPACE[3],
    paddingVertical: SPACE[3],
    height: 50,
    borderRadius: RADII.xxxxl,
    borderWidth: 1,
    backgroundColor: COLORS.background,
    borderColor: COLORS.borderColor,
    fontFamily: FONTS.medium,
    fontSize: FONTSIZES[3],
  },
  sendBtn: {
    position: 'absolute',
    top: 8,
    end: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 34,
    height: 34,
    backgroundColor: COLORS.orange,
    borderRadius: 50,
  },
})
