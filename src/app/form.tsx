import { useLocalSearchParams, useRouter } from "expo-router";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";

import { auth, db } from "../lib/firebase";
import { editarMusica } from "../services/music";

export default function FormScreen() {
  const router = useRouter();

  const params = useLocalSearchParams<{
    id?: string;
    nome?: string;
    artista?: string;
    nota?: string;
    data?: string;
  }>();

  const [nome, setNome] = useState(params.nome || "");
  const [artista, setArtista] = useState(params.artista || "");
  const [nota, setNota] = useState(params.nota || "");
  const [data, setData] = useState(params.data || "");
  const [salvando, setSalvando] = useState(false);

  const editando = params.id !== undefined;

  async function salvarMusica() {
    if (salvando) return;

    if (
      nome.trim() === "" ||
      artista.trim() === "" ||
      nota.trim() === "" ||
      data.trim() === ""
    ) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    const notaNumero = Number(nota);

    if (!Number.isInteger(notaNumero) || notaNumero < 1 || notaNumero > 5) {
      Alert.alert("Nota inválida", "Digite um número inteiro de 1 a 5.");
      return;
    }

    const usuario = auth.currentUser;

    if (!usuario) {
      Alert.alert("Atenção", "Entre na sua conta para salvar uma música.");
      return;
    }

    setSalvando(true);

    try {
      if (editando && params.id) {
        await editarMusica(
          params.id,
          nome.trim(),
          artista.trim(),
          notaNumero,
          data.trim(),
        );

        Alert.alert("Pronto!", "Música editada com sucesso.");
        router.replace("/");
      } else {
        await addDoc(collection(db, "musicas"), {
          nome: nome.trim(),
          artista: artista.trim(),
          nota: notaNumero,
          data: data.trim(),
          userId: usuario.uid,
        });

        setNome("");
        setArtista("");
        setNota("");
        setData("");

        Alert.alert("Pronto!", "Música salva com sucesso.");
      }
    } catch {
      Alert.alert("Erro", "Não foi possível salvar a música.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.titulo}>
        {editando ? "Editar música" : "Cadastrar música"}
      </Text>

      <Text>Nome da música</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex.: Master of Puppets"
        value={nome}
        onChangeText={setNome}
        editable={!salvando}
      />

      <Text>Artista</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex.: Metallica"
        value={artista}
        onChangeText={setArtista}
        editable={!salvando}
      />

      <Text>Nota de 1 a 5</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex.: 5"
        keyboardType="numeric"
        value={nota}
        onChangeText={setNota}
        editable={!salvando}
      />

      <Text>Data em que ouviu</Text>
      <TextInput
        style={styles.input}
        placeholder="DD/MM/AAAA"
        value={data}
        onChangeText={setData}
        editable={!salvando}
      />

      <Button
        title={
          salvando
            ? "Salvando..."
            : editando
              ? "Salvar alterações"
              : "Salvar música"
        }
        onPress={salvarMusica}
        disabled={salvando}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
    padding: 12,
    marginTop: 4,
    marginBottom: 16,
  },
});
