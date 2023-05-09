export const likedPostsHandler = (initPostsArray, uid) => {
  const newPostsArray = initPostsArray?.map(post => {
    if (post.likes.includes(uid)) {
      return { ...post, isLiked: true }
    } else return post
  })

  return newPostsArray
}
