import React, { useState, useEffect } from "react";
import { SimpleLineIcons, AntDesign } from "@expo/vector-icons";
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

  const clearForm = () => {
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
            style={{ ...styles.input, fontFamily: "Roboto-Medium" }}
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
            style={{ ...styles.input, fontFamily: "Roboto-Regular" }}
            placeholder="Location..."
            placeholderTextColor={colors.textColor}
            value={state.location}
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, location: value }))
            }
          />

          <TouchableOpacity
            style={{
              ...styles.button,
              backgroundColor: state.photo ? colors.orange : colors.background,
            }}
            onPress={sendPhoto}
          >
            <Text
              style={{
                ...styles.buttonText,
                color: state.photo ? colors.white : colors.textColor,
              }}
            >
              Publish
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.deleteBtn} onPress={clearForm}>
          <AntDesign name="delete" size={24} color={colors.textColor} />
        </TouchableOpacity>
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
    marginHorizontal: 16,
    height: 240,
  },
  photo: {
    width: "100%",
    height: "100%",
    borderColor: colors.borderColor,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderRadius: 8,
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
    fontSize: 16,
    borderBottomColor: colors.textColor,
    color: colors.black,
  },
  button: {
    borderRadius: 100,
    padding: 16,
    marginTop: 32,
    justifyContent: "center",
    alignItems: "center",
    color: colors.black,
  },
  buttonText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  deleteBtn: {
    alignSelf: "center",
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
});
