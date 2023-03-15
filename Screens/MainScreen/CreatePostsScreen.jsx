import React, { useState, useEffect } from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Input } from "react-native-elements";
import * as Location from "expo-location";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { colors } from "../../helpers/colors";
import PhotoCamera from "../../components/PhotoCamera";

const initialState = {
  photo: null,
  name: "",
  location: "",
  coords: null,
};

export default function CreatePostsScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [cameraRef, setCameraRef] = useState(null);

  useEffect(() => {
    (async () => {
      //запит на дозвіл використання геолокації
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const takePhoto = async () => {
    const { uri } = await cameraRef.takePictureAsync();
    const location = await Location.getCurrentPositionAsync();
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setState((prevState) => ({
      ...prevState,
      photo: uri,
      coords,
    }));
  };

  const sendPhoto = () => {
    navigation.navigate("DefaultScreen", state);
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.photoContainer}>
          {state.photo ? (
            <Image
              style={styles.photo}
              onPress={Keyboard.dismiss}
              source={{ uri: state.photo }}
            />
          ) : (
            <PhotoCamera newPhoto={takePhoto} camera={setCameraRef} />
          )}
        </View>

        <TouchableOpacity>
          {state.photo ? (
            <View>
              <Text
                onPress={() => {
                  setState((prevState) => ({
                    ...prevState,
                    photo: null,
                  }));
                }}
                style={styles.subTitle}
              >
                Change photo
              </Text>
            </View>
          ) : (
            <View>
              <Text onPress={() => {}} style={styles.subTitle}>
                Upload photo
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.form}>
          <Input
            style={styles.input}
            placeholder="Name..."
            placeholderTextColor={colors.textColor}
            value={state.name}
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, name: value }))
            }
          />
          <Input
            leftIcon={
              <SimpleLineIcons
                name="location-pin"
                size={24}
                color={colors.textColor}
                style={{ marginRight: 4 }}
              />
            }
            style={styles.input}
            placeholder="Location..."
            placeholderTextColor={colors.textColor}
            value={state.location}
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, location: value }))
            }
          />

          <TouchableOpacity style={styles.button} onPress={sendPhoto}>
            <Text style={styles.buttonText}>Publish</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  photoContainer: {
    height: 240,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  photo: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  camera: {
    height: 240,
    width: 360,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderColor,
    marginHorizontal: 16,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    opacity: 0.3,
  },
  cameraIcon: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  subTitle: {
    color: colors.textColor,
    fontSize: 16,
    marginHorizontal: 16,
    marginTop: 8,
  },
  form: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  input: {
    marginTop: 16,
    paddingTop: 16,
    paddingLeft: 0,
    paddingBottom: 15,
    fontFamily: "Roboto-Regular",
    borderBottomColor: colors.textColor,
    fontSize: 16,
    color: colors.black,
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
