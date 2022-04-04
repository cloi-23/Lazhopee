import faker from '@faker-js/faker'

Cypress.Commands.add('generateOrder', () => {
  const rndOrder = Math.floor(Math.random() * 5) + 1
  const rndArticles = Math.floor(Math.random() * 4) + 1
  cy.writeFile('cypress/fixtures/orders.json', {
    'order':Cypress._.times(rndOrder, () => {
      return {
        '_id': '62469bba9c821fda235d0762',
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

  cy.writeFile('cypress/fixtures/successOrders.json', {
    'orders':Cypress._.times(rndOrder, () => {
      return {
        '_id': '62469bba9c821fda235d0762',
        'date': new Date(),
        'customerId':`62465ca4eac6efdf8c48f957`,
        'status':`Success`,
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
    })
  })
})