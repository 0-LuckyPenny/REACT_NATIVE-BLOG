import { AntDesign } from '@expo/vector-icons'
import { View, Image } from 'react-native'
import { StyleSheet } from 'react-native'
import { colors } from '../helpers/colors'

export const AvatarBox = ({
  getUserPhoto,
  newUserPhoto,
  photoURL,
  removeUserPhoto,
}) => {
  return (
    <View style={styles.avatarContainer}>
      {photoURL ? (
        <Image style={styles.userImage} source={{ uri: photoURL }} />
      ) : (
        <View
          style={[styles.userImage, { backgroundColor: colors.background }]}
        />
      )}

      <AntDesign
        style={[
          styles.btnAddDelUserPhoto,
          photoURL && { transform: [{ rotate: '-45deg' }] },
        ]}
        onPress={() => {
          photoURL ? removeUserPhoto() : getUserPhoto()
        }}
        name='pluscircleo'
        size={25}
        color={photoURL ? colors.textColor : colors.orange}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  avatarContainer: {
    position: 'absolute',
    top: -60,
    alignSelf: 'center',
  },
  userImage: {
    width: 120,
    height: 120,
    borderRadius: 16,
    resizeMode: 'cover',
    backgroundColor: colors.background,
  },
  btnAddDelUserPhoto: {
    position: 'absolute',
    bottom: 14,
    right: -12.5,
    borderRadius: 12.5,
    backgroundColor: colors.white,
  },
})
