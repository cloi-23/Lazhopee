/// <reference types="cypress" />

context('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000')
  })

  it('cy.visit() - visit the login page',() => {
    cy.visit('http://localhost:4000')
  })
    
  it('cy.contains() - Contains Login form',() => {
    cy.contains('Login')
    cy.get('form').within(() => {
      cy.get('div')
        .should('have.class','txt_field')
    })
  })

  it('cy.get() - Fill up the form', () => {

    cy.get('input[type=text]').type('user2')
    cy.get('input[type=password]').type('user2')

    cy.get('input[type=submit]').as('submitBtn')
      .click()
     cy.url().should('include', '/dashboard')
     cy.get('h1').should('contain', 'DashBoard')
  })
})

