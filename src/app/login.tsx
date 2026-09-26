import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { createAccount, signInWithEmail } from "@/services/music";

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleLogin() {
    if (email.trim() === "" || password === "") {
      setErrorMessage("Preencha o e-mail e a senha.");
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage(null);

      await signInWithEmail(email.trim(), password);

      router.replace("/");
    } catch {
      setErrorMessage("E-mail ou senha inválidos.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreateAccount() {
    if (email.trim() === "" || password === "") {
      setErrorMessage("Preencha o e-mail e a senha.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage(null);

      await createAccount(email.trim(), password);

      router.replace("/");
    } catch {
      setErrorMessage("Não foi possível criar a conta.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Login" }} />

      <View style={styles.content}>
        <Text style={styles.title}>Minhas Músicas</Text>

        <Text style={styles.text}>Entre para acessar suas músicas.</Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Button
          title={isLoading ? "Aguarde..." : "Entrar"}
          onPress={handleLogin}
          disabled={isLoading}
        />

        <View style={styles.espaco}>
          <Button
            title="Criar conta"
            onPress={handleCreateAccount}
            disabled={isLoading}
          />
        </View>

        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeeeee",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },

  text: {
    fontSize: 16,
    marginBottom: 20,
  },

  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#cccccc",
    padding: 12,
    marginBottom: 12,
  },

  espaco: {
    marginTop: 10,
  },

  error: {
    color: "red",
    marginTop: 15,
  },
});
