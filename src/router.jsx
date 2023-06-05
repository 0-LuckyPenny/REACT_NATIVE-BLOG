import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons'
import { COLORS, SPACE, FONTS, FONTSIZES } from './constants/theme'
import RegistrationScreen from './screens/Auth/RegistrationScreen'
import LoginScreen from './screens/Auth/LoginScreen'
import ProfileScreen from './screens/MainScreen/ProfileScreen'
import CreatePostsScreen from './screens/MainScreen/CreatePostsScreen'
import PostsScreen from './screens/MainScreen/PostsScreen'

const AuthStack = createStackNavigator()
const MainTab = createBottomTabNavigator()

export const useRoute = isAuth => {
  if (!isAuth) {
    return (
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
    )
  }
  return (
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
  )
}
