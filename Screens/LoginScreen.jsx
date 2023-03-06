import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Dimensions,
} from "react-native";
import { colors } from "../helpers/colors";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss(); //hides the keyboard
    setState(initialState); //set values
    console.log(state);
  };

  return (
    <View style={styles.form}>
      <Text style={styles.formTitle}>Log in</Text>
      <TextInput
        style={{ ...styles.input, marginTop: 32 }}
        placeholder='Email'
        placeholderTextColor={colors.placeholderTextColor}
        onFocus={() => setIsShowKeyboard(true)}
        value={state.email}
        onChangeText={(value) =>
          setState((prevState) => ({ ...prevState, email: value }))
        }
      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        placeholderTextColor={colors.placeholderTextColor}
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
      <Text style={styles.text}>Don't have an account? Sign in</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
  btnTitle: {
    color: colors.white,
    fontSize: 16,
  },
  text: {
    fontSize: 16,
    color: colors.blue,
    textAlign: "center",
    marginTop: 16,
  },
});
