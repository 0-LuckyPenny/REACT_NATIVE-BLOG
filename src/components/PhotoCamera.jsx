import { Camera, CameraType } from 'expo-camera'
import { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Fontisto, FontAwesome } from '@expo/vector-icons'
import { COLORS, SPACE, FONTSIZES, RADII } from '../constants/theme'

export default function PhotoCamera({ newPhoto, camera }) {
  const [type, setType] = useState(CameraType.back)
  const [permission, requestPermission] = Camera.useCameraPermissions()

  //дозвіл на використання камери
  if (permission === null) {
    return <View />
  }

  // дозволу поки ще не має
  if (!permission.granted) {
    return (
      <View style={styles.boxPermission}>
        <Text style={styles.textCamera}>allow the use of the camera</Text>
        <TouchableOpacity
          style={styles.permissionBtn}
          onPress={() => requestPermission(permission.granted)}
        >
          <Text>Yes</Text>
        </TouchableOpacity>
      </View>
    )
  }

  function toggleCameraType() {
    setType(current =>
      current === CameraType.back ? CameraType.front : CameraType.back
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraBox}>
        <Camera style={styles.camera} type={type} ref={camera}>
          <TouchableOpacity style={styles.cameraIcon} onPress={newPhoto}>
            <Fontisto name='camera' size={24} color='#fff' />
          </TouchableOpacity>
        </Camera>
      </View>

      <TouchableOpacity
        style={styles.toggleCameraBtn}
        onPress={toggleCameraType}
      >
        <FontAwesome name='refresh' size={24} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  boxPermission: {
    alignItems: 'center',
  },
  container: {
    height: '100%',
    width: '100%',
  },
  textCamera: {
    textAlign: 'center',
    marginTop: 40,
    marginBottom: SPACE[6],
    fontSize: FONTSIZES[5],
  },
  cameraBox: {
    height: 240,
    width: '100%',
    overflow: 'hidden',
    borderRadius: RADII.md,
  },
  camera: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 240,
  },
  cameraIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: RADII.xxxl,
    backgroundColor: COLORS.bgWithOpacity,
  },
  toggleCameraBtn: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionBtn: {
    borderWidth: 1,
    borderRadius: RADII.sm,
    borderColor: COLORS.borderColor,
    paddingVertical: SPACE[1],
    paddingHorizontal: SPACE[2],
    color: COLORS.textColor,
    backgroundColor: COLORS.bgWithOpacity,
  },
})
