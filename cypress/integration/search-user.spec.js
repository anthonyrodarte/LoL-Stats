/* globals describe, cy, it */

describe('Search for user', function () {
  it('finds the user and shows the stats.', function () {
    cy.visit('http://localhost:3000')
    cy.get('input')
      .click()
      .type('obesegoldfish')

    cy.get('button').click()
  })
})
