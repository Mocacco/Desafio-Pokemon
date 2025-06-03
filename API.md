# Documentação da API

## Introdução

Esta API permite a criação e gerenciamento de pokémons, alem de permitir batalhas entre pokémons

### Base URL

`http://localhost:3000`

---

## Endpoints

### 1.Criar Pokémon
### **1. Registrar Pokemon**

- **Método:** `POST`
- **URL:** `/pokemons`
- **Descrição:** Cria um novo pokemon e inicializa informações relacionadas ao treinador.
- **Body (JSON):**

  ```json
  {
  "tipo": "string (pikachu|charizard|mewtwo)",
  "treinador": "string"
  }
  ```

- **Resposta (JSON):**

  ```json
  {
  "id": "number",
  "tipo": "string",
  "treinador": "string",
  "nivel": "number"
  }
  ```

### **2. Listar Pokémon**

- **Método:** `GET`
- **URL:** `/pokemons`
- **Descrição:** Retorna todos os pokémons registrados.
- **Resposta (JSON):**

  ```json
  {
    
    "id": "number",
    "tipo": "string",
    "treinador": "string",
    "nivel": "number"
  
  }
  ```

### **3. Atualizar Treinador**

- **Método:** `PUT`
- **URL:** `/pokemons/:id`
- **Descrição:** Atualiza o treinador de um pokemon
- **Body (JSON):**

  ```json
  {
    "treinador": "string"
  }
  ```

- **Resposta (JSON):**

  ```json
  {
    "id": "number",
    "tipo": "string",
    "treinador": "string",
    "nivel": "number"
  }
  ```

  ### **4. Deletar Pokémon**
- **Método:** `DELETE`
- **URL:** `/pokemons/:id`
- **Descrição:** Deleta um pokémon
- **Body (JSON):**

  ```json
  {
    "id": "number"
  }
  ```

- **Resposta (JSON):**

  ```json
  {
   "204: Pokémon removido"
  }
  ```

### **5. Buscar Pokémon**
- **Método:** `GET`
- **URL:** `/pokemons/:id`
- **Descrição:** Busca um pokémon especifico

- **Resposta (JSON):**

  ```json
  {
    "id": "number",
    "tipo": "string",
    "treinador": "string",
    "nivel": "number"
  }
  ```

  ### **6. Batalha Pokémon**
- **Método:** `POST`
- **URL:** `/pokemons/batalhar/:pokemonAId/:pokemonBId`
- **Descrição:** Realiza ema batalha entre 2 pokémons
- **Body (JSON):**

  ```json
  {
    "id1": "number"
    "id2": "number"
  }
  ```

- **Resposta (JSON):**

  ```json
  {
   "vencedor": {
    "id": "number",
    "tipo": "string",
    "treinador": "string",
    "nivel": "number"
    },
    "perdedor": {
    "id": "number",
    "tipo": "string",
    "treinador": "string",
    "nivel": "number"
    }
  }
  ```