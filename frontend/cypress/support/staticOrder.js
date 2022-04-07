Cypress.Commands.add('createStaticOrder',() => {
  cy.get('[data-cy="status"]').clear().type('Success');
  cy.get('[data-cy="customer"]').clear().type('62465ca4eac6efdf8c48f957');
  cy.get(`input[data-cy="quantity"]`).clear().type(1);
  cy.get(`input[data-cy="add"]`).click();
  cy.get(`input[data-cy="send"]`).click();
})