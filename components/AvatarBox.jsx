import { AntDesign } from '@expo/vector-icons'
import { View, TouchableOpacity, Image } from 'react-native'
import { StyleSheet } from 'react-native'
import { colors } from 'react-native-elements'

export const AvatarBox = ({
  getUserPhoto,
  newUserPhoto,
  photoURL,
  removeUserPhoto,
}) => {
  return (
    <View style={styles.avatarContainer}>
      {photoURL && (
        <Image style={styles.userImage} source={{ uri: photoURL }} />
      )}
      <AntDesign
        style={[
          styles.btnAddDelUserPhoto,
          photoURL && { transform: [{ rotate: '-45deg' }] },
        ]}
        onPress={() =>
          photoURL ? removeUserPhoto() : getUserPhoto(newUserPhoto)
        }
        name='pluscircleo'
        size={25}
        color={photoURL ? '#BDBDBD' : '#FF6C00'}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  avatarContainer: {
    position: 'absolute',
    top: -60,
    alignSelf: 'center',
    width: 120,
    height: 120,
    backgroundColor: '#F6F6F6',
    borderRadius: 16.0,
  },
  btnAddDelUserPhoto: {
    position: 'absolute',
    bottom: 14,
    right: -12.5,
    borderRadius: 12.5,
    backgroundColor: colors.white,
  },
})
