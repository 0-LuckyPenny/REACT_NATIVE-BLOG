import { updateProfile } from 'firebase/auth'
import { auth } from '../firebase/config'

export const addUserPhoto = async photoForDownload => {
  try {
    await updateProfile(auth.currentUser, {
      photoURL: photoForDownload,
    })
    console.log('photo added')
  } catch (error) {
    console.log('error', error)
  }
}
