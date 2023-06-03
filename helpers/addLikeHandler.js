import {
  doc,
  updateDoc,
  increment,
  arrayUnion,
  arrayRemove,
  getFirestore,
} from 'firebase/firestore'
import { app } from '../firebase/config'

const db = getFirestore(app)

export const addLikeHandler = async (initPostsArray, id, userId) => {
  const postsCollectionRef = doc(db, 'posts', id)

  initPostsArray?.map(post => {
    if (!post.likes.includes(userId)) {
      updateDoc(postsCollectionRef, {
        likesNumber: increment(1),
        likes: arrayUnion(userId),
      })
    } else {
      updateDoc(postsCollectionRef, {
        likesNumber: increment(-1),
        likes: arrayRemove(userId),
      })
    }
  })
}
