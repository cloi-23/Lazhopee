describe('Customer',() => {
  it('Navigating to Customer route', () => {
    cy.login()
    cy.get('[data-cy="sidebar-customer"]').click();
    cy.get('thead>tr').should('contain', '#')
      .and('contain', 'Name')
      .and('contain', 'Address')
      .and('contain', 'Contact')
  })
})