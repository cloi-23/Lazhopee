import faker from '@faker-js/faker'

Cypress.Commands.add('generateExpense', () => {
  cy.writeFile('cypress/fixtures/expense.json', {
    'expenses':Cypress._.times(1, () => {
     return {
        'id': faker.datatype.uuid(),
        'date': new Date(),
        'name': faker.commerce.product(),
        'cost': faker.finance.amount(50, 100, 0),
      }
    })
  })
})