
describe('Shipping', () => {
  it('should update the driver', () => {
    cy.login()
    cy.get('[data-cy="sidebar-shipment"]').click();
    cy.get('[data-cy="sidebar-shipping"]').click({force: true});
    cy.get('select').eq(0).select('mimo')
    cy.get('tbody>tr').eq(0).then(() => cy.get('button').click({multiple: true}))
    cy.get('tbody>tr').eq(0).should('contain','mimo')
      .and('contain','Shipping')
      .and('contain','update')
    // cy.get('select[data-cy="driver"]').eq(2).select('mimo')
    // cy.get('button[data-cy="update"]').eq(2).click()
  })
})