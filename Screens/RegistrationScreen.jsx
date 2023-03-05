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
} from "react-native";
import { colors } from "../helpers/colors";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen() {
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
      <View style={styles.userImage}>
        <TouchableOpacity style={styles.btnAddUserImage}>
          <AntDesign name='pluscircleo' size={24} color={colors.orange} />
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
      <Text style={styles.text}>Already have an account? Login</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
