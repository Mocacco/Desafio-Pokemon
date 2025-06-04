describe('Integração Frontend + Backend - Criar Pokémon', () => {
  it('Deve criar um novo Pokémon com sucesso e exibir mensagem', () => {
    cy.visit('http://localhost:5173/criar');

    cy.get('select').select('pikachu');
    cy.get('input[placeholder="Nome do treinador"]').type('Ash-' + Date.now());

    cy.contains('button', 'Criar Pokémon').click();

    cy.contains('Pokémon criado com sucesso!', { timeout: 6000 }).should('exist');
  });
});
