import { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
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
} from 'firebase/firestore'
import { db } from '../../firebase/config'
import dayjs from 'dayjs'

export default function CommentsScreen({ route }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [allComments, setAllComments] = useState([])
  const [commentsNumber, setCommentsNumber] = useState(0)

  const { userId, nickName, userPhoto } = useSelector(state => state.auth)
  const { id, photo } = route.params.item

  const newCommentHandler = comment => {
    setNewComment(comment)
  }

  const getAllComments = async () => {
    await onSnapshot(collection(db, 'posts', id, 'comments'), snapshot => {
      setAllComments(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    })
  }

  allComments.map(comment => {
    dayjs(comment.createdAt).format('DD MMMM, YYYY | HH:mm')
  })

  useEffect(() => {
    getAllComments()
  }, [])

  useEffect(() => {
    upd(allComments.length)
  }, [allComments])

  useEffect(() => {
    updateCommentsNumber()
  }, [commentsNumber])

  const addComment = async () => {
    try {
      const docRef = await addDoc(collection(db, 'posts', id, 'comments'), {
        newComment,
        createdAt: new Timestamp.now().toMillis(),
        userId: userId,
        userPhoto: userPhoto.toString(),
        userNickName: nickName,
      })
      console.log('Document written with ID: ', docRef.id)
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  const activeInputHandler = () => {
    setIsShowKeyboard(true)
  }

  const showKeyboardHandler = () => {
    setIsShowKeyboard(false)
    Keyboard.dismiss()
  }

  const upd = allComments => {
    const test = allComments
    setCommentsNumber(test)
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
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.commentList}>
          <Image
            style={styles.postImage}
            source={{ uri: route.params.item.photo }}
          />
          <Comment
            userAva={require('../../assets/images/avaComent.jpg')}
            comment={5454}
            date={55454}
          />

          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder={'Comment...'}
              placeholderTextColor={colors.textColor}
            />
            <TouchableOpacity style={styles.sendBtn} activeOpacity={0.6}>
              <AntDesign name='arrowup' size={24} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  commentList: {
    marginHorizontal: 16,
  },
  postImage: {
    marginVertical: 32,
    height: 240,
    width: '100%',
    borderRadius: 8,
  },
  inputBox: {
    marginBottom: 16,
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
