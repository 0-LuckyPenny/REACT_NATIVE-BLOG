import { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useRoute } from '../router'
import { useDispatch, useSelector } from 'react-redux'
import { authStateChangeUser } from '../redux/auth/authOperations'

export const Main = () => {
  const { stateChange } = useSelector(state => state.auth)

  const routing = useRoute(stateChange)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authStateChangeUser())
  }, [])

  return <NavigationContainer>{routing}</NavigationContainer>
}
