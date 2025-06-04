import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import AlterarTreinador from "./AlterarTreinador";
import api from "../services/api";

// Mock do navigate do react-router-dom
const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    ...originalModule,
    useNavigate: () => mockedNavigate,
  };
});

describe("AlterarTreinador", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("exibe loading inicialmente e carrega o Pokémon", async () => {
    api.get = jest.fn().mockResolvedValueOnce({
      data: { id: "1", tipo: "pikachu", treinador: "Ash" },
    });

    render(
      <MemoryRouter initialEntries={["/alterar/1"]}>
        <Routes>
          <Route path="/alterar/:id" element={<AlterarTreinador />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/carregando.../i)).toBeInTheDocument();

    // Espera o carregamento do Pokémon
    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith("/pokemons/1");
      expect(screen.getByText(/Pokémon:/i)).toBeInTheDocument();
      expect(screen.getByDisplayValue("Ash")).toBeInTheDocument();
    });
  });

  test("exibe erro se não encontrar Pokémon", async () => {
    api.get = jest.fn().mockRejectedValueOnce({
      response: { data: { error: "Pokémon não encontrado" } },
    });

    render(
      <MemoryRouter initialEntries={["/alterar/999"]}>
        <Routes>
          <Route path="/alterar/:id" element={<AlterarTreinador />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/pokémon não encontrado/i)).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /voltar para a lista/i })).toBeInTheDocument();
    });
  });

  test("altera treinador com sucesso e redireciona", async () => {
    jest.useFakeTimers();

    api.get = jest.fn().mockResolvedValueOnce({
      data: { id: "2", tipo: "bulbasaur", treinador: "Brock" },
    });
    api.put = jest.fn().mockResolvedValueOnce();

    render(
      <MemoryRouter initialEntries={["/alterar/2"]}>
        <Routes>
          <Route path="/alterar/:id" element={<AlterarTreinador />} />
        </Routes>
      </MemoryRouter>
    );

    // Espera carregar
    await waitFor(() => {
      expect(screen.getByDisplayValue("Brock")).toBeInTheDocument();
    });

    // Muda o valor do input
    fireEvent.change(screen.getByPlaceholderText(/nome do novo treinador/i), {
      target: { value: "Misty" },
    });

    fireEvent.click(screen.getByRole("button", { name: /alterar treinador/i }));

    await waitFor(() => {
      expect(api.put).toHaveBeenCalledWith("/pokemons/2", { treinador: "Misty" });
      expect(screen.getByText(/treinador alterado com sucesso/i)).toBeInTheDocument();
    });

    // Avança o timer para ativar o setTimeout
    jest.advanceTimersByTime(2000);

    expect(mockedNavigate).toHaveBeenCalledWith("/listar");

    jest.useRealTimers();
  });

  test("exibe erro ao tentar alterar treinador", async () => {
    api.get = jest.fn().mockResolvedValueOnce({
      data: { id: "3", tipo: "charmander", treinador: "Gary" },
    });
    api.put = jest.fn().mockRejectedValueOnce(new Error("Erro"));

    render(
      <MemoryRouter initialEntries={["/alterar/3"]}>
        <Routes>
          <Route path="/alterar/:id" element={<AlterarTreinador />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue("Gary")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText(/nome do novo treinador/i), {
      target: { value: "Jessie" },
    });

    fireEvent.click(screen.getByRole("button", { name: /alterar treinador/i }));

    await waitFor(() => {
      expect(screen.getByText(/erro ao atualizar treinador/i)).toBeInTheDocument();
    });
  });
});
