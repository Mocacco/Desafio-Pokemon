import { connect } from '../src/db.js';


const pokemonPermitidos = ['mewtwo', 'charizard', 'pikachu'];

export async function criarPokemon({ tipo, treinador }) {
  if (!pokemonPermitidos.includes(tipo.toLowerCase())) {
    throw new Error("Tipo inválido");
  }

  const db = await connect();
  const result = await db.run(
    'INSERT INTO pokemons (tipo, treinador, nivel) VALUES (?, ?, 1)',
    [tipo.toLowerCase(), treinador]
  );

  return {
    id: result.lastID,
    tipo: tipo.toLowerCase(),
    treinador,
    nivel: 1
  };
}

export async function alterarTrainer(id, treinador) {
  const db = await connect();
  const result = await db.run(
    'UPDATE pokemons SET treinador = ? WHERE id = ?',
    [treinador, id]
  );
  return result.changes > 0;
}

export async function deletarPoke(id) {
  const db = await connect();
  const result = await db.run('DELETE FROM pokemons WHERE id = ?', [id]);
  return result.changes > 0;
}

export async function carregarpoke(id) {
  const db = await connect();
  return db.get('SELECT * FROM pokemons WHERE id = ?', [id]);
}

export async function listarpoke() {
  const db = await connect();
  return db.all('SELECT * FROM pokemons');
}
