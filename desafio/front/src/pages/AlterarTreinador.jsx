import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

export default function AlterarTreinador() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [novoTreinador, setNovoTreinador] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const carregarPokemon = async () => {
      try {
        console.log(`Buscando Pokémon com ID: ${id}`);
        const response = await api.get(`/pokemons/${id}`);
        console.log('Resposta:', response.data);
        
        if (!response.data) {
          throw new Error('Pokémon não encontrado');
        }
        
        setPokemon(response.data);
        setNovoTreinador(response.data.treinador);
        setCarregando(false);
      } catch (error) {
        console.error('Erro:', error);
        setErro(error.response?.data?.error || "Pokémon não encontrado");
        setCarregando(false);
      }
    };
    
    if (id) carregarPokemon();
  }, [id]);


  if (!pokemon && !carregando) {
    return (
      <div className="error-container">
        <div className="error-message">{erro || "Pokémon não encontrado"}</div>
        <button onClick={() => navigate('/listar')} className="btn-primary">
          Voltar para a lista
        </button>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await api.put(`/pokemons/${id}`, { treinador: novoTreinador });
      setSucesso(true);
      
      // Redireciona após 2 segundos
      setTimeout(() => {
        navigate('/listar');
      }, 2000);
    } catch (error) {
      setErro("Erro ao atualizar treinador");
    }
  };

  if (carregando) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando...</p>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="error-container">
        <div className="error-message">{erro}</div>
        <button onClick={() => navigate('/listar')} className="btn-primary">
          Voltar para a lista
        </button>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h2>Alterar Treinador</h2>
      
      {sucesso ? (
        <div className="success-message">
          Treinador alterado com sucesso! Redirecionando...
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="pokemon-info">
            <p><strong>Pokémon:</strong> {pokemon.tipo.charAt(0).toUpperCase() + pokemon.tipo.slice(1)}</p>
            <p><strong>ID:</strong> {pokemon.id}</p>
            <p><strong>Treinador atual:</strong> {pokemon.treinador}</p>
          </div>
          
          <div className="form-group">
            <label>Novo Treinador:</label>
            <input
              type="text"
              placeholder="Nome do novo treinador"
              value={novoTreinador}
              onChange={(e) => setNovoTreinador(e.target.value)}
              required
            />
          </div>
          
          <div className="form-actions">
            <button type="submit">Alterar Treinador</button>
            <button type="button" className="btn-secondary" onClick={() => navigate('/listar')}>
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}