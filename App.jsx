import { useFonts } from 'expo-font'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store'
import { Main } from './components/Main'
import { PersistGate } from 'redux-persist/integration/react'

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'), //400
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'), //500
  })
  if (!fontsLoaded) {
    return null
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  )
}
