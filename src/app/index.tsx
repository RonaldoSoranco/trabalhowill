import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { auth } from "@/lib/firebase";
import { buscarMusicas, sairDaConta } from "@/services/music";
import MusicCard from "../components/MusicCard";
import { Music } from "../types/music";

export default function HomeScreen() {
  const router = useRouter();

  const [busca, setBusca] = useState("");
  const [musicas, setMusicas] = useState<Music[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const usuario = auth.currentUser;

    if (!usuario) {
      return;
    }

    const pararBusca = buscarMusicas(usuario.uid, setMusicas);

    return () => pararBusca();
  }, []);

  const musicasFiltradas = musicas.filter((musica) =>
    musica.nome.toLowerCase().includes(busca.trim().toLowerCase()),
  );

  const somaDasNotas = musicas.reduce(
    (total, musica) => total + musica.nota,
    0,
  );

  const media =
    musicas.length > 0
      ? (somaDasNotas / musicas.length).toFixed(1).replace(".", ",")
      : "Sem avaliações";

  async function sair() {
    await sairDaConta();
    router.replace("/login");
  }
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Músicas que já ouvi</Text>

      <Text style={styles.media}>Média das notas: {media}</Text>

      <Link href="/form" asChild>
        <Button title="Adicionar música" />
      </Link>

      <View style={{ marginTop: 10 }}>
        <Button title="Sair" onPress={sair} />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Buscar pelo nome da música"
        value={busca}
        onChangeText={setBusca}
      />

      <FlatList
        data={musicasFiltradas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: "/details",
              params: {
                nome: item.nome,
                artista: item.artista,
                nota: String(item.nota),
                data: item.data,
                id: item.id,
              },
            }}
            asChild
          >
            <Pressable>
              <MusicCard musica={item} />
            </Pressable>
          </Link>
        )}
        ListEmptyComponent={
          <Text>
            {busca.trim()
              ? "Nenhuma música encontrada."
              : "Nenhuma música cadastrada."}
          </Text>
        }
      />
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

  media: {
    fontSize: 16,
    marginBottom: 16,
  },

  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#cccccc",
    padding: 12,
    marginTop: 16,
    marginBottom: 16,
  },
});
