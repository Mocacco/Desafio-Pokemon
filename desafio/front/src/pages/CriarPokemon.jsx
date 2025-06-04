import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';  // Alterado para usar o api mockado

const CriarPokemon = () => {
  const [tipo, setTipo] = useState('');
  const [treinador, setTreinador] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');

    try {
      const response = await api.post('/pokemons', { tipo, treinador });
      setMensagem(`Pokémon criado com sucesso! ID: ${response.data.id}`);
      setTipo('');
      setTreinador('');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setMensagem(`Erro: ${error.response.data.message}`);
      } else {
        setMensagem('Erro ao criar Pokémon. Tente novamente.');
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Criar Pokémons</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="pokemon">Pokémon:</label>
          <select id="pokemon" value={tipo} onChange={e => setTipo(e.target.value)} required>
            <option value="">Selecione um pokémon</option>
            <option value="pikachu">Pikachu</option>
            <option value="charizard">Charizard</option>
            <option value="mewtwo">Mewtwo</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="treinador">Treinador:</label>
          <input
            id="treinador"
            type="text"
            placeholder="Nome do treinador"
            value={treinador}
            onChange={e => setTreinador(e.target.value)}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit">Criar Pokémon</button>
          <button type="button" className="btn-secondary" onClick={() => navigate('/')}>
            Voltar
          </button>
        </div>

        {mensagem && <p>{mensagem}</p>}
      </form>
    </div>
  );
};

export default CriarPokemon;
