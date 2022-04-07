import faker from '@faker-js/faker'
import { expenses } from '../fixtures/expense.json'

Cypress.Commands.add('generateExpense', () => {
  cy.writeFile('cypress/fixtures/expense.json', {
    'expenses':Cypress._.times(1, () => {
     return {
        'date': new Date(),
        'name': faker.commerce.product(),
        'cost': faker.finance.amount(500, 1000, 0),
      }
    })
  })
})

Cypress.Commands.add('createExpense', () => {
  const date = expenses[0].date.slice(0,10);
  const reverseDate = date.replace(/(\d{4})-(\d\d)-(\d\d)/, "$2/$3/$1")
  cy.get('[data-cy="sidebar-expense"]').click();
  cy.get('[data-cy="addE"]').click()
  cy.get('input[data-cy="date"]').click().type(date)
  cy.get('[data-cy="name"]').type(expenses[0].name)
  cy.get('[data-cy="cost"]').type(expenses[0].cost)
  cy.get('button[data-cy="add"]').click()
  cy.get('[data-cy="sidebar-expense"]').click();
  cy.get('tbody>tr').should('contain', expenses[0].name)
    .and('contain', expenses[0].cost)
    .and('contain', reverseDate)
})

Cypress.Commands.add('removeExpense',() => {
  cy.get('[data-cy="rmvExp"]').click({force: true})
})