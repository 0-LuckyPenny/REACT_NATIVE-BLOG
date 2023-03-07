import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

import LoginScreen from "./Screens/Auth/LoginScreen";
import RegistrationScreen from "./Screens/Auth/RegistrationScreen";
import CreatePostsScreen from "./Screens/MainScreen/CreatePostsScreen";
import ProfileScreen from "./Screens/MainScreen/ProfileScreen";
import PostsScreen from "./Screens/MainScreen/PostsScreen";
import Home from "./Screens/MainScreen/Home";
import { TouchableOpacity } from "react-native";
import { colors } from "./helpers/colors";

export const useRoute = (isAuth) => {
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
        <AuthStack.Screen
          name='Home'
          component={Home}
          // options={{
          //   title: "Posts",
          //   headerStyle: {
          //     backgroundColor: colors.white,
          //   },
          //   headerTintColor: colors.black,
          //   headerTitleStyle: {
          //     fontFamily: "Roboto-Medium",
          //     fontSize: 17,
          //     textAlign: "center",
          //   },
          //   headerRight: () => (
          //     <TouchableOpacity onPress={() => {}}>
          //       <Ionicons
          //         name='exit-outline'
          //         size={24}
          //         style={{ marginRight: 16 }}
          //       />
          //     </TouchableOpacity>
          //   ),
          // }}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <>
      <Home />
    </>
    // <MainTab.Navigator screenOptions={{ tabBarShowLabel: false }}>
    //   <MainTab.Screen
    //     name='Posts'
    //     component={PostsScreen}
    //     options={{
    //       tabBarIcon: ({ focused, color, size }) => (
    //         <AntDesign name='appstore-o' size={size} color={color} />
    //       ),
    //     }}
    //   />
    //   <MainTab.Screen
    //     name='Create'
    //     component={CreatePostsScreen}
    //     options={{
    //       tabBarIcon: ({ focused, color, size }) => (
    //         <AntDesign name='pluscircleo' size={size} color={color} />
    //       ),
    //     }}
    //   />
    //   <MainTab.Screen
    //     name='Profile'
    //     component={ProfileScreen}
    //     options={{
    //       tabBarIcon: ({ focused, color, size }) => (
    //         <Feather name='user' size={size} color={color} />
    //       ),
    //     }}
    //   />
    // </MainTab.Navigator>
  );
};
