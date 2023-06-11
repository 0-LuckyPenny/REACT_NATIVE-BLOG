import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons'
import { COLORS, SPACE } from './src/constants/theme'
import RegistrationScreen from './src/screens/Auth/RegistrationScreen'
import LoginScreen from './src/screens/Auth/LoginScreen'
import ProfileScreen from './src/screens/MainScreen/ProfileScreen'
import CreatePostsScreen from './src/screens/MainScreen/CreatePostsScreen'
import PostsScreen from './src/screens/MainScreen/PostsScreen'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuth } from './src/redux/selectors'
import { NavigationContainer } from '@react-navigation/native'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './src/firebase/config'
import { authStateChangeUser } from './src/redux/authOperations'

const AuthStack = createStackNavigator()
const MainTab = createBottomTabNavigator()

export const Router = () => {
  const { stateChange } = useSelector(selectAuth)

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

  if (!stateChange) {
    return (
      <NavigationContainer>
        <AuthStack.Navigator initialRouteName='Register'>
          <AuthStack.Screen
            options={{ headerShown: false }}
            name='Login'
            component={LoginScreen}
          />
          <AuthStack.Screen
            options={{ headerShown: false }}
            name='Register'
            component={RegistrationScreen}
          />
        </AuthStack.Navigator>
      </NavigationContainer>
    )
  }
  return (
    <NavigationContainer>
      <MainTab.Navigator
        initialRouteName='Posts'
        screenOptions={{
          tabBarShowLabel: false,
          headerTitleAlign: 'center',
        }}
      >
        <MainTab.Screen
          name='Posts'
          component={PostsScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <AntDesign name='appstore-o' size={24} color={COLORS.iconColor} />
            ),
          }}
        />
        <MainTab.Screen
          name='Create'
          component={CreatePostsScreen}
          options={({ navigation }) => ({
            title: 'Create post',
            tabBarStyle: { display: 'none' },
            tabBarIcon: ({ focused, color, size }) => (
              <AntDesign name='plus' size={24} color={COLORS.iconColor} />
            ),
            headerLeft: () => (
              <Ionicons
                onPress={() => navigation.navigate('Posts')}
                name='arrow-back'
                size={24}
                color={COLORS.iconColor}
                style={{ marginLeft: SPACE[3] }}
              />
            ),
          })}
        />
        <MainTab.Screen
          name='Profile'
          component={ProfileScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <Feather name='user' size={24} color={COLORS.iconColor} />
            ),
          }}
        />
      </MainTab.Navigator>
    </NavigationContainer>
  )
}
