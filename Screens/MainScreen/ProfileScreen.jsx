import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Dimensions,
  ImageBackground,
  Image,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { colors } from "../../helpers/colors";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bgImage}
        source={require("../../assets/images/bg_image.jpg")}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={-100}>
          <View style={styles.profContainer}>
            <TouchableOpacity style={styles.exitBtn}>
              <Ionicons
                name='exit-outline'
                size={24}
                color={colors.textColor}
              />
            </TouchableOpacity>

            <View style={styles.userImage}>
              <ImageBackground
                sourse={require("../../assets/images/imageProf.jpg")}
              />
              <TouchableOpacity style={styles.btnAddUserImage}>
                <AntDesign name='pluscircleo' size={24} color={colors.orange} />
              </TouchableOpacity>
            </View>

            <Text style={styles.title}>Natali Romanova</Text>

            <View style={styles.post}>
              <View style={styles.imagePost}>
                <ImageBackground
                  sourse={require("../../assets/images/imagePost2.jpg")}
                />
              </View>
              <Text style={styles.namePost}>Les</Text>

              <View style={{ flexDirection: "row", marginTop: 8 }}>
                <View style={styles.commentCont}>
                  <FontAwesome name='comment' size={24} color={colors.orange} />
                  <Text style={styles.commentQuant}>8</Text>
                </View>

                <View style={styles.likesCont}>
                  <AntDesign name='like2' size={24} color={colors.orange} />
                  <Text style={styles.likesQuant}>153</Text>
                </View>

                <View style={styles.locationCont}>
                  <SimpleLineIcons
                    name='location-pin'
                    size={24}
                    color={colors.textColor}
                  />
                  <Text style={styles.locationName}>Ukraine</Text>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  profContainer: {
    position: "relative",
    // marginHorizontal: 16,
    marginTop: 103,
    backgroundColor: colors.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: "100%",
    height: "100%",
  },
  exitBtn: {
    marginTop: 22,
    alignItems: "flex-end",
    marginHorizontal: 16,
  },
  userImage: {
    position: "absolute",
    top: -60,
    right: Dimensions.get("window").width / 2 - 60,
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: colors.background,
  },
  btnAddUserImage: {
    position: "absolute",
    bottom: 14,
    right: -12.5,
    maxWidth: 25,
  },
  title: {
    marginTop: 46,
    textAlign: "center",
    fontSize: 30,
    color: colors.black,
    alignItems: "center",
    fontFamily: "Roboto-Medium",
  },
  post: {
    marginTop: 32,
    marginHorizontal: 16,
    color: colors.black,
  },
  imagePost: {
    height: 240,
    borderRadius: 8,
    width: 200,
  },
  namePost: {
    fontSize: 16,
    fontFamily: "Roboto-Medium",
    marginTop: 8,
  },
  commentCont: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentBtn: {},
  commentQuant: {
    marginLeft: 8,
    fontSize: 16,
  },
  likesCont: {
    marginLeft: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  likesBtn: {},
  likesQuant: {
    marginLeft: 6,
    fontSize: 16,
  },

  locationCont: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationBtn: {},
  locationName: {
    marginLeft: 4,
    fontSize: 16,

    textDecorationLine: "underline",
  },
});
