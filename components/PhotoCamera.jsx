import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Fontisto, FontAwesome } from "@expo/vector-icons";
import { colors } from "../helpers/colors";

export default function PhotoCamera({ newPhoto, camera }) {
  const [type, setType] = useState(CameraType.back);
  const [status, requestPermission] = Camera.useCameraPermissions();

  //дозвіл на використання камери
  if (status === null) {
    return <View />;
  }

  // дозволу поки ще не має
  if (!status.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.textCamera}>allow the use of the camera</Text>
        <TouchableOpacity onPress={requestPermission} title="Yes" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={camera}>
        <TouchableOpacity style={styles.cameraIcon} onPress={newPhoto}>
          <Fontisto name="camera" size={24} color="#fff" />
        </TouchableOpacity>
      </Camera>
      <TouchableOpacity
        style={styles.toggleCameraType}
        onPress={toggleCameraType}
      >
        <FontAwesome name="refresh" size={24} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  textCamera: {
    textAlign: "center",
    marginTop: 40,
    marginBottom: 30,
    fontSize: 20,
  },
  camera: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  cameraIcon: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: colors.bgWithOpacity,
    justifyContent: "center",
    alignItems: "center",
  },
  toggleCameraType: {
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
