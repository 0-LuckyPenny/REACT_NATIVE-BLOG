import React from "react";
import { View, Text, StyleSheet, ImageBackground, Image } from "react-native";
import { colors } from "../../../helpers/colors";

export default function CommentsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.postContainer}>
        <Image
          // resizeMode={"cover"}
          style={styles.postImage}
          source={require("../../../assets/images/comentImg.jpg")}
        />
      </View>
      <View style={styles.commentContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.imageProfile}
            source={require("../../../assets/images/avaComent.jpg")}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.commentText}>
            Really love your most recent photo. Ive been trying to capture the
            same thing for a few months and would love some tips!
          </Text>
          <Text style={styles.data}>09 июня, 2020 | 08:40</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  postContainer: {
    marginHorizontal: 16,
    marginTop: 32,
  },
  postImage: {
    height: 240,
    width: "100%",
    borderRadius: 8,
  },
  commentContainer: {
    flexDirection: "row",
    color: colors.black,
    marginTop: 32,
    marginHorizontal: 16,
  },
  imageContainer: {},
  imageProfile: {
    borderRadius: 14,
    height: 28,
    width: 28,
  },
  textContainer: {
    marginLeft: 16,
    padding: 16,
    backgroundColor: colors.background,
    fontFamily: "Roboto-Regular",
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
  },
  commentText: {
    fontSize: 13,
    color: colors.black,
    lineHeight: 18,
  },
  data: {
    fontSize: 10,
    marginTop: 8,
    color: colors.textColor,
    textAlign: "right",
  },
});
