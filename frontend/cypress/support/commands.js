import faker from '@faker-js/faker'

Cypress.Commands.add('login', () => {
  cy.visit('localhost:4000')
  cy.get('input[type=text]').type('user0')
  cy.get('input[type=password]').type('pass0')
  cy.get('input[type=submit]').as('submitBtn')
    .click()
})

