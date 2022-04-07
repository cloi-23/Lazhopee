/// <reference types="cypress" />
import { order } from '../../fixtures/orders.json'
it('visit test-order',() => {
  cy.login()
  cy.get('[data-cy="test"]').click({force:true})
for(let h = 0; h < order.length; h++) {
  cy.get('[data-cy="customer"]').clear().type(order[h].customerId);
  for(let i = 0; i < order[h].articles.length; i++){
    cy.get('[data-cy="productId"]').clear().type(order[h].articles[i].productName);
    cy.get(`input[data-cy="sellingPrice"]`).clear().type(order[h].articles[i].sellingPrice);
    cy.get(`input[data-cy="quantity"]`).clear().type(order[h].articles[i].quantity);
    cy.get(`input[data-cy="add"]`).click();
  }
  cy.get(`input[data-cy="send"]`).click();
  }
})
