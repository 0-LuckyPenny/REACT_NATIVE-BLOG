import React from "react";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "./router";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import db from "./firebase/config.js";

export default function App() {
  const [user, setUser] = useState(null);
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"), //400
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"), //500
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"), //700
    "SFP-Light": require("./assets/fonts/SFProDisplay-Light.ttf"), //300
    "SFP-Regular": require("./assets/fonts/SFProDisplay-Regular.ttf"), //400
  });
  if (!fontsLoaded) {
    return null;
  }

  db.auth().onAuthStateChanged((user) => setUser(user));
  const routing = useRoute(user);

  return (
    <Provider store={store}>
      <NavigationContainer>{routing}</NavigationContainer>
    </Provider>
  );
}
