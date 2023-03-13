import React, { useState, useEffect } from "react"
import { Fontisto, SimpleLineIcons } from "@expo/vector-icons"
import { Camera } from "expo-camera"
import { Input } from "react-native-elements"
import * as Location from "expo-location"
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import { colors } from "../../helpers/colors"

const initialState = {
  photo: "",
  name: "",
  location: "",
}

export default function CreatePostsScreen({ navigation }) {
  const [state, setState] = useState(initialState)
  const [cameraRef, setCameraRef] = useState(null)

  const takePhoto = async () => {
    const { uri } = await cameraRef.takePictureAsync()
    setState((prevState) => ({ ...prevState, photo: uri }))

    const location = await Location.getCurrentPositionAsync()
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    }
    setState((prevState) => ({ ...prevState, coords }))
  }

  const sendPhoto = () => {
    navigation.navigate("DefaultScreenPosts", state)
    setState(initialState)
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCameraRef}>
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <Fontisto
            name="camera"
            size={24}
            color={colors.textColor}
            style={styles.cameraIcon}
          />
        </TouchableOpacity>
      </Camera>

      {state.photo && (
        <View style={styles.photoContainer}>
          <Image source={state.photo} style={styles.photo} />
        </View>
      )}

      <Text style={styles.subTitle}>Upload photo</Text>

      <View style={styles.formContainer}>
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
  cameraIcon: {},
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
  // photoContainer: {
  //   width: 150,
  //   height: 150,
  //   borderColor: "#111",
  //   borderWidth: 1,
  // },
})
