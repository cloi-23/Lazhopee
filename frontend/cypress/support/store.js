import faker from '@faker-js/faker'

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