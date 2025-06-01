// src/pages/CriarPokemon.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function CriarPokemon() {
  const [tipo, setTipo] = useState("");
  const [treinador, setTreinador] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso(false);
    
    try {
      const res = await api.post("/pokemons", { tipo, treinador });
      setSucesso(true);
      setTipo("");
      setTreinador("");
      
      // Limpa o sucesso após 3 segundos
      setTimeout(() => {
        setSucesso(false);
        navigate('/listar');
      }, 2000);
    } catch (error) {
      setErro(error.response?.data?.erro || "Erro ao criar Pokémon");
    }
  };

  return (
    <div className="form-container">
      <h2>Criar Pokémon</h2>
      {sucesso && <div className="success-message">Pokémon criado com sucesso!</div>}
      {erro && <div className="error-message">{erro}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tipo:</label>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
          >
            <option value="">Selecione um tipo</option>
            <option value="pikachu">Pikachu</option>
            <option value="charizard">Charizard</option>
            <option value="mewtwo">Mewtwo</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Treinador:</label>
          <input
            type="text"
            placeholder="Nome do treinador"
            value={treinador}
            onChange={(e) => setTreinador(e.target.value)}
            required
          />
        </div>
        
        <div className="form-actions">
          <button type="submit">Criar Pokémon</button>
          <button type="button" className="btn-secondary" onClick={() => navigate('/')}>
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
}