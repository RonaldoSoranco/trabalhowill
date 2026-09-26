import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { auth, db } from "@/lib/firebase";
import { Music } from "@/types/music";

export async function signInWithEmail(email: string, password: string) {
  const result = await signInWithEmailAndPassword(auth, email, password);

  return result.user;
}

export async function createAccount(email: string, password: string) {
  const result = await createUserWithEmailAndPassword(auth, email, password);

  return result.user;
}

export function buscarMusicas(
  userId: string,
  setMusicas: (musicas: Music[]) => void,
) {
  const consulta = query(
    collection(db, "musicas"),
    where("userId", "==", userId),
  );

  return onSnapshot(consulta, (snapshot) => {
    const musicas = snapshot.docs.map((documento) => {
      const dados = documento.data();

      return {
        id: documento.id,
        nome: dados.nome,
        artista: dados.artista,
        nota: dados.nota,
        data: dados.data,
      };
    });

    setMusicas(musicas);
  });
}

export async function excluirMusica(id: string) {
  await deleteDoc(doc(db, "musicas", id));
}

export async function editarMusica(
  id: string,
  nome: string,
  artista: string,
  nota: number,
  data: string,
) {
  await updateDoc(doc(db, "musicas", id), {
    nome: nome,
    artista: artista,
    nota: nota,
    data: data,
  });
}

export async function sairDaConta() {
  await signOut(auth);
}
