import { useLocalSearchParams, useRouter } from "expo-router";
import { Alert, Button, StyleSheet, Text, View } from "react-native";

import { excluirMusica } from "@/services/music";

export default function DetailsScreen() {
  const router = useRouter();

  const { id, nome, artista, nota, data } = useLocalSearchParams<{
    id: string;
    nome: string;
    artista: string;
    nota: string;
    data: string;
  }>();

  function editar() {
    router.push({
      pathname: "/form",
      params: {
        id: id,
        nome: nome,
        artista: artista,
        nota: nota,
        data: data,
      },
    });
  }

  function confirmarExclusao() {
    Alert.alert("Excluir música", "Deseja realmente excluir esta música?", [
      {
        text: "Cancelar",
      },
      {
        text: "Excluir",
        onPress: excluir,
      },
    ]);
  }

  async function excluir() {
    try {
      await excluirMusica(id);

      router.replace("/");
    } catch {
      Alert.alert("Erro", "Não foi possível excluir a música.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Detalhes da música</Text>

      <View style={styles.card}>
        <Text style={styles.nome}>{nome}</Text>
        <Text>Artista: {artista}</Text>
        <Text>Nota: {nota}/5</Text>
        <Text>Ouvi em: {data}</Text>

        <View style={styles.espaco}>
          <Button title="Editar música" onPress={editar} />
        </View>

        <View style={styles.espaco}>
          <Button title="Excluir música" onPress={confirmarExclusao} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeeeee",
    padding: 20,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#ffffff",
    padding: 20,
  },

  nome: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },

  espaco: {
    marginTop: 20,
  },
});
