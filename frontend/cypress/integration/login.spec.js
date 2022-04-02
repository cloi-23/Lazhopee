/// <reference types="cypress" />

it('Should Login ',() => {
  cy.visit('localhost:4000')
  cy.get('input[type=text]').type('user0')
  cy.get('input[type=password]').type('pass0')
  cy.get('input[type=submit]').as('submitBtn')
    .click()
  cy.get('h1').should('contain','DashBoard')
})