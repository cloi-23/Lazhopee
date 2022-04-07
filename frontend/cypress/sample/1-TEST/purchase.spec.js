import { purchase } from '../../fixtures/purchase.json'
describe('Purchase', () => {
  it('test add view in Purchase', () => {
    const date = purchase[0].date.slice(0,10);
    const reverseDate = date.replace(/(\d{4})-(\d\d)-(\d\d)/, "$2/$3/$1")
    cy.login()
    cy.get('[data-cy="sidebar-purchase"]').click();
    cy.get('[data-cy="addS"]').click({force: true})
    cy.get('select[data-cy="store"]').select('store1')
    cy.get('input[type="date"]').click().type(date)
    cy.get('input[data-cy="search"]').type('aw')
    cy.get('input[data-cy="quantity"]').type(purchase[0].quantity)
    cy.get('input[data-cy="unitCost"]').type(purchase[0].cost)
    cy.get('button[data-cy="select"]').click()
    cy.get('button[data-cy="add"]').click()
    cy.get('[data-cy="view"]').first().click()
    cy.get('[data-cy="back"]').click()
    cy.get('tbody>tr').should('contain', 'store1')
    .and('contain', reverseDate)
    .and('contain', 'View') 
  })
})