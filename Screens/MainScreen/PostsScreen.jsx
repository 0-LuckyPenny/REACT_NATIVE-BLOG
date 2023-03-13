import React from "react"
import { Ionicons } from "@expo/vector-icons"
import { createStackNavigator } from "@react-navigation/stack"

import { colors } from "../../helpers/colors"

import DefaultScreenPosts from "../nestedScreen/DefaultScreenPosts"
import CommentsScreen from "../nestedScreen/CommentsScreen"
import MapScreen from "../nestedScreen/MapScreen"

const NestedScreen = createStackNavigator()

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
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => {}}>
              <Ionicons
                name="ios-arrow-back"
                size={24}
                color={colors.textColor}
                style={{ marginLeft: 16 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <NestedScreen.Screen name="MapScreen" component={MapScreen} />
    </NestedScreen.Navigator>
  )
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "flex-start",
//     backgroundColor: colors.white,
//   },
//   profileContainer: {
//     marginHorizontal: 16,
//     marginTop: 32,
//   },
//   userImage: {
//     position: "relative",
//     width: 60,
//     height: 60,
//     borderRadius: 16,
//   },
//   userData: {
//     position: "absolute",
//     top: 16,
//     left: 60,
//     marginLeft: 8,
//     color: colors.black,
//   },
//   userName: {
//     fontFamily: "Roboto-Bold",
//     fontSize: 13,
//   },
//   userEmail: {
//     fontFamily: "Roboto-Regular",
//     fontSize: 11,
//   },
//   post: {
//     marginTop: 32,
//     marginHorizontal: 16,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   postImg: {
//     height: 240,
//     width: "100%",
//     borderRadius: 8,
//   },
//   namePost: {
//     fontSize: 16,
//     fontFamily: "Roboto-Medium",
//     marginTop: 8,
//     color: colors.black,
//   },
//   commentCont: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   commentBtn: {},
//   commentQuant: {
//     marginLeft: 8,
//     fontSize: 16,
//   },
//   locationCont: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   locationName: {
//     marginLeft: 4,
//     fontSize: 16,
//     color: colors.black,
//     textDecorationLine: "underline",
//   },
// });
