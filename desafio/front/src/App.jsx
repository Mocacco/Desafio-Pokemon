// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Remova BrowserRouter daqui
import Home from './pages/home';
import CriarPokemon from './pages/CriarPokemon';
import Listar from './pages/ListarPokemons';
import DeletarPokemon from './pages/DeletarPokemon';
import AlterarTreinador from './pages/AlterarTreinador';
import Navbar from './components/Navbar';
import './App.css';

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
        </Routes>
      </div>
    </div>
  );
}

export default App;