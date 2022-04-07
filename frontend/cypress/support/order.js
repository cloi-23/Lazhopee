import faker from '@faker-js/faker'
import { order } from '../fixtures/orders.json'
Cypress.Commands.add('generateOrder', () => {
  const rndOrder = Math.floor(Math.random() * 3) + 1
  const rndArticles = Math.floor(Math.random() * 4) + 1
  cy.writeFile('cypress/fixtures/orders.json', {
    'order':Cypress._.times(rndOrder, () => {
      return {
        'date': new Date(),
        'customerId':`62465ca4eac6efdf8c48f957`,
        'status':`Pending`,
        'articles':Cypress._.times(rndArticles, () => {
          return {
            'productName':`${faker.commerce.product()}`,
            'sellingPrice':`${faker.finance.amount(100, 500, 2)}`,
            'quantity':`${faker.finance.amount(2, 5, 0)}`,
          }
        }),
        name: faker.name.firstName(),
        address: faker.address.city()
      }
    }),
  })
})

Cypress.Commands.add('createOrder', () => {
  cy.get('[data-cy="test"]').click({force:true})
for(let h = 0; h < order.length; h++) {
  cy.get('[data-cy="customer"]').clear().type(order[h].customerId);
  for(let i = 0; i < order[h].articles.length; i++){
    cy.get('[data-cy="productId"]').clear().type(order[h].articles[i].productName);
    cy.get(`input[data-cy="sellingPrice"]`).clear().type(order[h].articles[i].sellingPrice);
    cy.get(`input[data-cy="quantity"]`).clear().type(order[h].articles[i].quantity);
    cy.get(`input[data-cy="add"]`).click();
  }
  cy.get(`input[data-cy="send"]`).click();
  }
})

Cypress.Commands.add('removeOrder', () => {
  cy.get('[data-cy="rmvOrd"]').click({force: true})
})

Cypress.Commands.add('removeDeliveries', () => {
  cy.get('[data-cy="rmvDel"]').click({force: true})
})

