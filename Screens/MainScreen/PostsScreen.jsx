import React from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "../../helpers/colors";
import DefaultScreenPosts from "../nestedScreen/DefaultScreenPosts";
import CommentsScreen from "../nestedScreen/CommentsScreen";
import MapScreen from "../nestedScreen/MapScreen";
const NestedScreen = createStackNavigator();

export default function PostsScreen() {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        options={{ headerShown: false }}
        name="DefaultScreen"
        component={DefaultScreenPosts}
      />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={({ navigation }) => ({
          headerTitleAlign: "center",
          headerLeft: () => (
            <Ionicons
              onPress={() => navigation.goBack()}
              name="ios-arrow-back"
              size={24}
              color={colors.textColor}
              style={{ marginLeft: 16 }}
            />
          ),
        })}
      />
      <NestedScreen.Screen
        name="MapScreen"
        component={MapScreen}
        options={({ navigation }) => ({
          headerTitleAlign: "center",
          headerLeft: () => (
            <AntDesign
              onPress={() => navigation.goBack()}
              name="arrowleft"
              size={24}
              color={colors.textColor}
            />
          ),
        })}
      />
    </NestedScreen.Navigator>
  );
}
