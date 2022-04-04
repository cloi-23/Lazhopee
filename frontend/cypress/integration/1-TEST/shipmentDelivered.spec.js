
describe('Delivered Status', () => {
  it('Navigating to Shipment-Delivered route', () => {
    cy.login()
    cy.get('[data-cy="sidebar-shipment"]').click();
    cy.get('[data-cy="sidebar-delivered"]').click({force: true});
    cy.get('table>tr').should('contain', 'Date')
    .and('contain', 'Customer Name')
    .and('contain', 'Customer Address')
    .and('contain', 'Status')
    .and('contain', 'Driver')
})
})