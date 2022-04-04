import faker from '@faker-js/faker'
// import {store} from '../fixtures/stores.json'
Cypress.Commands.add('generateProduct', () => {
  cy.writeFile('cypress/fixtures/product.json', {
    'product':Cypress._.times(1, () => {
     return {
        'id': faker.datatype.uuid(),
        'name': faker.company.companyName(),
        'storeId': faker.datatype.uuid(),
        'category': faker.commerce.productAdjective(),
        'description': faker.lorem.lines(),
        'image': faker.image.imageUrl(),
        'sellingPrice': faker.finance.amount(50, 100, 0),
      }
    })
  })
})