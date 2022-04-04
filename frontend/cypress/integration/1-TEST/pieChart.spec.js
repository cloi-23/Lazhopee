
describe('Pie Chart', () => {
  it('testing', () => {
    cy.login()
    cy.get('[data-cy="dashboard"]').click();
    cy.get('[data-cy="start"]').click().type('2022-03-31')
    cy.get('[data-cy="end"]').click().type('2022-04-01')
    cy.get('[data-cy="send"]').click()
    cy.get('[data-cy="pie"]').should('be.visible')
  })
})