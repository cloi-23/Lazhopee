
Cypress.Commands.add('login', () => {
  cy.visit('localhost:4000')
  cy.wait(500)
  cy.get('input[type=text]').type('1')
  cy.get('input[type=password]').type('1')
  cy.get('input[type=submit]').as('submitBtn')
    .click()
})


