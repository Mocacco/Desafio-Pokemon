# Documentação da API

## Introdução

Esta API permite a criação e gerenciamento de pokémons, alem de permitir batalhas entre pokémons

### Base URL

´http://localhost:3000´

---

## Endpoints

### 1.Criar Pokémon
### **1. Registrar Grupo**

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

#### post /pokemons

