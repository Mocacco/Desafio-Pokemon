import React, { useState } from 'react';
import api from '../services/api'; 

export default function BuscarPokemon() {
  const [pokemonId, setPokemonId] = useState('');
  const [pokemonEncontrado, setPokemonEncontrado] = useState(null);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleBuscarPokemon = async () => {
    // Limpa estados anteriores
    setPokemonEncontrado(null);
    setErro('');

    if (!pokemonId) {
      setErro('Por favor, digite um ID de Pokémon.');
      return;
    }

    setCarregando(true);
    try {
      const response = await api.get(`/pokemons/${pokemonId}`);
      setPokemonEncontrado(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErro(`Pokémon com ID ${pokemonId} não encontrado.`);
      } else {
        setErro('Erro ao buscar Pokémon. Tente novamente mais tarde.');
        console.error('Erro ao buscar Pokémon:', error);
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="buscar-pokemon-container" data-cy="buscar-pokemon-page">
      <h2>🔍 Buscar Pokémon por ID</h2>

      <div className="form-group">
        <label htmlFor="pokemonIdInput">Digite o ID do Pokémon:</label>
        <input
          id="pokemonIdInput"
          type="number"
          value={pokemonId}
          onChange={(e) => setPokemonId(e.target.value)}
          placeholder="Ex: 1"
          data-cy="pokemon-id-input"
        />
      </div>

      <div className="buscar-actions">
        <button
          onClick={handleBuscarPokemon}
          disabled={carregando}
          data-cy="buscar-pokemon-button"
        >
          {carregando ? 'Buscando...' : 'Buscar Pokémon'}
        </button>
      </div>

      {erro && <div className="mensagem-erro" data-cy="erro-mensagem">{erro}</div>}

      {pokemonEncontrado && (
        <div className="pokemon-details-card" data-cy="pokemon-encontrado">
          <h3>Detalhes do Pokémon</h3>
          <p><strong>ID:</strong> {pokemonEncontrado.id}</p>
          <p><strong>Tipo:</strong> {pokemonEncontrado.tipo}</p>
          <p><strong>Treinador:</strong> {pokemonEncontrado.treinador}</p>
          <p><strong>Nível:</strong> {pokemonEncontrado.nivel}</p>
          {pokemonEncontrado.nivel <= 0 && (
            <p className="eliminado">ELIMINADO</p>
          )}
        </div>
      )}

      {!pokemonEncontrado && !erro && !carregando && pokemonId && (
        <p className="instrucao-busca">Digite um ID e clique em "Buscar Pokémon".</p>
      )}
    </div>
  );
}