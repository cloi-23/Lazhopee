
describe('Income Statement', () => {
  it('Should be same to expecting value', () => {
    cy.login()
    cy.get('[data-cy="sidebar-incomeStatement"]').click();
    cy.get('button[data-cy="send"]').click()
    cy.get('[data-cy="startDate"]').type('2022-03-31')
    cy.get('[data-cy="endDate"]').type('2022-04-02')
    cy.get('button[data-cy="send"]').click()
    cy.get('[data-cy="TRvalue"]').should('be.visible')
    cy.get('[data-cy="NIvalue"]').should('be.visible')
  })
})