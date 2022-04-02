/// <reference types="cypress" />

context('Input & Output Test', () => {
    it('Should Login ',() => {
      cy.visit('localhost:4000')
      cy.get('input[type=text]').type('user0')
      cy.get('input[type=password]').type('pass0')
      cy.get('input[type=submit]').as('submitBtn')
        .click()
      cy.get('h1').should('contain','DashBoard')
    })

    it('test Line Chart', () => {
      cy.get('[data-cy="dashboard"]').click();
      cy.get('[data-cy="startDate"]').click()/* .type('2022-03-31') */
      cy.get('[data-cy="endDate"]').click()/* .type('2022-04-01') */
      cy.get('[data-cy="perDay"]').click()
      cy.get('[data-cy="line"]').should('be.visible')
    })

    it('test Pie Chart', () => {
      cy.get('[data-cy="dashboard"]').click();
      cy.get('[data-cy="start"]').click().type('2022-03-31')
      cy.get('[data-cy="end"]').click().type('2022-04-01')
      cy.get('[data-cy="send"]').click()
      cy.get('[data-cy="pie"]').should('be.visible')
    })

    it('test Store', () => {
       cy.get('[data-cy="sidebar-store"]').click();
       cy.get('table').contains('th', '#')
       cy.get('[data-cy="add"]').click()
       cy.get('input[data-cy="file"]').attachFile({
        fileContent: 'dawdawdaw',
        fileName: '1647423803294.png',
        mimeType: 'image/png'
      })
      cy.get('input[data-cy="name"]').type('Name')
      cy.get('[data-cy="textarea"]').type('Address')
      cy.get('input[data-cy="contact"]').type('56789845')
      cy.get('[data-cy="add"]').click()
      cy.get('[data-cy="sidebar-store"]').click();
      cy.get('tbody>tr').should('contain', 'Name')
        .and('contain', 'Address')
        .and('contain', '56789845')
    })

    it('test Product', () => {
      cy.get('[data-cy="sidebar-product"]').click();
      cy.get('[data-cy="view"]').first().click()
      cy.get('[data-cy="back"]').click()
      cy.get('[data-cy="add"]').click()
      cy.get('input[data-cy="file"]').attachFile({
       fileContent: 'dawdawdaw',
       fileName: '1647240258950.png',
       mimeType: 'image/png'
     })
     cy.get('input[data-cy="name"]').type('Name')
     cy.get('[data-cy="category"]').type('category')
     cy.get('[data-cy="description"]').type('description')
     cy.get('select[data-cy="store"]').select('store1')
     cy.get('input[data-cy="sellingPrice"]').type(30)
     cy.get('[data-cy="add"]').click()
     cy.get('[data-cy="sidebar-product"]').click();
     cy.get('tbody>tr').should('contain', 'Name')
     .and('contain', 'category')
     .and('contain', 'store1')
     .and('contain', 30)


    })

    it('test Purchase', () => {
      cy.get('[data-cy="sidebar-purchase"]').click();
      cy.get('[data-cy="addS"]').click({force: true})
      cy.get('select[data-cy="store"]').select('store1')
      cy.get('input[type="date"]').click().type('2022-04-01')
      cy.get('input[data-cy="search"]').type('aw')
      cy.get('input[data-cy="quantity"]').type(1)
      cy.get('input[data-cy="unitCost"]').type(100)
      cy.get('button[data-cy="select"]').click()
      cy.get('button[data-cy="add"]').click()
      cy.get('[data-cy="view"]').first().click()
      cy.get('[data-cy="back"]').click()
      cy.get('tbody>tr').should('contain', 'store1')
      .and('contain', '04/01/2022')
      .and('contain', 'View')
      
    })

    it('Navigating to Customer route', () => {
      cy.get('[data-cy="sidebar-customer"]').click();
      cy.get('thead>tr').should('contain', '#')
        .and('contain', 'Name')
        .and('contain', 'Address')
        .and('contain', 'Contact')
    })

    it('test Driver', () => {
      cy.get('[data-cy="sidebar-driver"]').click();
      cy.get('[data-cy="view"]').first().click()
      cy.get('[data-cy="back"]').click()
      cy.get('[data-cy="add"]').click()
      cy.get('input[data-cy="file"]').attachFile({
        fileContent: '1647240258950',
        fileName: '1647240258950',
        mimeType: 'image/png'
      })
      cy.get('input[data-cy="name"]').type('fullname')
      cy.get('[data-cy="address"]').type('address')
      cy.get('[data-cy="contact"]').type('14642')
      cy.get('[data-cy="device"]').type('device')
      cy.get('button[data-cy="add"]').click()
      cy.get('[data-cy="sidebar-driver"]').click();
      cy.get('tbody>tr').should('contain', 'fullname')
      .and('contain', 'address')
      .and('contain', '14642')
      .and('contain', 'View')

    })  

    it('test Expense', () => {
      cy.get('[data-cy="sidebar-expense"]').click();
      cy.get('[data-cy="addE"]').click()
      cy.get('input[data-cy="date"]').click().type('2022-04-01')
      cy.get('[data-cy="name"]').type('item name')
      cy.get('[data-cy="cost"]').type(100)
      cy.get('button[data-cy="add"]').click()
      cy.get('[data-cy="sidebar-expense"]').click();
      cy.get('tbody>tr').should('contain', 'item name')
        .and('contain', 100)
        .and('contain', '04/01/2022')
    })

    it('Navigating to Income Statement route', () => {
      cy.get('[data-cy="sidebar-incomeStatement"]').click();
      cy.get('button[data-cy="send"]').click()
      cy.get('[data-cy="TRzero"]').should('be.visible')
      cy.get('[data-cy="NIzero"]').should('be.visible')
      cy.get('[data-cy="startDate"]').type('2022-03-31')
      cy.get('[data-cy="endDate"]').type('2022-04-02')
      cy.get('button[data-cy="send"]').click()
      cy.get('[data-cy="TRvalue"]').should('be.visible')
      cy.get('[data-cy="NIvalue"]').should('be.visible')
    })

    // it('add test to Shipment-Pending', () => {
    //   cy.get('[data-cy="sidebar-shipment"]').click();
    //   cy.get('[data-cy="sidebar-pending"]').click();
    //   cy.get('[data-cy="view"]').first().click({ force: true })
    //   cy.get('[data-cy="back"]').click()
    //   // cy.get('select').eq(4).select('mimi')
    //   // cy.get('tbody>tr').eq(1).then(() => cy.get('button').first().click())
    //   // cy.get('select[data-cy="driver"]').first().select('mimi')
    //   // cy.get('button[data-cy="send"]').first().click()
    // })

    it('test Shipment-Shipping', () => {
      cy.get('[data-cy="sidebar-shipment"]').click();
      cy.get('[data-cy="sidebar-shipping"]').click({force: true});
      cy.get('select').eq(1).select('mimo')
      cy.get('tbody>tr').eq(1).then(() => cy.get('button').first().click())
      cy.get('tbody>tr').eq(1).contains('mimo')
      // cy.get('select[data-cy="driver"]').eq(2).select('mimo')
      // cy.get('button[data-cy="update"]').eq(2).click()

    })

    it('Navigating to Shipment-Delivered route', () => {
      cy.get('[data-cy="sidebar-shipment"]').click();
      cy.get('[data-cy="sidebar-delivered"]').click({force: true});
      cy.get('table>tr').should('contain', 'Date')
      .and('contain', 'Customer Name')
      .and('contain', 'Customer Address')
      .and('contain', 'Status')
      .and('contain', 'Driver')
  })
}) 



  //   cy.go('forward')
  //   cy.location('pathname').should('include', 'navigation')

  //   // clicking back
  //   cy.go(-1)
  //   cy.location('pathname').should('not.include', 'navigation')

  //    expect(typeof contentWindow === 'object').to.be.true

