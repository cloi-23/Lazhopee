
describe('Delivered Status', () => {
  it('visit test-delivered',() => {
    cy.login()
    cy.get('[data-cy="test"]').click({force:true})
    cy.get(`[data-cy="sendStatus"]`).click({multiple: true})
  })
  it('Navigating to Shipment-Delivered route', () => {
    cy.login()
    cy.get('[data-cy="sidebar-shipment"]').click();
    cy.get('[data-cy="sidebar-delivered"]').click({force: true});
    cy.get('tbody>tr').should('contain', 'Success')
})
})