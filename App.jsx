import React from "react";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "./router";

export default function App() {
  const routing = useRoute(null);
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

  return <NavigationContainer>{routing}</NavigationContainer>;
}
