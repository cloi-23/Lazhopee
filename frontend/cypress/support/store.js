import faker from '@faker-js/faker'
import { store } from '../fixtures/stores.json'

Cypress.Commands.add('generateStore', () => {
  cy.writeFile('cypress/fixtures/stores.json', {
    'store':Cypress._.times(1, () => {
     return {
        'id': faker.datatype.uuid(),
        'name': faker.company.companyName(),
        'contact': faker.datatype.number(),
        'address': faker.address.city(),
        'image': faker.image.imageUrl(),
        'date': faker.date.past(1),
      }
    })
  })
})

Cypress.Commands.add('createStore', () => {
  const date = store[0].date.slice(0,10);
  const reverseDate = date.replace(/(\d{4})-(\d\d)-(\d\d)/, "$2/$3/$1")
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

Cypress.Commands.add('removeStore',() => {
  cy.get('[data-cy="test"]').click({force:true})
  cy.get('[data-cy="rmvSto"]').click({force: true})
})