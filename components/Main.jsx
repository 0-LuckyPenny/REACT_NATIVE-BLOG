import { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useRoute } from '../router'
import { useDispatch, useSelector } from 'react-redux'
import { authStateChangeUser } from '../redux/authOperations'
import { selectAuth } from '../redux/selectors'
import { auth } from '../firebase/config'
import { onAuthStateChanged } from 'firebase/auth'

export const Main = () => {
  const { stateChange } = useSelector(selectAuth)

  const routing = useRoute(stateChange)

  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        const { uid, displayName, email, photoURL } = user
        dispatch(
          authStateChangeUser({
            uid,
            displayName,
            email,
            photoURL,
          })
        )
      }
    })
    return unsubscribe
  }, [])

  return <NavigationContainer>{routing}</NavigationContainer>
}
