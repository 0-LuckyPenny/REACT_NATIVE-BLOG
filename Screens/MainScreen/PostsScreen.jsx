import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { colors } from "../../helpers/colors";

export default function PostsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.postContainer}>
        <ImageBackground
          style={styles.userImage}
          source={require("../../assets/images/user.jpg")}></ImageBackground>
        <View style={styles.userData}>
          <Text style={styles.userName}>Natali Romanova</Text>
          <Text style={styles.userEmail}>email@example.com</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: colors.white,
  },
  postContainer: {
    marginHorizontal: 16,
    marginTop: 32,
  },
  userImage: {
    position: "relative",
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  userData: {
    position: "absolute",
    top: 16,
    left: 60,
    marginLeft: 8,
    color: colors.black,
  },
  userName: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
  },
  userEmail: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
  },
});
