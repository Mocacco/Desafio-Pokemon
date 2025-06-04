// src/pages/BuscarPokemon.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import BuscarPokemon from './BuscarPokemon';
import api from '../services/api';

jest.mock('../services/api');

describe('BuscarPokemon', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar o título e o campo de input', () => {
    render(<BuscarPokemon />);
    expect(screen.getByText('🔍 Buscar Pokémon por ID')).toBeInTheDocument();
    expect(screen.getByLabelText('Digite o ID do Pokémon:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Buscar Pokémon/i })).toBeInTheDocument();
  });

  it('deve exibir mensagem de erro se o ID estiver vazio ao buscar', async () => {
    render(<BuscarPokemon />);
    fireEvent.click(screen.getByRole('button', { name: /Buscar Pokémon/i }));
    expect(await screen.findByText('Por favor, digite um ID de Pokémon.')).toBeInTheDocument();
    expect(api.get).not.toHaveBeenCalled();
  });

  it('deve exibir detalhes do Pokémon se a busca for bem-sucedida', async () => {
    const mockPokemon = {
      id: 25,
      tipo: 'pikachu',
      treinador: 'Ash',
      nivel: 10,
    };
    api.get.mockResolvedValueOnce({ data: mockPokemon });

    render(<BuscarPokemon />);
    fireEvent.change(screen.getByLabelText('Digite o ID do Pokémon:'), { target: { value: '25' } });
    fireEvent.click(screen.getByRole('button', { name: /Buscar Pokémon/i }));

    expect(await screen.findByText('Detalhes do Pokémon')).toBeInTheDocument();

    expect(screen.getByText((_, e) => e.textContent === 'ID: 25')).toBeInTheDocument();
    expect(screen.getByText((_, e) => e.textContent === 'Tipo: pikachu')).toBeInTheDocument();
    expect(screen.getByText((_, e) => e.textContent === 'Treinador: Ash')).toBeInTheDocument();
    expect(screen.getByText((_, e) => e.textContent === 'Nível: 10')).toBeInTheDocument();

    expect(api.get).toHaveBeenCalledTimes(1);
    expect(api.get).toHaveBeenCalledWith('/pokemons/25');
    expect(screen.queryByText(/não encontrado/i)).not.toBeInTheDocument();
  });

  it('deve exibir mensagem de erro se o Pokémon não for encontrado (status 404)', async () => {
    api.get.mockRejectedValueOnce({ response: { status: 404 } });

    render(<BuscarPokemon />);
    fireEvent.change(screen.getByLabelText('Digite o ID do Pokémon:'), { target: { value: '999' } });
    fireEvent.click(screen.getByRole('button', { name: /Buscar Pokémon/i }));

    expect(await screen.findByText('Pokémon com ID 999 não encontrado.')).toBeInTheDocument();
    expect(screen.queryByText('Detalhes do Pokémon')).not.toBeInTheDocument();
    expect(api.get).toHaveBeenCalledWith('/pokemons/999');
  });

  it('deve exibir mensagem de erro genérica em caso de falha da API', async () => {
    api.get.mockRejectedValueOnce({ response: { status: 500, data: { message: 'Erro interno' } } });

    render(<BuscarPokemon />);
    fireEvent.change(screen.getByLabelText('Digite o ID do Pokémon:'), { target: { value: '123' } });
    fireEvent.click(screen.getByRole('button', { name: /Buscar Pokémon/i }));

    expect(await screen.findByText('Erro ao buscar Pokémon. Tente novamente mais tarde.')).toBeInTheDocument();
    expect(api.get).toHaveBeenCalledWith('/pokemons/123');
  });

  it('deve exibir "ELIMINADO" se o nível do Pokémon for 0 ou menor', async () => {
    const mockPokemonEliminado = {
      id: 1,
      tipo: 'charmander',
      treinador: 'Gary',
      nivel: 0,
    };
    api.get.mockResolvedValueOnce({ data: mockPokemonEliminado });

    render(<BuscarPokemon />);
    fireEvent.change(screen.getByLabelText('Digite o ID do Pokémon:'), { target: { value: '1' } });
    fireEvent.click(screen.getByRole('button', { name: /Buscar Pokémon/i }));

    expect(await screen.findByText('ELIMINADO')).toBeInTheDocument();
    expect(screen.getByText((_, e) => e.textContent === 'Nível: 0')).toBeInTheDocument();
  });
});
