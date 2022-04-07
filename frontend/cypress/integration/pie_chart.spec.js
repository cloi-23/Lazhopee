 describe('Create Static Order', () => {
    it('creating day & year of product sale',() => {
    cy.login()
    cy.get('[data-cy="test"]').click({ force: true })
    cy.get('[data-cy="date"]').clear().type('2022-01-02T00:00:00.000+00:00');
    cy.get('[data-cy="productId"]').clear().type('622fde75ebbe0200abb090a6');
    cy.get(`input[data-cy="sellingPrice"]`).clear().type('1000');
    cy.createStaticOrder()

    cy.get('[data-cy="date"]').clear().type('2022-01-03T00:00:00.000+00:00');
    cy.get('[data-cy="productId"]').clear().type('622fde7febbe0200abb090ac');
    cy.get(`input[data-cy="sellingPrice"]`).clear().type('1000');
    cy.createStaticOrder()

    cy.get('[data-cy="date"]').clear().type('2022-12-02T00:00:00.000+00:00');
    cy.get('[data-cy="productId"]').clear().type('6231b1c5b411e7c62d72cdda');
    cy.get(`input[data-cy="sellingPrice"]`).clear().type('1000');
    cy.createStaticOrder()

    cy.get('[data-cy="date"]').clear().type('2020-01-02T00:00:00.000+00:00');
    cy.get('[data-cy="productId"]').clear().type('622fde75ebbe0200abb090a6');
    cy.get(`input[data-cy="sellingPrice"]`).clear().type('1000');
    cy.createStaticOrder()

    cy.get('[data-cy="date"]').clear().type('2020-02-03T00:00:00.000+00:00');
    cy.get('[data-cy="productId"]').clear().type('622fde75ebbe0200abb090a6');
    cy.get(`input[data-cy="sellingPrice"]`).clear().type('1000');
    cy.createStaticOrder()
  })
})

describe('Pie Chart',() => {
  it('test Jan 1 to Jan 4 product sold', () => {
    cy.login()
    cy.get('[data-cy="dashboard"]').click();
    cy.get('[data-cy="startDate"]').click().type('2022-01-01')
    cy.get('[data-cy="endDate"]').click().type('2022-01-04')
    cy.get('[data-cy="send"]').click()
    cy.get('[data-cy="data"]').should('have.text','[\n  "bag quantity 1",\n  "shoes quantity 1",\n  "hat quantity 1"\n]')
  })

  it('test year 2020 to 2022 product sold', () => {
    cy.login()
    cy.get('[data-cy="dashboard"]').click();
    cy.get('[data-cy="start"]').click().type('2020-01-01')
    cy.get('[data-cy="end"]').click().type('2022-12-20')
    cy.get('[data-cy="send"]').click()
    cy.get('[data-cy="data"]').should('have.text','[\n  "bag quantity 3",\n  "shoes quantity 1",\n  "hat quantity 1"\n]')
  })
})

describe('Remove Order & Deliveries', () => {
  it('delete all created Order and Deliveries',() => {
    cy.login()
    cy.get('[data-cy="test"]').click({force: true})
    cy.removeOrder()
  })
})