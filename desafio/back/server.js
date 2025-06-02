import express from 'express';
import * as pokemon from './data/pokemons.js'; // novo caminho
import cors from 'cors';
import { initDb } from './src/initdb.js';

const app = express();
await initDb(); // inicializa o banco
app.use(express.json());
app.use(cors());

// POST - Criar Pokémon
app.post('/pokemons', async (req, res) => {
    try {
        const novo = await pokemon.criarPokemon(req.body);
        res.status(200).json(novo);
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
});

// PUT - Alterar treinador
app.put('/pokemons/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const sucesso = await pokemon.alterarTrainer(id, req.body.treinador);
    if (sucesso) {
        res.sendStatus(204);
        console.log("Treinador alterado com sucesso");
    } else {
        res.sendStatus(404);
    }
});

// DELETE - Deletar Pokémon
app.delete('/pokemons/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const sucesso = await pokemon.deletarPoke(id);
    if (sucesso) {
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

// GET - Buscar um Pokémon específico
app.get('/pokemons/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const resultado = await pokemon.carregarpoke(id);
    if (resultado) {
        res.status(200).json(resultado);
    } else {
        res.sendStatus(404);
    }
});

// GET - Listar todos os Pokémons
app.get('/pokemons', async (req, res) => {
    const lista = await pokemon.listarpoke();
    res.status(200).json(lista);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
