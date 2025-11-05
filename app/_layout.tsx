import "../src/styles/global.css";
import { useEffect, useRef } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useSession } from "../src/store/useSession";
import { usePlan } from "../src/store/usePlan";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const isLoggedIn = useSession((state) => state.isLoggedIn);
  const checkAndResetIfNewDay = usePlan((state) => state.checkAndResetIfNewDay);
  const hasNavigated = useRef(false);

  useEffect(() => {
    // Check if we need to reset the daily plan once on mount
    checkAndResetIfNewDay();
  }, [checkAndResetIfNewDay]);

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (!isLoggedIn && !inAuthGroup) {
      // Redirect to login if not logged in
      if (!hasNavigated.current) {
        hasNavigated.current = true;
        setTimeout(() => router.replace("/(auth)/login"), 0);
      }
    } else if (isLoggedIn && inAuthGroup) {
      // Redirect to tabs if logged in
      if (!hasNavigated.current) {
        hasNavigated.current = true;
        setTimeout(() => router.replace("/(tabs)"), 0);
      }
    } else {
      // Reset navigation flag when in correct location
      hasNavigated.current = false;
    }
  }, [isLoggedIn, segments, router]);

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
      <Toast />
    </SafeAreaProvider>
  );
}
