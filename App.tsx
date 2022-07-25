import { Roboto_400Regular, Roboto_700Bold, useFonts } from "@expo-google-fonts/roboto";
import { NativeBaseProvider, StatusBar } from "native-base";
import React, { useState } from "react";
import { Loading } from "./src/components/Loading";
import { Routes } from "./src/routes";

import { THEME } from "./src/styles/theme";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const [loaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  setTimeout(() => {
    setFontsLoaded(loaded);
  }, 1000);

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Routes /> : <Loading />}
    </NativeBaseProvider>
  );
}
