it('Deve deletar um Pokémon e redirecionar para /listar', () => {
  cy.request('POST', 'http://localhost:3000/pokemons', {
    tipo: 'pikachu',
    treinador: 'TesteDelete'
  }).then((res) => {
    const id = res.body.id;

    cy.visit(`http://localhost:5173/deletar/${id}`);
    cy.contains('Deletando Pokémon...').should('exist');
    cy.url({ timeout: 6000 }).should('include', '/listar');
    cy.contains(`#${id}`).should('not.exist');
  });
});
