// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">Pokémon CRUD</Link>
        <div className="nav-links">
          <Link to="/criar">Criar</Link>
          <Link to="/listar">Listar</Link>
        </div>
      </div>
    </nav>
  );
}