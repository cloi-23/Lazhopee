import { driver }  from '../../fixtures/driver.json'

describe('Driver', () => {
  it('test add view in Driver', () => {
    cy.login()
    cy.get('[data-cy="sidebar-driver"]').click();
    cy.get('[data-cy="view"]').first().click()
    cy.get('[data-cy="back"]').click()
    cy.get('[data-cy="add"]').click()
    cy.get('input[data-cy="file"]').attachFile({
      fileContent: driver[0].photo,
      fileName: 'driver photo',
      mimeType: 'image/png'
    })
    cy.get('input[data-cy="name"]').type(driver[0].username)
    cy.get('[data-cy="address"]').type(driver[0].address)
    cy.get('[data-cy="contact"]').type(driver[0].contact)
    cy.get('[data-cy="device"]').type(driver[0].device)
    cy.get('button[data-cy="add"]').click()
    cy.get('[data-cy="sidebar-driver"]').click();
    cy.get('tbody>tr').should('contain', driver[0].username)
    .and('contain', driver[0].address)
    .and('contain', driver[0].contact)
    .and('contain', 'View')
  })  
})