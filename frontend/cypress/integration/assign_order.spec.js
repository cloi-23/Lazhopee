describe('Create Order', () => {
    it('create an order',() => {
      cy.login()
      cy.createOrder()
    })
})

describe('Assign to driver', () => {
      it('add test to Shipment-Pending', () => {
      cy.login()
      cy.get('[data-cy="sidebar-shipment"]').click();
      cy.get('[data-cy="sidebar-pending"]').click();
      cy.get('select').eq(0).select('momo')
      cy.get('tbody>tr').eq(0).then(() => cy.get('button').click({multiple: true}))
    })
})

describe('Shipping', () => {
  it('should update the driver', () => {
    cy.login()
    cy.get('[data-cy="sidebar-shipment"]').click();
    cy.get('[data-cy="sidebar-shipping"]').click({force: true});
    cy.get('tbody>tr').should('contain', 'Shipping')
      .and('contain', 'momo')
    cy.get('select').eq(0).select('mimo')
    cy.get('tbody>tr').eq(0).then(() => cy.get('button').click({multiple: true}))
    cy.get('tbody>tr').eq(0).should('contain','mimo')
      .and('not.have.value', 'momo')
  })
})

describe('Remove Order & Deliveries', () => {
  it('delete all created Order and Deliveries',() => {
    cy.login()
    cy.get('[data-cy="test"]').click({force: true})
    cy.removeOrder()
    cy.removeDeliveries()
  })
})