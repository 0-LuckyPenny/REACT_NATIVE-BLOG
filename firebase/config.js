import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'
import {
  getReactNativePersistence,
  initializeAuth,
} from 'firebase/auth/react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'

const {
  FIREBASE_API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} = Constants.manifest.extra

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)

export const storage = getStorage(app)
export const firestore = getFirestore(app)

const authAsync = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
})

export const auth = getAuth(app)
