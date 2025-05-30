import express from 'express';
import pokemon from './data/pokemons.js';
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors())

// Rota POST para criar Pokémon
app.post('/pokemons', (req, res) => {
    try {
        const novo = pokemon.criarPokemon(req.body);
        res.status(200).json(novo);
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
});

app.put('/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const sucesso = pokemon.alterarTrainer(id, req.body.treinador);
    if (sucesso) {
        res.sendStatus(204);
        console.log("treinador alterado com sucesso")
    } else {
        res.sendStatus(404);
    }
});

app.delete('/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const sucesso = pokemon.deletarPoke(id);
    if (sucesso) {
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

app.get('/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemon = pokemon.carregarpoke(id);
    if (pokemon) {
        res.status(200).json(pokemon);
    } else {
        res.sendStatus(404);
    }
});


// Rota GET para listar Pokémons
app.get('/pokemons', (req, res) => {
    res.status(200).json(pokemon.listarpoke());
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});