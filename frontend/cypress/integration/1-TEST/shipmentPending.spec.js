
import { order } from '../../fixtures/orders.json'
describe('Pending', () => {
      it('add test to Shipment-Pending', () => {
      const date = order[0].date.slice(0,10);
      const reverseDate = date.replace(/(\d{4})-(\d\d)-(\d\d)/, "$2/$3/$1")
      cy.login()
      cy.get('[data-cy="sidebar-shipment"]').click();
      cy.get('[data-cy="sidebar-pending"]').click();
      cy.get('[data-cy="view"]').first().click({ force: true })
      cy.get('[data-cy="back"]').click()
      cy.get('select').eq(0).select('mimi')
      cy.get('tbody>tr').eq(0).then(() => cy.get('button').click({multiple: true}))
      // cy.get('select[data-cy="driver"]').first().select('mimi')
      // cy.get('button[data-cy="send"]').first().click()
      cy.get('tbody>tr').should('contain', reverseDate)
      .and('contain', order[0].name)
      .and('contain', order[0].address)
    })
})