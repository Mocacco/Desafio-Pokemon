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

app.post('/batalhar/:pokemonAId/:pokemonBId', async (req, res) => {
    try {
        const idA = parseInt(req.params.pokemonAId);
        const idB = parseInt(req.params.pokemonBId);

        const pokeA = await pokemon.carregarpoke(idA);
        const pokeB = await pokemon.carregarpoke(idB);

        if (!pokeA || !pokeB) {
            return res.status(404).json({ erro: "Um dos pokémons não foi encontrado" });
        }

        const totalNivel = pokeA.nivel + pokeB.nivel;
        const chanceA = pokeA.nivel / totalNivel;

        const vencedor = Math.random() < chanceA ? pokeA : pokeB;
        const perdedor = vencedor.id === pokeA.id ? pokeB : pokeA;

        vencedor.nivel += 1;
        await pokemon.atualizarNivel(vencedor.id, vencedor.nivel);

        let perdedorFinal = { ...perdedor };
        perdedor.nivel -= 1;

        if (perdedor.nivel <= 0) {
            await pokemon.deletarPoke(perdedor.id);
            perdedorFinal.nivel = 0;
        } else {
            await pokemon.atualizarNivel(perdedor.id, perdedor.nivel);
            perdedorFinal.nivel = perdedor.nivel;
        }

        res.status(200).json({
            vencedor,
            perdedor: perdedorFinal
        });
    } catch (err) {
        console.error("Erro na batalha:", err); // <-- Mostra o erro no terminal
        res.status(500).json({ erro: "Erro interno na batalha" });
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


