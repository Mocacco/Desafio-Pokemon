// src/pages/Home.js
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>PokéMint</h1>
      <div className="button-grid">
        <button className="btn-primary" onClick={() => navigate('/criar')}>
          Criar Pokémon
        </button>
        <button className="btn-primary" onClick={() => navigate('/listar')}>
          Listar Pokémons
        </button>
        <button className="btn-primary" onClick={() => navigate('/batalha')}>
          Batalhar
        </button>
      </div>
    </div>
  );
}