
import { order } from '../../fixtures/orders.json'
describe('Create Order', () => {
    it('create an order',() => {
      cy.login()
      cy.createOrder()
    })
})

describe('Pending', () => {
      it('add test to Shipment-Pending', () => {
      cy.login()
      const date = order[0].date.slice(0,10);
      const reverseDate = date.replace(/(\d{4})-(\d\d)-(\d\d)/, "$2/$3/$1")
      cy.get('[data-cy="sidebar-shipment"]').click();
      cy.get('[data-cy="sidebar-pending"]').click();
      // cy.get('tbody>tr').should('contain', reverseDate)
      // .and('contain', 'send')
      // .and('contain', 'Pending')
      // cy.get('[data-cy="view"]').first().click({ force: true })
      // cy.get('[data-cy="back"]').click()
      cy.get('select').eq(0).select('momo')
      cy.get('tbody>tr').eq(0).then(() => cy.get('button').click({multiple: true}))
      // cy.get('select[data-cy="driver"]').first().select('mimi')
      // cy.get('button[data-cy="send"]').first().click()
    })
})

describe('Shipping', () => {
  it('should update the driver', () => {
    cy.login()
    cy.get('[data-cy="sidebar-shipment"]').click();
    cy.get('[data-cy="sidebar-shipping"]').click({force: true});
    cy.get('tbody>tr').should('contain', 'Shipping')
      .and('contain', 'momo')
    cy.get('select').eq(0).select('mimo')
    cy.get('tbody>tr').eq(0).then(() => cy.get('button').click({multiple: true}))
    cy.get('tbody>tr').eq(0).should('contain','mimo')
      .and('not.have.value', 'momo')
    // cy.get('select[data-cy="driver"]').eq(2).select('mimo')
    // cy.get('button[data-cy="update"]').eq(2).click()
  })
})