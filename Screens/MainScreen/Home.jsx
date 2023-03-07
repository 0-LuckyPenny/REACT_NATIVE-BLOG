import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import ProfileScreen from "./ProfileScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import { colors } from "../../helpers/colors";
import PostsScreen from "./PostsScreen";

const MainTab = createBottomTabNavigator();

export default function Home() {
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}
      // screenOptions={({ route }) => ({
      //   tabBarIcon: ({ focused, color, size }) => {
      //     let iconName;

      //     if (route.name === "Profile") {
      //       iconName = focused
      //         ? "ios-information-circle"
      //         : "ios-information-circle-outline";
      //     } else if (route.name === "Create") {
      //       iconName = focused ? "ios-list-box" : "ios-list";
      //     }
      //     return <Ionicons name={iconName} size={size} color={color} />;
      //   },
      // })}
      // tabBarOptions={{
      //   activeTintColor: colors.orange,
      //   inactiveTintColor: colors.background,
      // }}
    >
      <MainTab.Screen
        name='Posts'
        component={PostsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name='appstore-o' size={size} color={color} />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => {}}>
              <Ionicons
                name='exit-outline'
                size={24}
                style={{ marginRight: 16 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <MainTab.Screen
        name='Create post'
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name='pluscircleo' size={size} color={color} />
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => {}}>
              <Ionicons
                name='ios-arrow-back'
                size={24}
                color='black'
                style={{ marginLeft: 16 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <MainTab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Feather name='user' size={size} color={color} />
          ),
        }}
      />
    </MainTab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
