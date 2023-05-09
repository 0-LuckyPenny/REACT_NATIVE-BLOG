import { AntDesign, Ionicons } from '@expo/vector-icons'
import { createStackNavigator } from '@react-navigation/stack'
import { colors } from '../../helpers/colors'
import DefaultScreenPosts from '../nestedScreen/DefaultScreenPosts'
import CommentsScreen from '../nestedScreen/CommentsScreen'
import MapScreen from '../nestedScreen/MapScreen'
const NestedScreen = createStackNavigator()

export default function PostsScreen() {
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
        options={{ headerShown: false }}
        name='DefaultScreen'
        component={DefaultScreenPosts}
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
