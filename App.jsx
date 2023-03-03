import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useFonts } from "expo-font";
// import * as Font from "expo-font";
// import { AppLoading } from "expo";

const initialState = {
  login: "",
  email: "",
  password: "",
};

// const loadApplication = async () => {
//   await Font.loadAsync({
//     "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
//     "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
//     "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
//     "SFP-Light": require("./assets/fonts/SFProDisplay-Light.ttf"),
//     "SFP-Regular": require("./assets/fonts/SFProDisplay-Regular.ttf"),
//   });
// };

export default function App() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  // const [iasReady, setIasReady] = useState(false);
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "SFP-Light": require("./assets/fonts/SFProDisplay-Light.ttf"),
    "SFP-Regular": require("./assets/fonts/SFProDisplay-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss(); //hides the keyboard
    setState(initialState); //set values
    // console.log(state);
  };

  // if (!iasReady) {
  //   return (
  //     <AppLoading
  //       startAsync={loadApplication}
  //       onFinish={() => setIasReady(true)}
  //       onError={console.warn}
  //     />
  //   );
  // }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.bgImage}
          source={require("./assets/images/bg_image.jpg")}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View
              style={{
                ...styles.form,
                marginBottom: isShowKeyboard ? 0 : 0,
              }}>
              <View style={styles.userImage}>
                <TouchableOpacity style={styles.btnAddUserImage}>
                  <Text style={styles.textPlus}>+</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.formTitle}>Registration</Text>
              <TextInput
                style={{ ...styles.input, marginTop: 32 }}
                placeholder='Login'
                placeholderTextColor='BDBDBD'
                onFocus={() => setIsShowKeyboard(true)}
                value={state.login}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, login: value }))
                }
              />
              <TextInput
                style={styles.input}
                placeholder='Email'
                placeholderTextColor='BDBDBD'
                onFocus={() => setIsShowKeyboard(true)}
                value={state.email}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, email: value }))
                }
              />
              <TextInput
                style={styles.input}
                placeholder='Password'
                placeholderTextColor='BDBDBD'
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
                <Text style={styles.btnTitle}>Sign in</Text>
              </TouchableOpacity>
              <Text style={styles.signInText}>
                Don't have an account? Sign in
              </Text>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const colors = {
  blue: "#1B4371",
  orange: "#FF6C00",
  background: "#F6F6F6",
  white: "#fff",
  black: "#212121",
  placeholderTextColor: "#BDBDBD",
  borderInput: "#E8E8E8",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
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
    right: 150,
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: colors.background,
  },
  btnAddUserImage: {
    position: "absolute",
    bottom: 14,
    right: -12,
    borderWidth: 1,
    borderColor: colors.orange,
    backgroundColor: colors.white,
    borderRadius: 12.5,
    width: 25,
    height: 25,
    alignItems: "center",
  },
  textPlus: {
    fontSize: 18,
    color: colors.orange,
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
    borderColor: colors.borderInput,
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
    // platform definition, example
    // backgroundColor: Platform.OS === "ios" ? "#F6F555" : "#FF6C00",
    // ...Platform.select({
    //   ios: {
    //     backgroundColor: "#F6F555",
    //   },
    //   android: {
    //     backgroundColor: "#FF6C00",
    //   },
    // }),
  },
  btnTitle: {
    color: colors.white,
    fontSize: 16,
  },
  signInText: {
    fontSize: 16,
    color: colors.blue,
    textAlign: "center",
    marginTop: 16,
  },
});
