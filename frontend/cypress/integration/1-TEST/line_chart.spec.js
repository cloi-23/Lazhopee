describe('Line Chart',() => {
  before(() => {
    cy.login()
  })
  it('test Line Chart daily sales in 03/31/2022 to 05/05/2022', () => {
    cy.get('[data-cy="dashboard"]').click();
    cy.get('[data-cy="startDate"]').click().type('2022-03-31')
    cy.get('[data-cy="endDate"]').click().type('2022-05-05')
    cy.get('[data-cy="perDay"]').click()
    cy.get('[data-cy="daily"]').should('have.text',4696)
  })
  it('test Line Chart monthly sales in 03/31/2022 to 04/01/2022', () => {
    cy.get('[data-cy="startDate"]').click().type('2022-03-31')
    cy.get('[data-cy="endDate"]').click().type('2022-04-01')
    cy.get('[data-cy="perMonth"]').click()
    cy.get('[data-cy="monthly"]').should('have.text',560)
  })
  it('test Line Chart sales in Last Year Only', () => {
    cy.get('[data-cy="startDate"]').click().type('2021-03-01')
    cy.get('[data-cy="endDate"]').click().type('2021-12-30')
    cy.get('[data-cy="perYear"]').click()
    cy.get('[data-cy="yearly"]').should('have.text',32)
    cy.get('[data-cy="line"]').should('be.visible')
  })
  it('test Line Chart sales in Last Year 03/31/2021 to 05/05/2022', () => {
    cy.get('[data-cy="startDate"]').click().type('2021-03-31')
    cy.get('[data-cy="endDate"]').click().type('2022-05-05')
    cy.get('[data-cy="perYear"]').click()
    cy.get('[data-cy="yearly"]').should('have.text',31296)
  })
})