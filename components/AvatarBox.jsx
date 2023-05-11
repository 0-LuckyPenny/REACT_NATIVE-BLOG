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
      <TouchableOpacity
        activeOpacity={0.9}
        style={[
          styles.btnAddDelUserPhoto,
          photoURL && { transform: [{ rotate: '-45deg' }] },
        ]}
        onPress={() =>
          photoURL ? removeUserPhoto() : getUserPhoto(newUserPhoto)
        }
      >
        <AntDesign
          style={styles.iconPlus}
          name='pluscircleo'
          size={25}
          color={photoURL ? colors.textColor : colors.orange}
        />
      </TouchableOpacity>
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
    borderRadius: 16,
    backgroundColor: colors.background,
  },
  btnAddDelUserPhoto: {
    position: 'absolute',
    bottom: 14,
    right: -12.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  iconPlus: {
    color: colors.textColor,
  },
})
