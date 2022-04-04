import { store } from '../../fixtures/stores.json'
describe('Store', () => {
  it('test add view in Store', () => {
    const date = store[0].date.slice(0,10);
    const reverseDate = date.replace(/(\d{4})-(\d\d)-(\d\d)/, "$2/$3/$1")
    cy.login()
    cy.get('[data-cy="sidebar-store"]').click();
    cy.get('table').contains('th', '#')
    cy.get('[data-cy="add"]').click()
    cy.get('input[data-cy="file"]').attachFile({
     fileContent: store[0].image,
     fileName: '1647423803294.png',
     mimeType: 'image/png'
   })
   cy.get('input[data-cy="name"]').type(store[0].name)
   cy.get('[data-cy="textarea"]').type(store[0].address)
   cy.get('input[data-cy="contact"]').type(store[0].contact)
   cy.get('[data-cy="add"]').click()
   cy.get('[data-cy="sidebar-store"]').click();
   cy.get('tbody>tr').should('contain', store[0].name)
     .and('contain', store[0].address)
     .and('contain', store[0].contact)
 })
})