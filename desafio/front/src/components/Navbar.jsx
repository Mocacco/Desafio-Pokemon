import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">PokéMint</Link>
        <div className="nav-links">
          <Link to="/criar">Criar</Link>
          <Link to="/listar">Listar</Link>
          <Link to="/batalha">Batalha</Link>
        </div>
      </div>
    </nav>
  );
}