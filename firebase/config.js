import { initializeApp } from 'firebase/app'
import {
  getReactNativePersistence,
  initializeAuth,
} from 'firebase/auth/react-native'
import { getFirestore } from 'firebase/firestore/lite'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAGZ788aJJENsR8EMRNNGXJToQCk4CbLWw',
  authDomain: 'rn-social-52def.firebaseapp.com',
  projectId: 'rn-social-52def',
  storageBucket: 'rn-social-52def.appspot.com',
  messagingSenderId: '32707799653',
  appId: '1:32707799653:web:8eaabc4884527aa855748c',
  measurementId: 'G-TNL2YVJ1TS',
}

export const app = initializeApp(firebaseConfig)

export const storage = getStorage()

const initAuth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
})

export const db = getFirestore(app)

export const auth = getAuth(app)
