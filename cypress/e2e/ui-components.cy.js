/// <reference types="cypress" />

beforeEach('Open test application', () => {
    cy.visit('/')

})

it('input fields', () => {
    cy.contains('Modal & Overlays').click()
    cy.contains('Dialog').click()
    cy.frameLoaded('[data-cy="esc-close-iframe"]')

    cy.iframe('[data-cy="esc-close-iframe"]').contains('Open Dialog with esc close', { timeout: 3000 }).click()
    //cy.iframe('[data-cy="esc-close-iframe"]').contains('Dismiss Dialog').click()
    //cy.get('nb-card-footer > .size-medium').click()
    cy.contains('Dismiss Dialog').click()
})