import { AntDesign } from '@expo/vector-icons'
import { View, Image } from 'react-native'
import { StyleSheet } from 'react-native'
import { COLORS, RADII } from '../constants/theme'

export default function AvatarBox({
  userPhoto,
  getUserPhoto,
  removeUserPhoto,
}) {
  return (
    <View style={styles.avatarContainer}>
      {userPhoto ? (
        <Image style={styles.userImage} source={{ uri: userPhoto }} />
      ) : (
        <View
          style={[styles.userImage, { backgroundColor: COLORS.background }]}
        />
      )}

      <AntDesign
        style={[
          styles.btnAddDelUserPhoto,
          userPhoto && { transform: [{ rotate: '-45deg' }] },
        ]}
        onPress={() => {
          userPhoto ? removeUserPhoto() : getUserPhoto()
        }}
        name='pluscircleo'
        size={25}
        color={userPhoto ? COLORS.textColor : COLORS.orange}
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
    borderRadius: RADII.lg,
    resizeMode: 'cover',
    backgroundColor: COLORS.background,
  },
  btnAddDelUserPhoto: {
    position: 'absolute',
    bottom: 14,
    right: -12.5,
    borderRadius: RADII.l,
    backgroundColor: COLORS.white,
  },
})
