import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // <-- importa os matchers
import DeletePokemon from './DeletarPokemon';
import api from '../services/api';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

beforeAll(() => {
  window.alert = jest.fn();  // Mock do alert
});

test('deve deletar o Pokémon com sucesso e navegar para /listar', async () => {
  api.delete = jest.fn().mockResolvedValueOnce();

  render(
    <MemoryRouter initialEntries={['/deletar/123']}>
      <Routes>
        <Route path="/deletar/:id" element={<DeletePokemon />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText(/Deletando Pokémon.../i)).toBeInTheDocument();

  await waitFor(() => {
    expect(api.delete).toHaveBeenCalledWith('/pokemons/123');
    expect(window.alert).toHaveBeenCalledWith('Pokémon deletado com sucesso!');
    // Aqui você pode também testar o redirecionamento, mockando navigate se quiser
  });
});
