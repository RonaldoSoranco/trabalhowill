import { StyleSheet, Text, View } from "react-native";
import { Music } from "../types/music";

type Props = {
  musica: Music;
};

export default function MusicCard({ musica }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.nome}>{musica.nome}</Text>
      <Text>Artista: {musica.artista}</Text>
      <Text>Nota: {musica.nota}/5</Text>
      <Text>Ouvi em: {musica.data}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
  },
  nome: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
