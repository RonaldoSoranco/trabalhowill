import { Stack, useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import "react-native-reanimated";

import { auth } from "@/lib/firebase";

export default function RootLayout() {
  const router = useRouter();

  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const pararObservacao = onAuthStateChanged(auth, (usuario) => {
      setCarregando(false);

      if (usuario) {
        router.replace("/");
      } else {
        router.replace("/login");
      }
    });

    return pararObservacao;
  }, []);

  if (carregando) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="index"
        options={{
          title: "Minhas Músicas",
        }}
      />

      <Stack.Screen
        name="form"
        options={{
          title: "Música",
        }}
      />

      <Stack.Screen
        name="details"
        options={{
          title: "Detalhes",
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
