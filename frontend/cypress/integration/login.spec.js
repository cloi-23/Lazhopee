/// <reference types="cypress" />

function addDropdown(loggedIn) {
  if (loggedIn) {
    cy.get("[data-cy='sidebar-store']").should("be.visible");
    cy.url().should('include', '/dashboard')
    cy.get('h1').should('contain', 'DashBoard')
  } else {
    cy.get('span').should('be.visible')
  }
 }

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

   const user = cy.get('input[type=text]').type('user2s')
   const pw = cy.get('input[type=password]').type('pass2')

    cy.get('input[type=submit]').as('submitBtn')
        let res = user == 'user2' && pw == 'pass2' ? true : false
        addDropdown(res)

  })
})