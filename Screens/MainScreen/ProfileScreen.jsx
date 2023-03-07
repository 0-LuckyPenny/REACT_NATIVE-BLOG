import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Dimensions,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { colors } from "../../helpers/colors";

export default function ProfileScreen({ navigation }) {
  // const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  // const [state, setState] = useState(initialState);

  // const keyboardHide = () => {
  //   setIsShowKeyboard(false);
  //   Keyboard.dismiss(); //hides the keyboard
  //   setState(initialState); //set values
  //   console.log(state);
  // };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bgImage}
        source={require("../../assets/images/bg_image.jpg")}>
        <View style={styles.form}>
          <View style={styles.userImage}>
            <TouchableOpacity style={styles.btnAddUserImage}>
              <AntDesign name='pluscircleo' size={24} color={colors.orange} />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Natali</Text>
        </View>
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
    // justifyContent: "flex-end",
    // width: Dimensions.get("window").width,
    // height: Dimensions.get("window").height,
  },
  form: {
    position: "relative",
    backgroundColor: colors.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingBottom: 45,
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
  formTitle: {
    marginTop: 92,
    textAlign: "center",
    fontSize: 30,
    color: colors.black,
    alignItems: "center",
    fontFamily: "Roboto-Medium",
  },
  input: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    height: 50,
    padding: 16,
    borderRadius: 8,
    backgroundColor: colors.background,
    marginTop: 16,
    marginHorizontal: 16,
  },
  btn: {
    borderRadius: 100,
    marginTop: 43,
    padding: 16,
    justifyContent: "center",
    marginHorizontal: 16,
    alignItems: "center",
    backgroundColor: colors.orange,
  },
  btnTitle: {
    color: colors.white,
    fontSize: 16,
  },
  btnRedirect: {
    fontSize: 16,
    color: colors.blue,
    textAlign: "center",
    marginTop: 16,
  },
});
