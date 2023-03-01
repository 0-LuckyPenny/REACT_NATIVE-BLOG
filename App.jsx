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
  Dimensions,
} from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";

const initialState = {
  login: "",
  email: "",
  password: "",
};

// const loadApplication = async () => {
//   await Font.loadAsync({
//     "SFP-Regular": require("./assets/fonts/SFProDisplay-Regular.ttf"),
//   });
// };

export default function App() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setstate] = useState(initialState);
  const [iasReady, setIasReady] = useState(false);

  const [dimensions, setdimensions] = useState(
    Dimensions.get("window").width - 20 * 2
  );

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 20 * 2;

      setdimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
    return () => {
      // Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setstate(initialState);
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
            behavior={Platform.OS == "ios" ? "padding" : "height"}>
            <View style={styles.wrapper}>
              <Text style={styles.headerTitle}>Registration</Text>
              <View
                style={{
                  ...styles.form,
                  marginBottom: isShowKeyboard ? 20 : 150,
                  width: dimensions,
                }}>
                <View style={{ marginTop: 32 }}>
                  <TextInput
                    style={styles.input}
                    placeholder='Login'
                    placeholderTextColor='BDBDBD'
                    onFocus={() => setIsShowKeyboard(true)}
                    value={state.login}
                    onChangeText={(value) =>
                      setstate((prevState) => ({ ...prevState, login: value }))
                    }
                  />
                </View>
                <View style={{ marginTop: 16 }}>
                  <TextInput
                    style={styles.input}
                    placeholder='Email'
                    placeholderTextColor='BDBDBD'
                    onFocus={() => setIsShowKeyboard(true)}
                    value={state.email}
                    onChangeText={(value) =>
                      setstate((prevState) => ({ ...prevState, email: value }))
                    }
                    // autoComplete={email}
                  />
                </View>

                <View style={{ marginTop: 16 }}>
                  <TextInput
                    style={styles.input}
                    placeholder='Password'
                    placeholderTextColor='BDBDBD'
                    secureTextEntry={true}
                    onFocus={() => setIsShowKeyboard(true)}
                    value={state.password}
                    onChangeText={(value) =>
                      setstate((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                  />
                </View>

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
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  wrapper: {
    backgroundColor: "#fff",
    paddingTop: 92,
    paddingBottom: 45,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  header: {
    textAlign: "center",
    marginBottom: 120,
  },
  headerTitle: {
    textAlign: "center",
    fontSize: 30,
    color: "#212121",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    height: 50,
    padding: 16,
    borderRadius: 8,
    // color: "#BDBDBD",
    backgroundColor: "#F6F6F6",
  },
  form: {
    marginHorizontal: 16,
  },
  btn: {
    borderRadius: 100,
    borderWidth: 1,
    marginTop: 43,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 32,
    paddingRight: 32,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    ...Platform.select({
      ios: {
        backgroundColor: "transparent",
        borderColor: "#f0f8ff",
      },
      android: {
        backgroundColor: "#FF6C00",
        borderColor: "transparent",
      },
    }),
  },
  btnTitle: {
    color: Platform.OS === "ios" ? "#FF6C00" : "#f0f8ff",
    fontSize: 16,
  },
  signInText: {
    textAlign: "center",
    color: "#1B4371",
    marginTop: 16,
  },
});
