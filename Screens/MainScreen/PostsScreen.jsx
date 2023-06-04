import { AntDesign, Ionicons } from '@expo/vector-icons'
import { createStackNavigator } from '@react-navigation/stack'
import { COLORS, SPACE, FONTS, FONTSIZES } from '../../constants/theme'
import DefaultScreenPosts from '../NestedScreen/DefaultScreenPosts'
import CommentsScreen from '../NestedScreen/CommentsScreen'
import MapScreen from '../NestedScreen/MapScreen'
import { useDispatch } from 'react-redux'
import { authSignOutUser } from '../../redux/authOperations'

const NestedScreen = createStackNavigator()

export default function PostsScreen() {
  const dispatch = useDispatch()

  return (
    <NestedScreen.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: FONTS.medium,
          fontSize: FONTSIZES[3],
          lineHeight: 22,
          color: COLORS.black,
        },
      }}
    >
      <NestedScreen.Screen
        name='DefaultScreen'
        component={DefaultScreenPosts}
        options={{
          title: 'Posts',
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name='appstore-o' size={24} color={COLORS.iconColor} />
          ),
          headerRight: () => (
            <Ionicons
              onPress={() => dispatch(authSignOutUser())}
              name='exit-outline'
              size={24}
              style={{ marginRight: SPACE[3] }}
              color={COLORS.textColor}
            />
          ),
        }}
      />
      <NestedScreen.Screen
        name='Comments'
        component={CommentsScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Ionicons
              onPress={() => navigation.goBack()}
              name='arrow-back'
              size={24}
              color={COLORS.iconColor}
              style={{ marginLeft: SPACE[3] }}
            />
          ),
        })}
      />
      <NestedScreen.Screen
        name='Map'
        component={MapScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Ionicons
              onPress={() => navigation.goBack()}
              name='arrow-back'
              size={24}
              color={COLORS.iconColor}
              style={{ marginLeft: SPACE[3] }}
            />
          ),
        })}
      />
    </NestedScreen.Navigator>
  )
}
