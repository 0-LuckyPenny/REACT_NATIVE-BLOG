import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { colors } from "../../helpers/colors";

export default function CommentsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.postContainer}>
        <ImageBackground
          style={styles.postImage}
          source={require("../../assets/images/user.jpg")}
        />
      </View>
      <View style={styles.commentContainer}>
        <View style={styles.imageContainer}>
          <ImageBackground
            style={styles.imageProfile}
            source={require("../../assets/images/user.jpg")}
          />
        </View>
        <Text style={styles.commentText}>
          Really love your most recent photo. Ive been trying to capture the
          same thing for a few months and would love some tips!
        </Text>
        <Text style={styles.data}>09 июня, 2020 | 08:40</Text>
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
  postImage: {
    position: "relative",
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  commentContainer: {
    position: "absolute",
    top: 16,
    left: 60,
    marginLeft: 8,
    color: colors.black,
  },
  imageContainer: {},
  imageProfile: {},

  commentText: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
  },
  data: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
  },
});
