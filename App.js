import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("./assets/images/stars.jpg")}>
        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>EMAIL ADRESS</Text>
            <TextInput
              style={styles.input}
              placeholder='Please enter'
              textAlign='center'
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.inputTitle}>PASSWORD</Text>
            <TextInput
              style={styles.input}
              placeholder='Please enter'
              textAlign='center'
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
            <Text style={styles.btnTitle}>SIGN IN</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  inputTitle: {
    marginBottom: 10,
    color: "#fff",
    fontSize: 18,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    // justifyContent: "center",
    justifyContent: "flex-end",
    // alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#faebd7",
    borderRadius: 6,
    height: 40,
    color: "#faebd7",
  },
  form: {
    marginHorizontal: 40,
  },
  btn: {
    height: 40,
    borderRadius: 6,
    borderWidth: 1,
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    ...Platform.select({
      ios: {
        backgroundColor: "transparent",
        borderColor: "#faebd7",
      },
      android: {
        backgroundColor: "#4169e1",
        borderColor: "transparent",
      },
    }),
    // backgroundColor: Platform.OS === "ios" ? "transparent" : "#4169e1",
    // borderColor: Platform.OS === "ios" ? "#faebd7" : "transparent",
  },
  btnTitle: {
    color: Platform.OS === "ios" ? "#4169e1" : "#fff",
    fontSize: 18,
  },
});
