import faker from '@faker-js/faker'
import { store } from '../fixtures/stores.json'
import { product } from '../fixtures/product.json'

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

Cypress.Commands.add('createProduct',() => {
  cy.get('[data-cy="sidebar-product"]').click();
    cy.get('[data-cy="add"]').click()
    cy.get('input[data-cy="file"]').attachFile({
     fileContent: product[0].image,
     fileName: 'file name',
     mimeType: 'image/png'
   })
   cy.get('input[data-cy="name"]').type(product[0].name)
   cy.get('[data-cy="category"]').type(product[0].category)
   cy.get('[data-cy="description"]').type(product[0].description)
   cy.get('select[data-cy="store"]').select(store[0].name)
   cy.get('input[data-cy="sellingPrice"]').type(product[0].sellingPrice)
   cy.get('[data-cy="add"]').click()
   cy.get('[data-cy="sidebar-product"]').click();
   cy.get('tbody>tr').should('contain', product[0].name)
   .and('contain', product[0].category)
   .and('contain', store[0].name)
   .and('contain', product[0].sellingPrice)
})

Cypress.Commands.add('removeProduct',() => {
  cy.get('[data-cy="test"]').click({force:true})
  cy.get('[data-cy="rmvPro"]').click({force: true})
})