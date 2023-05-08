import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authReducer'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

const authPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistAuthReducer = persistReducer(authPersistConfig, authSlice.reducer)

export const store = configureStore({
  reducer: {
    auth: persistAuthReducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  ],
})

export const persistor = persistStore(store)
