import {
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'

export default function Background({ children, isProfileScreen = false }) {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ImageBackground
        style={[
          styles.image,
          { justifyContent: isProfileScreen ? 'flex-start' : 'flex-end' },
        ]}
        source={require('../assets/images/bg_image.jpg')}
      >
        {children}
      </ImageBackground>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    paddingTop: 103,
  },
})
