import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons'
import { colors } from './helpers/colors'
import RegistrationScreen from './Screens/Auth/RegistrationScreen'
import LoginScreen from './Screens/Auth/LoginScreen'
import ProfileScreen from './Screens/MainScreen/ProfileScreen'
import CreatePostsScreen from './Screens/MainScreen/CreatePostsScreen'
import PostsScreen from './Screens/MainScreen/PostsScreen'

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
        headerTitleStyle: {
          fontFamily: 'Roboto-Medium',
          fontSize: 17,
          lineHeight: 22,
          color: colors.black,
        },
      }}
    >
      <MainTab.Screen
        name='Posts'
        component={PostsScreen}
        options={{
          title: 'Posts',
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name='appstore-o' size={24} color={colors.iconColor} />
          ),
          headerRight: () => (
            <Ionicons
              onPress={() => {}}
              name='exit-outline'
              size={24}
              style={{ marginRight: 16 }}
              color={colors.textColor}
            />
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
            <AntDesign name='plus' size={24} color={colors.iconColor} />
          ),
          headerLeft: () => (
            <Ionicons
              onPress={() => navigation.navigate('Posts')}
              name='arrow-back'
              size={24}
              color={colors.iconColor}
              style={{ marginLeft: 16 }}
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
            <Feather name='user' size={24} color={colors.iconColor} />
          ),
        }}
      />
    </MainTab.Navigator>
  )
}
