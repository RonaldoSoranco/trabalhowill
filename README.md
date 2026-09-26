# Minhas Músicas

Aplicativo desenvolvido em React Native com Expo e TypeScript para cadastrar e avaliar músicas que o usuário já ouviu.

O aplicativo utiliza Firebase Authentication para login e cadastro de usuários e Cloud Firestore para salvar as músicas.

## Funcionalidades

- Criar conta
- Fazer login
- Fazer logout
- Cadastrar músicas
- Listar músicas cadastradas
- Ver detalhes de uma música
- Editar músicas
- Excluir músicas
- Buscar música pelo nome
- Dar uma nota de 1 a 5
- Calcular a média das notas
- Separar as músicas de cada usuário

## Tecnologias utilizadas

- React Native
- Expo
- TypeScript
- Firebase Authentication
- Cloud Firestore
- Expo Router

## Modelo de dados

Cada música possui os seguintes dados:

- id: identificador da música
- nome: nome da música
- artista: nome do artista
- nota: avaliação de 1 a 5
- data: data em que a música foi ouvida
- userId: UID do usuário que cadastrou a música

Exemplo:

```json
{
  "nome": "Master of Puppets",
  "artista": "Metallica",
  "nota": 5,
  "data": "26/09/2026",
  "userId": "UID_DO_USUARIO"
}


Firebase
O projeto utiliza Firebase Authentication com e-mail e senha.

O Cloud Firestore é utilizado para armazenar as músicas cadastradas.

Cada música possui o userId do usuário que fez o cadastro. Dessa forma, cada usuário visualiza somente suas próprias músicas.

regras firestore:

rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    match /musicas/{musicaId} {

      allow create: if request.auth != null
                    && request.resource.data.userId == request.auth.uid;

      allow read, delete: if request.auth != null
                          && resource.data.userId == request.auth.uid;

      allow update: if request.auth != null
                    && resource.data.userId == request.auth.uid
                    && request.resource.data.userId == request.auth.uid;
    }
  }
}


Como instalar
Primeiro instale as dependências:

npm install

Depois execute o projeto:

npx expo start

Para executar no navegador:

npx expo start --web
```
