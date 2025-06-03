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


  const pokemon1 = pokemons.find(p => p.id === Number(pokemonAId));
  const pokemon2 = pokemons.find(p => p.id === Number(pokemonBId));
  const vencedor = pokemons.find(p => p.id === resultado?.vencedorId);


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

     {resultado && (
  <div className="resultado-batalha">

    {resultado.vencedor ? (
      <div className="pokemon-box vencedor">
        <h3>Vencedor</h3>
        <p><strong>ID:</strong> {resultado.vencedor.id}</p>
        <p><strong>Tipo:</strong> {resultado.vencedor.tipo}</p>
        <p><strong>Treinador:</strong> {resultado.vencedor.treinador}</p>
        <p><strong>Nível:</strong> {resultado.vencedor.nivel}</p>
      </div>
    ) : (
      <p>Erro a batalha não pode ocorrer novamente pois um dos pokémons morreu</p>
    )}
  </div>
)}
      {erro && <div className="erro-batalha">{erro}</div>}
    </div>
  );
}
