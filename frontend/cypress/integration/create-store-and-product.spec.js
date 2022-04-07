// describe('Generate Fixture', () => {
//   it('Create new', () => {
//     cy.generateProduct()
//    cy.generateStore()
//   })
// })

describe('Create Store', () => {
  it('test add view in Store', () => {
  cy.login()
  cy.createStore()
 })
})

describe('Create Product', () => {
  it('test add and view in Product', () => {
    cy.login()
    cy.createProduct()
  })
})

describe('Remove Store & Product', () => {
  it('delete all created store and product', () => {
    cy.login()
    cy.removeStore()
    cy.removeProduct()
  })
})
