let pokemons = [];
let idCont = 1;

const pokemonPermitidos = ['mewtwo', 'charizard', 'pikachu'];

function criarPokemon({ tipo, treinador }) {
    if (!pokemonPermitidos.includes(tipo.toLowerCase())) {
        throw new Error("Tipo inválido");
    }

    const novo = {
        id: idCont++,
        tipo: tipo.toLowerCase(),
        treinador,
        nivel: 1
    };

    pokemons.push(novo);
    return novo;
}

function alterarTrainer(id, treinador) {
    const pokemon = pokemons.find(p => p.id == id);
    if (!pokemon) return false;
    pokemon.treinador = treinador;
    return true;
}

function deletarPoke(id) {
    const index = pokemons.findIndex(p => p.id == id);
    if (index === -1) return false;
    pokemons.splice(index, 1);
    return true;
}

function carregarpoke(id) {
    return pokemons.find(p => p.id == id);
}

function listarpoke() {
    return pokemons;
}

export default {
    criarPokemon,  // Fixed the name here
    alterarTrainer,
    deletarPoke,
    carregarpoke,
    listarpoke
};