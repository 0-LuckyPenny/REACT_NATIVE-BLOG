import { AntDesign, Ionicons } from '@expo/vector-icons'
import { createStackNavigator } from '@react-navigation/stack'
import { colors } from '../../helpers/colors'
import DefaultScreenPosts from '../NestedScreen/DefaultScreenPosts'
import CommentsScreen from '../NestedScreen/CommentsScreen'
import MapScreen from '../NestedScreen/MapScreen'
import { useDispatch } from 'react-redux'
import { authSignOutUser } from '../../redux/auth/authOperations'

const NestedScreen = createStackNavigator()

export default function PostsScreen() {
  const dispatch = useDispatch()

  return (
    <NestedScreen.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'Roboto-Medium',
          fontSize: 17,
          lineHeight: 22,
          color: colors.black,
        },
      }}
    >
      <NestedScreen.Screen
        name='DefaultScreen'
        component={DefaultScreenPosts}
        options={{
          title: 'Posts',
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name='appstore-o' size={24} color={colors.iconColor} />
          ),
          headerRight: () => (
            <Ionicons
              onPress={() => dispatch(authSignOutUser())}
              name='exit-outline'
              size={24}
              style={{ marginRight: 16 }}
              color={colors.textColor}
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
              color={colors.iconColor}
              style={{ marginLeft: 16 }}
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
              color={colors.iconColor}
              style={{ marginLeft: 16 }}
            />
          ),
        })}
      />
    </NestedScreen.Navigator>
  )
}
