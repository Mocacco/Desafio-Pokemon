describe('Integração Frontend + Backend - Alterar Treinador', () => {
  it('Deve alterar o treinador de um Pokémon e redirecionar para /listar', () => {
    cy.request('POST', 'http://localhost:3000/pokemons', {
      tipo: 'pikachu',
      treinador: 'TreinadorOriginal'
    }).then((res) => {
      const id = res.body.id;

      cy.visit(`http://localhost:5173/alterar/${id}`);

      cy.contains('Alterar Treinador').should('exist');

      cy.contains('Treinador atual:')
        .parent()
        .should('contain', 'TreinadorOriginal');

      cy.get('input[placeholder="Nome do novo treinador"]')
        .clear()
        .type('NovoTreinador123');

      cy.contains('button', 'Alterar Treinador').click();

      cy.contains('Treinador alterado com sucesso!').should('exist');

      cy.url({ timeout: 3000 }).should('include', '/listar');

      cy.contains('NovoTreinador123').should('exist');
    });
  });
});

