import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { LoaderProvider } from "../context/LoaderContext";

import {
  Fredoka_600SemiBold,
  Fredoka_700Bold,
} from "@expo-google-fonts/fredoka";

import {
  Nunito_400Regular,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";

import {
  PressStart2P_400Regular,
} from "@expo-google-fonts/press-start-2p";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Fredoka_600SemiBold,
    Fredoka_700Bold,
    Nunito_400Regular,
    Nunito_700Bold,
    PressStart2P_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LoaderProvider>
        <SafeAreaProvider>
            <Stack screenOptions={{ headerShown: false, animation: "slide_from_bottom", }} />
        </SafeAreaProvider>
    </LoaderProvider>
    
  );
}