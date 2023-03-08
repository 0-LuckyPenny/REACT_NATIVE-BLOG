import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { colors } from "../../helpers/colors";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function CreatePostsScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.postImage}
        // source={require("../../assets/images/postImg.jpg")}
      >
        <View style={styles.circleCont}>
          <Fontisto
            name='camera'
            size={24}
            color={colors.textColor}
            style={styles.cameraIcon}
          />
        </View>
      </ImageBackground>
      <Text style={styles.subTitle}>Upload photo</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={{ ...styles.input, fontFamily: "Roboto-Medium" }}
          placeholder='Name...'
          placeholderTextColor={colors.textColor}
          // value={state.namePlace}
          // onChangeText={(value) =>
          //   setState((prevState) => ({ ...prevState, namePlace: value }))
          // }
          // onFocus={() => setisShowKeyboard(true)}
          // onSubmitEditing={keyboardHide}
        />
        <View style={{ marginTop: 16 }}>
          <SimpleLineIcons
            name='location-pin'
            size={24}
            color={colors.textColor}
            style={styles.placeIcon}
          />
          <TextInput
            style={{ position: "relative", ...styles.input }}
            placeholder='Location...'
            placeholderTextColor={colors.textColor}
            // value={state.place}
            // onChangeText={(value) =>
            //   setState((prevState) => ({ ...prevState, place: value }))
            // }
            // secureTextEntry={true}
            // onFocus={() => setisShowKeyboard(true)}
            // onSubmitEditing={
            //   (keyboardHide,
            //   () => {
            //     navigation.navigate("Home");
            //   })
            // }
          ></TextInput>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Publish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    color: colors.textColor,
  },
  postImage: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    height: 240,
    borderRadius: 8,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.borderColor,
    marginHorizontal: 16,
  },
  circleCont: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    backgroundColor: colors.white,
    borderRadius: 30,
  },
  cameraIcon: {
    position: "absolute",
    color: colors.black,
    fontFamily: "Roboto-Bold",
    fontSize: 13,
  },
  subTitle: {
    color: colors.textColor,
    fontSize: 16,
    marginHorizontal: 16,
    marginTop: 8,
  },
  formContainer: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  input: {
    marginTop: 16,
    paddingTop: 16,
    paddingBottom: 15,
    borderBottomWidth: 1,
    fontFamily: "Roboto-Regular",
    borderBottomColor: colors.textColor,
    fontSize: 16,
    color: colors.black,
  },
  placeIcon: {
    position: "absolute",
    // top: 0,
    // left: 0,
    // bottom: 0,
    // marginRight: 4,
  },
  button: {
    borderRadius: 100,
    padding: 16,
    marginTop: 32,
    justifyContent: "center",
    alignItems: "center",
    color: colors.black,
    backgroundColor: colors.background,
  },
  buttonText: {
    fontSize: 16,
    color: colors.textColor,
    fontFamily: "Roboto-Regular",
  },
});
