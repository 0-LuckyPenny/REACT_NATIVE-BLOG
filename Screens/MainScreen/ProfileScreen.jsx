import { useEffect, useState } from 'react'
import { Ionicons, AntDesign } from '@expo/vector-icons'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Image,
  Platform,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native'
import { colors } from '../../helpers/colors'
import Post from '../../components/Post'
import { useDispatch, useSelector } from 'react-redux'
import { authSignOutUser } from '../../redux/auth/authOperations'

export default function ProfileScreen({ route, navigation }) {
  const [posts, setPosts] = useState([])
  const dispatch = useDispatch()

  const { nickName, userEmail } = useSelector(state => state.auth)

  useEffect(() => {
    if (route.params) {
      setPosts(prevState => [...prevState, route.params])
    }
  }, [route.params])

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bgImage}
        source={require('../../assets/images/bg_image.jpg')}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={-100}
        >
          <View style={styles.profileContainer}>
            <Ionicons
              name='exit-outline'
              size={24}
              color={colors.textColor}
              style={styles.logoutIcon}
              onPress={() => dispatch(authSignOutUser())}
            />
            <View style={styles.avatarBox}>
              <Image
                style={styles.userImage}
                source={require('../../assets/images/imageProf.jpg')}
              />
              <TouchableOpacity style={styles.btnAddUserImage}>
                <AntDesign name='plus' size={13} color={colors.textColor} />
              </TouchableOpacity>
            </View>

            <Text style={styles.title}>{nickName}</Text>

            <FlatList
              data={posts}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Post
                  photo={item.photo}
                  title={item.title}
                  comments={10}
                  likes={item.likes}
                  location={item.location}
                  toComment={() => navigation.navigate('Comments', { item })}
                  toMap={() => navigation.navigate('Map', { item })}
                />
              )}
            />
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  profileContainer: {
    position: 'relative',
    alignItems: 'flex-end',
    marginTop: 103,
    backgroundColor: colors.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: '100%',
    height: '100%',
  },
  logoutIcon: {
    marginTop: 22,
    marginHorizontal: 16,
  },
  avatarBox: {
    position: 'absolute',
    width: 120,
    height: 120,
    top: -60,
    right: Dimensions.get('window').width / 2 - 60,
  },
  userImage: {
    borderRadius: 16,
    backgroundColor: colors.background,
  },
  btnAddUserImage: {
    position: 'absolute',
    transform: [{ rotate: '-45deg' }],
    bottom: 14,
    right: -12.5,
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12.5,
    borderWidth: 1,
    borderColor: colors.borderColor,
    backgroundColor: colors.white,
  },
  title: {
    marginTop: 46,
    fontSize: 30,
    color: colors.black,
    fontFamily: 'Roboto-Medium',
    lineHeight: 35,
    alignSelf: 'center',
  },
})
