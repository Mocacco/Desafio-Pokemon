// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Remova BrowserRouter daqui
import Home from './pages/home';
import CriarPokemon from './pages/CriarPokemon';
import Listar from './pages/ListarPokemons';
import DeletarPokemon from './pages/DeletarPokemon';
import AlterarTreinador from './pages/AlterarTreinador';
import Batalha from  './pages/Batalha'
import Navbar from './components/Navbar';
import './App.css';
import BuscarPokemon from './pages/BuscarPokemon';

function App() {
  return (
    <div className="App"> 
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/criar" element={<CriarPokemon />} />
          <Route path="/listar" element={<Listar />} />
          <Route path="/deletar/:id" element={<DeletarPokemon />} />
          <Route path="/alterar/:id" element={<AlterarTreinador />} />
          <Route path="/batalha" element={<Batalha />} />
          <Route path="/buscar" element={<BuscarPokemon />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;