describe('Create Static Order', () => {
  it('creating day, month and year sale order',() => {
    // const date = new Date().slice(0,10);
    // const reverseDate = date.replace(/(\d{4})-(\d\d)-(\d\d)/, "$2/$3/$1")
    cy.login()
    cy.get('[data-cy="test"]').click({ force: true })
    cy.get('[data-cy="date"]').clear().type('2022-01-02T00:00:00.000+00:00');
    cy.get(`input[data-cy="sellingPrice"]`).clear().type('1000');
    cy.get('[data-cy="productId"]').clear().type('622fde7febbe0200abb090ac');
    cy.createStaticOrder()

    cy.get('[data-cy="date"]').clear().type('2022-01-03T00:00:00.000+00:00');
    cy.get(`input[data-cy="sellingPrice"]`).clear().type('500');
    cy.get('[data-cy="productId"]').clear().type('622fde7febbe0200abb090ac');
    cy.createStaticOrder()

    cy.get('[data-cy="date"]').clear().type('2022-12-02T00:00:00.000+00:00');
    cy.get(`input[data-cy="sellingPrice"]`).clear().type('3000');
    cy.get('[data-cy="productId"]').clear().type('622fde7febbe0200abb090ac');
    cy.createStaticOrder()

    cy.get('[data-cy="date"]').clear().type('2020-01-02T00:00:00.000+00:00');
    cy.get(`input[data-cy="sellingPrice"]`).clear().type('2000');
    cy.get('[data-cy="productId"]').clear().type('622fde7febbe0200abb090ac');
    cy.createStaticOrder()

    cy.get('[data-cy="date"]').clear().type('2020-02-03T00:00:00.000+00:00');
    cy.get(`input[data-cy="sellingPrice"]`).clear().type('100');
    cy.get('[data-cy="productId"]').clear().type('622fde7febbe0200abb090ac');
    cy.createStaticOrder()
  })
})

describe('Line Chart',() => {
  it('test daily - Jan 8 sale', () => {
    cy.login()
    cy.get('[data-cy="dashboard"]').click();
    cy.get('[data-cy="startDate"]').click().type('2022-01-01')
    cy.get('[data-cy="endDate"]').click().type('2022-01-04')
    cy.get('[data-cy="perDay"]').click()
    cy.get('[data-cy="daily"]').should('have.text',1500)
  })

  it('test monthly - Jan to December 2022 sale', () => {
    cy.login()
    cy.get('[data-cy="dashboard"]').click();
    cy.get('[data-cy="startDate"]').click().type('2022-01-01')
    cy.get('[data-cy="endDate"]').click().type('2022-12-20')
    cy.get('[data-cy="perMonth"]').click()
    cy.get('[data-cy="monthly"]').should('have.text',4500)
  })

  it('test yearly - 2020 to 2022 sale', () => {
    cy.login()
    cy.get('[data-cy="dashboard"]').click();
    cy.get('[data-cy="startDate"]').click().type('2020-01-01')
    cy.get('[data-cy="endDate"]').click().type('2022-12-20')
    cy.get('[data-cy="perYear"]').click()
    cy.get('[data-cy="yearly"]').should('have.text',6600)
  })
})


describe('Remove Order & Deliveries', () => {
  it('delete all created Order and Deliveries',() => {
    cy.login()
    cy.get('[data-cy="test"]').click({force: true})
    cy.removeOrder()
  })
})