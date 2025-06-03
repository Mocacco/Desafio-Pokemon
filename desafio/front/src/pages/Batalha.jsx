import { useState, useEffect } from 'react';

export default function Batalha() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonAId, setPokemonAId] = useState('');
  const [pokemonBId, setPokemonBId] = useState('');
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/pokemons')
      .then(res => res.json())
      .then(setPokemons)
      .catch(() => setErro('Erro ao carregar pokémons.'));
  }, []);

  async function batalhar() {
    if (pokemonAId === pokemonBId) {
      setErro('Selecione pokémons diferentes!');
      setResultado(null);
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/batalhar/${pokemonAId}/${pokemonBId}`, {
        method: 'POST',
      });
      const data = await res.json();
      setResultado(data);
      setErro('');
    } catch (err) {
      setErro('Erro na batalha.');
      setResultado(null);
    }
  }

  // Busca os dados do Pokémon selecionado no array pokemons
  const pokemon1 = pokemons.find(p => p.id === Number(pokemonAId));
  const pokemon2 = pokemons.find(p => p.id === Number(pokemonBId));

  return (
    <div className="batalha-container">
      <h2>⚔️ Batalha Pokémon</h2>

      <div className="form-group">
        <label>ID do Pokémon 1</label>
        <input
          type="number"
          value={pokemonAId}
          onChange={e => setPokemonAId(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>ID do Pokémon 2</label>
        <input
          type="number"
          value={pokemonBId}
          onChange={e => setPokemonBId(e.target.value)}
        />
      </div>

      <div className="batalha-actions">
        <button onClick={batalhar}>Iniciar Batalha</button>
      </div>

      <div className="pokemons-batalha">
        {pokemon1 && (
          <div className="pokemon-box">
            <h3>Pokémon 1</h3>
            <p><strong>ID:</strong> {pokemon1.id}</p>
            <p><strong>Tipo:</strong> {pokemon1.tipo}</p>
            <p><strong>Treinador:</strong> {pokemon1.treinador}</p>
            <p><strong>Nível:</strong> {pokemon1.nivel}</p>
          </div>
        )}

        <div className="vs-text">VS</div>

        {pokemon2 && (
          <div className="pokemon-box">
            <h3>Pokémon 2</h3>
            <p><strong>ID:</strong> {pokemon2.id}</p>
            <p><strong>Tipo:</strong> {pokemon2.tipo}</p>
            <p><strong>Treinador:</strong> {pokemon2.treinador}</p>
            <p><strong>Nível:</strong> {pokemon2.nivel}</p>
          </div>
        )}
      </div>

      {resultado && <div className="pokemon-box">
        <h3>Pokémon vencedor</h3>
            <p><strong>ID:</strong> {pokemon2.id}</p>
            <p><strong>Tipo:</strong> {pokemon2.tipo}</p>
            <p><strong>Treinador:</strong> {pokemon2.treinador}</p>
            <p><strong>Nível:</strong> {pokemon2.nivel}</p></div>}
      {erro && <div className="erro-batalha">{erro}</div>}
    </div>
  );
}
