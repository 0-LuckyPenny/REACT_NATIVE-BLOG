import React, { useState, useEffect } from "react";
import { Fontisto, SimpleLineIcons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../helpers/colors";

const initialState = {
  photo: "",
  name: "",
  location: "",
};

export default function CreatePostsScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [cameraRef, setCameraRef] = useState(null);
  // const [hasPermission, setHasPermission] = useState(null);

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Camera.requestCameraPermissionsAsync();
  //     await MediaLibrary.requestPermissionsAsync();

  //     setHasPermission(status === "granted");
  //   })();
  // }, []);

  // if (hasPermission === null) {
  //   return <View />;
  // }
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }

  const takePhoto = async () => {
    const { uri } = await cameraRef.takePictureAsync();
    const location = await Location.getCurrentPositionAsync();
    await MediaLibrary.createAssetAsync(uri);
    setState((prevState) => ({ ...prevState, photo: uri }));
  };

  const sendPhoto = () => {
    navigation.navigate("Posts", state);
    setState(initialState);
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        ref={(ref) => {
          setCameraRef(ref);
        }}>
        {state.photo && (
          <View style={styles.photoContainer}>
            <Image source={state.photo} style={styles.photo} />
          </View>
        )}
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <Fontisto
            name='camera'
            size={24}
            color={colors.textColor}
            style={styles.cameraIcon}
          />
        </TouchableOpacity>
      </Camera>

      <Text style={styles.subTitle}>Upload photo</Text>

      <View style={styles.formContainer}>
        <TextInput
          style={{ ...styles.input }}
          placeholder='Name...'
          placeholderTextColor={colors.textColor}
          value={state.name}
          onChangeText={(value) =>
            setState((prevState) => ({ ...prevState, name: value }))
          }
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
            value={state.location}
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, location: value }))
            }
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={sendPhoto}>
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
  camera: {
    height: 240,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.borderColor,
    marginHorizontal: 16,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
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
    top: 0,
    left: 0,
    bottom: 0,
    marginRight: 4,
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
  // photoContainer: {
  //   width: 150,
  //   height: 150,
  //   borderColor: "#111",
  //   borderWidth: 1,
  // },
});
