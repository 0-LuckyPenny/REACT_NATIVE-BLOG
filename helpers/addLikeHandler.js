import {
  doc,
  updateDoc,
  increment,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore'
import { db } from '../firebase/config'

export const addLikeHandler = async (initPostsArray, id, userId) => {
  console.log(initPostsArray)
  console.log(id)
  console.log(userId)
  const postsCollectionRef = doc(db, 'posts', id)
  console.log(likesRef)

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
