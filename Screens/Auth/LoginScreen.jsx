import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { colors } from "../../helpers/colors";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss(); //hides the keyboard
    setState(initialState); //set values
    console.log(state);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.bgImage}
          source={require("../../assets/images/bg_image.jpg")}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={-100}>
            <View style={styles.form}>
              <Text style={styles.formTitle}>Log in</Text>
              <TextInput
                style={{ ...styles.input, marginTop: 32 }}
                placeholder='Email'
                placeholderTextColor={colors.textColor}
                onFocus={() => setIsShowKeyboard(true)}
                value={state.email}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, email: value }))
                }
              />
              <TextInput
                style={styles.input}
                placeholder='Password'
                placeholderTextColor={colors.textColor}
                maxLength={16}
                secureTextEntry={true}
                onFocus={() => setIsShowKeyboard(true)}
                value={state.password}
                onChangeText={(value) =>
                  setState((prevState) => ({
                    ...prevState,
                    password: value,
                  }))
                }
              />
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={keyboardHide}>
                <Text style={styles.btnTitle}>Log in</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.btnRedirect}>
                  Don't have an account? Sign in
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
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
    justifyContent: "flex-end",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  form: {
    position: "relative",
    backgroundColor: colors.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 32,
    paddingBottom: 111,
  },
  formTitle: {
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
