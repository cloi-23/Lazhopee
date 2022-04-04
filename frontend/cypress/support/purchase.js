import faker from '@faker-js/faker'

Cypress.Commands.add('generatePurchase', () => {
  cy.writeFile('cypress/fixtures/purchase.json', {
    'purchase':Cypress._.times(1, () => {
     return {
        'id': faker.datatype.uuid(),
        'date': new Date(),
        'name': faker.commerce.product(),
        'cost': faker.finance.amount(50, 100, 0),
        'quantity': faker.finance.amount(1, 3, 0),
      }
    })
  })
})