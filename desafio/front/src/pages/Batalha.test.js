import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Batalha from './Batalha';
import api from '../services/api';

// Mock da API
jest.mock('../services/api');

describe('Componente Batalha', () => {
  beforeEach(() => {
    // Limpa mocks antes de cada teste
    jest.clearAllMocks();

    // Mock the initial API call in useEffect for every test
    api.get.mockResolvedValue({ data: [] }); // Default mock to avoid console errors if not specifically mocked
  });

  test('deve renderizar inputs e botão', async () => {
    await act(async () => {
      render(<Batalha />);
    });

    expect(screen.getByLabelText(/ID do Pokémon 1/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ID do Pokémon 2/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Iniciar Batalha/i })).toBeInTheDocument();
  });

  test('deve permitir selecionar pokémons e iniciar batalha', async () => {
    // Mock do get pokemons inicial
    api.get.mockResolvedValueOnce({
      data: [
        { id: 1, tipo: 'pikachu', treinador: 'Ash', nivel: 5 },
        { id: 2, tipo: 'bulbasaur', treinador: 'Brock', nivel: 3 }
      ]
    });

    // Mock da chamada post para batalha
    api.post.mockResolvedValueOnce({
      data: {
        vencedor: { id: 1, tipo: 'pikachu', treinador: 'Ash', nivel: 6 },
        perdedor: { id: 2, tipo: 'bulbasaur', treinador: 'Brock', nivel: 2 }
      }
    });

    // Mock do get para atualizar lista após batalha
    api.get.mockResolvedValueOnce({
      data: [
        { id: 1, tipo: 'pikachu', treinador: 'Ash', nivel: 6 },
        { id: 2, tipo: 'bulbasaur', treinador: 'Brock', nivel: 2 }
      ]
    });

    await act(async () => {
      render(<Batalha />);
    });

    // Wait for initial data load to complete before interacting
    await waitFor(() => {
      // You might check for some initial content if it's rendered based on fetched data
      // For this component, it might not render content initially if no pokemons are selected
    });

    // Preencher os inputs com os ids dos pokémons
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/ID do Pokémon 1/i), { target: { value: '1' } });
      fireEvent.change(screen.getByLabelText(/ID do Pokémon 2/i), { target: { value: '2' } });
    });


    // Clicar no botão de batalhar
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Iniciar Batalha/i }));
    });

    // Esperar a exibição do vencedor na tela
    const vencedor = await screen.findByText(/Vencedor/i);
    expect(vencedor).toBeInTheDocument();

    // Assert that the API calls were made as expected
    expect(api.get).toHaveBeenCalledTimes(2); // Initial load + after battle
    expect(api.post).toHaveBeenCalledWith('/batalhar/1/2');
  });

  test('deve exibir erro se pokémons forem iguais', async () => {
    await act(async () => {
      render(<Batalha />);
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/ID do Pokémon 1/i), { target: { value: '1' } });
      fireEvent.change(screen.getByLabelText(/ID do Pokémon 2/i), { target: { value: '1' } });
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Iniciar Batalha/i }));
    });

    expect(await screen.findByText(/Selecione pokémons diferentes!/i)).toBeInTheDocument();
    expect(api.post).not.toHaveBeenCalled();
  });

  test('deve exibir erro se a API falhar na batalha', async () => {
    // Mock for initial load (can be empty data)
    api.get.mockResolvedValueOnce({ data: [] });

    // Mock API post for battle to reject
    api.post.mockRejectedValueOnce({
      response: { data: { erro: 'Erro simulado na API' } } // This is the message your component will display
    });

    await act(async () => {
      render(<Batalha />);
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/ID do Pokémon 1/i), { target: { value: '1' } });
      fireEvent.change(screen.getByLabelText(/ID do Pokémon 2/i), { target: { value: '2' } });
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Iniciar Batalha/i }));
    });

    // CHANGE THIS LINE: Expect the exact message mocked, not the fallback
    const erro = await screen.findByText('Erro simulado na API');
    expect(erro).toBeInTheDocument();
    expect(api.post).toHaveBeenCalledWith('/batalhar/1/2');
  });

  test('deve exibir erro ao carregar pokémons inicialmente', async () => {
    api.get.mockRejectedValueOnce(new Error('Erro de rede')); // Mock initial API call to fail

    await act(async () => {
      render(<Batalha />);
    });

    expect(await screen.findByText('Erro ao carregar pokémons.')).toBeInTheDocument();
    expect(api.get).toHaveBeenCalledWith('/pokemons');
  });
});