describe('Teste de Integração da Busca de Pokémon', () => {
  let pokemonTesteId;

  before(() => {
    cy.request('POST', 'http://localhost:3000/pokemons', {
      tipo: 'pikachu',
      treinador: 'Red'
    }).then((response) => {
      pokemonTesteId = response.body.id;
      cy.log(`Pokémon de teste criado com ID: ${pokemonTesteId}`);
    });
  });

  after(() => {
    cy.request({
      method: 'DELETE',
      url: `http://localhost:3000/pokemons/${pokemonTesteId}`,
      failOnStatusCode: false
    }).then((response) => {
      if (response.status === 404) {
        cy.log(`Pokémon ${pokemonTesteId} não encontrado para deleção (já eliminado ou inexistente).`);
      } else if (response.status === 204) {
        cy.log(`Pokémon ${pokemonTesteId} deletado com sucesso.`);
      }
    });
  });

  it('Deve buscar e exibir um Pokémon existente pelo ID', () => {
    cy.visit('http://localhost:5173/buscar'); 

    cy.contains('h2', '🔍 Buscar Pokémon por ID').should('be.visible');

    cy.get('[data-cy="pokemon-id-input"]').type(pokemonTesteId);

    cy.get('[data-cy="buscar-pokemon-button"]').click();


    cy.get('[data-cy="pokemon-encontrado"]').should('be.visible');
    cy.get('[data-cy="pokemon-encontrado"]').within(() => {
      cy.contains(`ID: ${pokemonTesteId}`).should('be.visible');
      cy.contains('Tipo: pikachu').should('be.visible');
      cy.contains('Treinador: Red').should('be.visible');
      cy.contains('Nível:').should('exist');
    });
  });

  it('Deve exibir uma mensagem de erro para um Pokémon não existente', () => {
    cy.visit('http://localhost:5173/buscar');

    const nonExistentId = 999999;
    cy.get('[data-cy="pokemon-id-input"]').type(nonExistentId);

    cy.get('[data-cy="buscar-pokemon-button"]').click();

    cy.get('[data-cy="erro-mensagem"]')
      .should('be.visible')
      .and('contain', `Pokémon com ID ${nonExistentId} não encontrado.`);

    cy.get('[data-cy="pokemon-encontrado"]').should('not.exist');
  });

  it('Deve mostrar erro ao tentar buscar sem digitar um ID', () => {
    cy.visit('http://localhost:5173/buscar'); 

    cy.get('[data-cy="pokemon-id-input"]').clear();

    cy.get('[data-cy="buscar-pokemon-button"]').click();

    cy.get('[data-cy="erro-mensagem"]')
      .should('be.visible')
      .and('contain', 'Por favor, digite um ID de Pokémon.');

    cy.get('[data-cy="pokemon-encontrado"]').should('not.exist');
  });
});