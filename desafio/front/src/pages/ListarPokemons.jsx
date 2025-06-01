// src/pages/ListarPokemons.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function ListarPokemons() {
  const [pokemons, setPokemons] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const carregarPokemons = async () => {
      try {
        const response = await api.get("/pokemons");
        setPokemons(response.data);
        setCarregando(false);
      } catch (error) {
        setErro("Erro ao carregar Pokémons");
        setCarregando(false);
      }
    };
    
    carregarPokemons();
  }, []);

  if (carregando) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando Pokémons...</p>
      </div>
    );
  }

  if (erro) {
    return <div className="error-message">{erro}</div>;
  }

  return (
    <div className="list-container">
      <h2>Lista de Pokémons</h2>
      
      {pokemons.length === 0 ? (
        <div className="empty-list">
          <p>Nenhum Pokémon encontrado</p>
          <Link to="/criar" className="btn-primary">
            Criar Primeiro Pokémon
          </Link>
        </div>
      ) : (
        <div className="pokemon-grid">
          {pokemons.map(pokemon => (
            <div key={pokemon.id} className="pokemon-card">
              <div className="pokemon-header">
                <h3>{pokemon.tipo.charAt(0).toUpperCase() + pokemon.tipo.slice(1)}</h3>
                <span className="pokemon-id">#{pokemon.id}</span>
              </div>
              <div className="pokemon-details">
                <p><strong>Treinador:</strong> {pokemon.treinador}</p>
                <p><strong>Nível:</strong> {pokemon.nivel}</p>
              </div>
              <div className="pokemon-actions">
                <Link to={`/alterar/${pokemon.id}`} className="btn-edit">
                  Alterar
                </Link>
                <Link to={`/deletar/${pokemon.id}`} className="btn-delete">
                  Deletar
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}