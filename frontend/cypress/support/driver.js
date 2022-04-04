import faker from '@faker-js/faker'

Cypress.Commands.add('generateDriver', () => {
  cy.writeFile('cypress/fixtures/driver.json', {
    'driver':Cypress._.times(1, () => {
     return {
        'id': faker.datatype.uuid(),
        'contact': faker.datatype.number(),
        'address': faker.address.city(),
        'username': faker.name.firstName(),
        'password': faker.datatype.hexaDecimal(),
        'device': faker.name.suffix(),
        'photo': faker.image.imageUrl()
      }
    })
  })
})