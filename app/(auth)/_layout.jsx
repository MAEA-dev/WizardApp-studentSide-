import React from 'react'
import { Stack } from 'expo-router'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const AuthLayout = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false, animation:"simple_push"}}/>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
export default AuthLayout