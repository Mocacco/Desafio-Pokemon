describe('Integração Frontend + Backend - Listar Pokémons', () => {
  it('Deve exibir a lista de Pokémons cadastrados', () => {
    cy.visit('http://localhost:5173/listar');
    cy.get('.pokemon-card') 
      .should('have.length.greaterThan', 0);
  });
});
