describe('Income Statement', () => {
  it('Should be same to expecting value', () => {
    cy.login()
    cy.get('[data-cy="sidebar-incomeStatement"]').click();
    cy.get('[data-cy="endDate"]').type('2022-05-02')
    cy.get('[data-cy="startDate"]').click().type('2022-01-01')
    cy.get('button[data-cy="send"]').click()
    cy.get('[data-cy="totalRev"]').invoke('text').then((e) => console.log(e))
    cy.get('[data-cy="totalExp"]').invoke('text').then((e) => console.log(e))
    let net = null
    cy.get('[data-cy="netShould"]').invoke('text').then((e) => net = e)
    cy.get('[data-cy="net"]').invoke('text').then((e) => {
      expect(e).to.eq(net)
    })
    // cy.get('[data-cy="NIvalue"]').should('be.visible')
  })
})