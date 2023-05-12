import { useState, useEffect } from 'react'
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native'
import { colors } from '../../helpers/colors'
import { AntDesign } from '@expo/vector-icons'
import Comment from '../../components/Comment'
import { useSelector } from 'react-redux'
import {
  collection,
  onSnapshot,
  addDoc,
  Timestamp,
  updateDoc,
  doc,
  getFirestore,
} from 'firebase/firestore'
import dayjs from 'dayjs'
import { app } from '../../firebase/config'
import { TouchableWithoutFeedback } from 'react-native'
import { Keyboard } from 'react-native'

const db = getFirestore(app)

export default function CommentsScreen({ route }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [allComments, setAllComments] = useState([])
  const [commentsNumber, setCommentsNumber] = useState(0)
  const { id, photo } = route.params.data
  const { userId, nickName, userPhoto } = useSelector(state => state.auth)

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
    await onSnapshot(collection(db, 'posts', id, 'comments'), snapshot => {
      setAllComments(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    })
  }

  allComments.map(comment => {
    dayjs(comment.createdAt).format('DD MMMM, YYYY | HH:mm')
  })

  const addComment = async () => {
    try {
      const docRef = await addDoc(collection(db, 'posts', id, 'comments'), {
        newComment,
        createdAt: new Timestamp.now().toMillis(),
        userId: userId,
        userPhoto,
        userNickName: nickName,
      })
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
    const postsCollectionRef = doc(db, 'posts', id)
    await updateDoc(postsCollectionRef, {
      commentsNumber,
    })
  }

  const submitHandler = async () => {
    await addComment()
    setNewComment('')
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
                isCurrenUser={item.userId === id ? true : false}
                userNickName={item.userNickName}
                userPhoto={{ uri: item.userPhoto }}
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
            placeholderTextColor={colors.textColor}
            onChangeText={value => setNewComment(value)}
            onEndEditing={() => showKeyboardHandler()}
            onFocus={() => setIsShowKeyboard(true)}
          />
          <TouchableOpacity
            style={styles.sendBtn}
            activeOpacity={0.6}
            onPress={submitHandler}
          >
            <AntDesign name='arrowup' size={24} color={colors.white} />
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
    backgroundColor: colors.white,
  },
  commentList: {
    marginHorizontal: 16,
    paddingTop: 32,
  },
  imageBox: {
    paddingTop: 32,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  image: {
    height: 240,
    width: '100%',
    borderRadius: 8,
  },
  inputBox: {
    marginBottom: 16,
    marginHorizontal: 16,
  },
  input: {
    paddingLeft: 16,
    paddingVertical: 16,
    height: 50,
    borderRadius: 100,
    borderWidth: 1,
    backgroundColor: colors.background,
    borderColor: colors.borderColor,
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
  },
  sendBtn: {
    position: 'absolute',
    top: 8,
    end: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 34,
    height: 34,
    backgroundColor: colors.orange,
    borderRadius: 50,
  },
})
