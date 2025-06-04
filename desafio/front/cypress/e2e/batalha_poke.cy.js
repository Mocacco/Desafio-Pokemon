describe('Teste de Integração da Batalha Pokémon', () => {
  let pokemonAId, pokemonBId;

  before(() => {
    cy.request('POST', 'http://localhost:3000/pokemons', {
      tipo: 'pikachu',
      treinador: 'Ash'
    }).then((response) => {
      pokemonAId = response.body.id;
    });

    cy.request('POST', 'http://localhost:3000/pokemons', {
      tipo: 'charizard',
      treinador: 'Brock'
    }).then((response) => {
      pokemonBId = response.body.id;
    });
  });

  after(() => {
    cy.request({
      method: 'DELETE',
      url: `http://localhost:3000/pokemons/${pokemonAId}`,
      failOnStatusCode: false
    }).then((response) => {
      if (response.status === 404) {
        cy.log(`Pokémon ${pokemonAId} already not found (likely eliminated).`);
      }
    });

    cy.request({
      method: 'DELETE',
      url: `http://localhost:3000/pokemons/${pokemonBId}`,
      failOnStatusCode: false
    }).then((response) => {
      if (response.status === 404) {
        cy.log(`Pokémon ${pokemonBId} already not found (likely eliminated).`);
      }
    });
  });

  it('Deve realizar uma batalha entre dois pokémons', () => {
    cy.visit('http://localhost:5173/batalha');

    cy.contains('h2', '⚔️ Batalha Pokémon').should('be.visible');

    cy.get('input').first().type(pokemonAId);
    cy.get('input').last().type(pokemonBId);

    cy.contains('button', 'Iniciar Batalha').click();

    cy.contains('Pokémon 1').should('be.visible');
    cy.contains('Pokémon 2').should('be.visible');

    cy.contains('Vencedor', { timeout: 10000 }).should('be.visible');

    cy.get('.vencedor').within(() => {
      cy.contains('Nível:').should('exist');
    });
  });

  it('Deve mostrar erro ao tentar batalhar com o mesmo pokémon', () => {
    cy.visit('http://localhost:5173/batalha');

    cy.get('input').first().type(pokemonAId);
    cy.get('input').last().type(pokemonAId); 

    cy.contains('button', 'Iniciar Batalha').click();

    cy.contains('Selecione pokémons diferentes!').should('be.visible');
  });
});