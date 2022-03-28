/// <reference types="cypress" />

context('Navigation', () => {
    it('Should Login First',() => {
      cy.visit('localhost:4000')
      cy.get('input[type=text]').type('user2')
      cy.get('input[type=password]').type('user2')
  
      cy.get('input[type=submit]').as('submitBtn')
        .click()
    })

    it('Navigating to Store route', () => {
       cy.get('[data-cy="sidebar-store"]').click();
       cy.get('table').contains('th', '#')
    })

    it('Navigating to Product route and select one product', () => {
      cy.get('[data-cy="sidebar-product"]').click();
      cy.get('[data-cy="view"]').first().click()
    })

    it('Navigating to Purchase route', () => {
      cy.get('[data-cy="sidebar-purchase"]').click();
      cy.get('[data-cy="view"]').first().click()

    })

    it('Navigating to Customer route', () => {
      cy.get('[data-cy="sidebar-customer"]').click();
    })

    it('Navigating to Customer route', () => {
      cy.get('[data-cy="sidebar-customer"]').click();
    })

    it('Navigating to Driver route', () => {
      cy.get('[data-cy="sidebar-driver"]').click();
      cy.get('[data-cy="view"]').first().click()
    })

    it('Navigating to Expense route', () => {
      cy.get('[data-cy="sidebar-expense"]').click();
    })

    it('Navigating to Income Statement route', () => {
      cy.get('[data-cy="sidebar-incomeStatement"]').click();
    })

    it('Navigating to Shipment-Pending route', () => {
      cy.get('[data-cy="sidebar-shipment"]').click();
      cy.get('[data-cy="sidebar-pending"]').click();
    })

    it('Navigating to Shipment-Shipping route', () => {
      cy.get('[data-cy="sidebar-shipment"]').click();
      cy.get('[data-cy="sidebar-shipping"]').click({force: true});
    })

    it('Navigating to Shipment-Delivered route', () => {
      cy.get('[data-cy="sidebar-shipment"]').click();
      cy.get('[data-cy="sidebar-delivered"]').click({force: true});
    })   
  })

  // it('cy.go() - go back or forward in the browser\'s history', () => {
  //   // https://on.cypress.io/go

  //   cy.location('pathname').should('include', 'navigation')

  //   cy.go('back')
  //   cy.location('pathname').should('not.include', 'navigation')

  //   cy.go('forward')
  //   cy.location('pathname').should('include', 'navigation')

  //   // clicking back
  //   cy.go(-1)
  //   cy.location('pathname').should('not.include', 'navigation')

  //   // clicking forward
  //   cy.go(1)
  //   cy.location('pathname').should('include', 'navigation')
  // })

  // it('cy.reload() - reload the page', () => {
  //   // https://on.cypress.io/reload
  //   cy.reload()

  //   // reload the page without using the cache
  //   cy.reload(true)
  // })

  // it('cy.visit() - visit a remote url', () => {
  //   // https://on.cypress.io/visit

  //   // Visit any sub-domain of your current domain

  //   // Pass options to the visit
  //   cy.visit('https://example.cypress.io/commands/navigation', {
  //     timeout: 50000, // increase total time for the visit to resolve
  //     onBeforeLoad (contentWindow) {
  //       // contentWindow is the remote page's window object
  //       expect(typeof contentWindow === 'object').to.be.true
  //     },
  //     onLoad (contentWindow) {
  //       // contentWindow is the remote page's window object
  //       expect(typeof contentWindow === 'object').to.be.true
  //     },
  //   })
  //   })
