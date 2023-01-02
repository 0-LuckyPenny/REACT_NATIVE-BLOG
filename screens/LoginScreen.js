const loadFonts = async () => {
  await Font.loadAsync({
    "Roboto-Regulat": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "SFP-Light": require("./assets/fonts/SFProDisplay-Light.ttf"),
    "SFP-Regular": require("./assets/fonts/SFProDisplay-Regular.ttf"),
  });
};
