// describe('Generate Expense', () => {
//   it('Create random data',() => {
//   cy.generateExpense()

//   })
// })
describe('Create Order', () => {
  it('create an order',() => {
    cy.login()
    cy.get('[data-cy="test"]').click({ force: true })
    cy.get('[data-cy="customer"]').clear().type('62465ca4eac6efdf8c48f957');
    cy.get('[data-cy="productId"]').clear().type('622fde7febbe0200abb090ac');
    cy.get(`input[data-cy="sellingPrice"]`).clear().type('2000');
    cy.get(`input[data-cy="quantity"]`).clear().type(1);
    cy.get(`input[data-cy="add"]`).click();
    cy.get(`input[data-cy="send"]`).click();
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

describe('Add Expense', () => {
  it('Create Expense', () => {
    cy.login()
    cy.createExpense()
  })
})

describe('Update Delivery Status', () => {
  it('visit test-delivered',() => {
    cy.login()
    cy.get('[data-cy="test"]').click({force:true})
    cy.get(`[data-cy="sendStatus"]`).click({multiple: true})
    cy.get('tbody>tr').should('contain', 'Success')
  })
})

describe('Income Statement', () => {
  it('Should be same to expecting value', () => {
    cy.login()
    cy.get('[data-cy="sidebar-incomeStatement"]').click();
    cy.get('[data-cy="startDate"]').type('2022-01-01')
    cy.get('[data-cy="endDate"]').type('2022-12-30')
    cy.get('button[data-cy="send"]').click()
    cy.get('[data-cy="totalRev"]').invoke('text').then((e) => console.log(e))
    cy.get('[data-cy="totalExp"]').invoke('text').then((e) => console.log(e))
    let net = null
    cy.get('[data-cy="netShould"]').invoke('text').then((e) => net = e)
    cy.get('[data-cy="net"]').invoke('text').then((e) => {
      expect(e).to.eq(net)
    })
  })
})

describe('Remove Order,Expense & Deliveries', () => {
  it('delete all',() => {
    cy.login()
    cy.get('[data-cy="test"]').click({force: true})
    cy.removeExpense()
    cy.removeOrder()
    cy.removeDeliveries()
  })
})