import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import api from "../services/api";

export default function DeletePokemon() {
  const { id } = useParams();
  const navigate = useNavigate();
  const executado = useRef(false);

  useEffect(() => {
    const deletar = async () => {
      try {
        await api.delete(`/pokemons/${id}`);
        alert("Pokémon deletado com sucesso!");
        navigate("/listar");
      } catch (err) {
        alert("Erro ao deletar Pokémon");
        navigate("/listar");
      }
    };

    if (!executado.current) {
      executado.current = true;
      deletar();
    }
  }, [id, navigate]);

  return <p>Deletando Pokémon...</p>;
}
