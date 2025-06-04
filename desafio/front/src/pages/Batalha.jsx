import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function Batalha() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonAId, setPokemonAId] = useState('');
  const [pokemonBId, setPokemonBId] = useState('');
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const carregarPokemons = async () => {
      try {
        const response = await api.get('/pokemons');
        setPokemons(response.data);
      } catch (error) {
        setErro('Erro ao carregar pokémons.');
      }
    };
    carregarPokemons();
  }, []);

  const batalhar = async () => {
    // Clear previous results and errors before new battle attempt
    setResultado(null);
    setErro('');

    if (!pokemonAId || !pokemonBId) {
      setErro('Selecione ambos os pokémons!');
      return;
    }

    if (pokemonAId === pokemonBId) {
      setErro('Selecione pokémons diferentes!');
      return;
    }

    setCarregando(true);

    try {
      const response = await api.post(`/batalhar/${pokemonAId}/${pokemonBId}`);
      setResultado(response.data);

      // Refresh pokemons after battle to reflect level changes/elimination
      // This part also needs to be robust if the get fails
      try {
        const updatedPokemonsResponse = await api.get('/pokemons');
        setPokemons(updatedPokemonsResponse.data.filter(p => p.nivel > 0)); // Filter out eliminated pokemons
      } catch (fetchError) {
        console.error('Erro ao atualizar lista de pokémons após batalha:', fetchError);
        // Optionally, you might want to show a message about this specific error
      }

    } catch (error) {
      setErro(error.response?.data?.erro || 'Erro na batalha.');
    } finally {
      setCarregando(false);
    }
  };


  const pokemon1 = pokemons.find(p => p.id === Number(pokemonAId));
  const pokemon2 = pokemons.find(p => p.id === Number(pokemonBId));

  return (
    <div className="batalha-container" data-cy="batalha-page">
      <h2>⚔️ Batalha Pokémon</h2>

      <div className="form-group">
        <label htmlFor="pokemon1-id">ID do Pokémon 1</label> {/* Added htmlFor */}
        <input
          id="pokemon1-id" // Added id
          type="number"
          value={pokemonAId}
          onChange={e => setPokemonAId(e.target.value)}
          data-cy="select-pokemon1"
        />
      </div>

      <div className="form-group">
        <label htmlFor="pokemon2-id">ID do Pokémon 2</label> {/* Added htmlFor */}
        <input
          id="pokemon2-id" // Added id
          type="number"
          value={pokemonBId}
          onChange={e => setPokemonBId(e.target.value)}
          data-cy="select-pokemon2"
        />
      </div>

      <div className="batalha-actions">
        <button
          onClick={batalhar}
          disabled={carregando}
          data-cy="iniciar-batalha"
        >
          {carregando ? 'Batalhando...' : 'Iniciar Batalha'}
        </button>
      </div>

      {erro && <div className="erro-batalha" data-cy="erro-mensagem">{erro}</div>}

      <div className="pokemons-batalha">
        {pokemon1 && (
          <div className="pokemon-box" data-cy="pokemon-1">
            <h3>Pokémon 1</h3>
            <p><strong>ID:</strong> {pokemon1.id}</p>
            <p><strong>Tipo:</strong> {pokemon1.tipo}</p>
            <p><strong>Treinador:</strong> {pokemon1.treinador}</p>
            <p><strong>Nível:</strong> {pokemon1.nivel}</p>
          </div>
        )}

        <div className="vs-text">VS</div>

        {pokemon2 && (
          <div className="pokemon-box" data-cy="pokemon-2">
            <h3>Pokémon 2</h3>
            <p><strong>ID:</strong> {pokemon2.id}</p>
            <p><strong>Tipo:</strong> {pokemon2.tipo}</p>
            <p><strong>Treinador:</strong> {pokemon2.treinador}</p>
            <p><strong>Nível:</strong> {pokemon2.nivel}</p>
          </div>
        )}
      </div>

      {resultado && (
        <div className="resultado-batalha" data-cy="resultado-batalha">
          {resultado.vencedor ? (
            <>
              <div className="pokemon-box vencedor" data-cy="vencedor">
                <h3>Vencedor</h3>
                <p><strong>ID:</strong> {resultado.vencedor.id}</p>
                <p><strong>Tipo:</strong> {resultado.vencedor.tipo}</p>
                <p><strong>Treinador:</strong> {resultado.vencedor.treinador}</p>
                <p><strong>Nível:</strong> {resultado.vencedor.nivel}</p>
              </div>

              <div className="pokemon-box perdedor" data-cy="perdedor">
                <h3>Perdedor</h3>
                <p><strong>ID:</strong> {resultado.perdedor.id}</p>
                <p><strong>Tipo:</strong> {resultado.perdedor.tipo}</p>
                <p><strong>Treinador:</strong> {resultado.perdedor.treinador}</p>
                <p><strong>Nível:</strong> {resultado.perdedor.nivel}</p>
                {resultado.perdedor.nivel <= 0 && (
                  <p className="eliminado">ELIMINADO</p>
                )}
              </div>
            </>
          ) : (
            <p>Erro: a batalha não pode ser concluída</p>
          )}
        </div>
      )}
    </div>
  );
}