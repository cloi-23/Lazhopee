import { product } from '../../fixtures/product.json'
describe('Product', () => {
  it('test add view in Product', () => {
    cy.login()
    cy.get('[data-cy="sidebar-product"]').click();
    cy.get('[data-cy="view"]').first().click()
    cy.get('[data-cy="back"]').click()
    cy.get('[data-cy="add"]').click()
    cy.get('input[data-cy="file"]').attachFile({
     fileContent: product[0].image,
     fileName: 'file name',
     mimeType: 'image/png'
   })
   cy.get('input[data-cy="name"]').type(product[0].name)
   cy.get('[data-cy="category"]').type(product[0].category)
   cy.get('[data-cy="description"]').type(product[0].description)
   cy.get('select[data-cy="store"]').select('store1')
   cy.get('input[data-cy="sellingPrice"]').type(product[0].sellingPrice)
   cy.get('[data-cy="add"]').click()
   cy.get('[data-cy="sidebar-product"]').click();
   cy.get('tbody>tr').should('contain', product[0].name)
   .and('contain', product[0].category)
   .and('contain', 'store1')
   .and('contain', product[0].sellingPrice)
  })
})