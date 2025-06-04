import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'; // Import 'act'
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

import CriarPokemon from './CriarPokemon';
import api from '../services/api';

jest.mock('../services/api');

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('CriarPokemon', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar o formulário com campos e botões', () => {
    renderWithRouter(<CriarPokemon />);
    expect(screen.getByText('Criar Pokémons')).toBeInTheDocument();
    expect(screen.getByLabelText('Pokémon:')).toBeInTheDocument();
    expect(screen.getByLabelText('Treinador:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Criar Pokémon/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Voltar/i })).toBeInTheDocument();
  });

  it('deve criar Pokémon com sucesso e exibir mensagem', async () => {
    api.post.mockResolvedValueOnce({
      data: {
        id: 1,
        tipo: 'pikachu',
        treinador: 'Ash',
        nivel: 1,
      },
    });

    renderWithRouter(<CriarPokemon />);
    fireEvent.change(screen.getByLabelText('Pokémon:'), { target: { value: 'pikachu' } });
    fireEvent.change(screen.getByLabelText('Treinador:'), { target: { value: 'Ash' } });

    // Wrap the interaction that causes state updates in 'act'
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Criar Pokémon/i }));
    });

    // Use findByText which inherently waits for the element
    expect(await screen.findByText(/Pokémon criado com sucesso! ID: \d+/i)).toBeInTheDocument();
    expect(api.post).toHaveBeenCalledWith('/pokemons', { tipo: 'pikachu', treinador: 'Ash' });
  });

  it('deve exibir mensagem de erro se a API falhar com mensagem personalizada', async () => {
    // Mock the error to have a 'message' property for consistency with component logic
    api.post.mockRejectedValueOnce({
      response: { data: { message: 'Treinador já possui um Pokémon' } },
    });

    renderWithRouter(<CriarPokemon />);
    fireEvent.change(screen.getByLabelText('Pokémon:'), { target: { value: 'mewtwo' } });
    fireEvent.change(screen.getByLabelText('Treinador:'), { target: { value: 'Gary' } });

    // Wrap the interaction that causes state updates in 'act'
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Criar Pokémon/i }));
    });

    // Use findByText which inherently waits for the element
    expect(await screen.findByText('Erro: Treinador já possui um Pokémon')).toBeInTheDocument();
    expect(api.post).toHaveBeenCalledWith('/pokemons', { tipo: 'mewtwo', treinador: 'Gary' });
  });

  it('deve exibir erro genérico se erro da API não tiver mensagem', async () => {
    // Mock an empty error response to simulate no custom message
    api.post.mockRejectedValueOnce({
      response: { status: 500, data: {} }, // Or just: {}
    });

    renderWithRouter(<CriarPokemon />);
    fireEvent.change(screen.getByLabelText('Pokémon:'), { target: { value: 'charizard' } });
    fireEvent.change(screen.getByLabelText('Treinador:'), { target: { value: 'Brock' } });

    // Wrap the interaction that causes state updates in 'act'
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Criar Pokémon/i }));
    });

    // Use findByText which inherently waits for the element
    expect(await screen.findByText('Erro ao criar Pokémon. Tente novamente.')).toBeInTheDocument();
  });
});