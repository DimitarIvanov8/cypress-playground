///<reference types="cypress" />
///<reference types="cypress-iframe" />

it.only('Test1', () => {

    //Navigate to website
    cy.visit('https://games.evolution.com/slots/')

    //Accept cookies
    cy.get('.optin > .cmplz-buttons > .cmplz-accept', { timeout: 5000 }).click()

    //Confirm Age
    cy.contains('[class="enter"]', 'Yes, I am 18+', { timeout: 5000 }).click()

    //open Bounty Raid game
    cy.get('a[href*="bounty-raid"]', { timeout: 5000 }).click()

    //Start game
    cy.get('#start-game').click()

    //Get Frame
    cy.frameLoaded('iframe[src*="showcase.evo-games.com/entry"]', { timeout: 15000 })

    //Click Play button
    // top document (games.evolution.com/slots/bounty-raid/)
    //  └─ iframe #1 — showcase.evo-games.com/entry?params=...
    //      └─ iframe #2 — showcase.evo-games.com/frontend/evo/r2/#demo...
    //          └─ iframe #3 — #oss-iframe (redtiger.cash)
    //              └─ .play-button   ← finally a regular element

    cy.get('iframe[src*="showcase.evo-games.com/entry"]')
        .its('0.contentDocument.body')
        .should('not.be.empty')
        .then(cy.wrap)
        .find('iframe[src*="showcase.evo-games.com/frontend"]', { timeout: 15000 })
        .its('0.contentDocument.body')
        .should('not.be.empty')
        .then(cy.wrap)
        .find('#oss-iframe', { timeout: 15000 })
        .its('0.contentDocument.body')
        .should('not.be.empty')
        .then(cy.wrap)
        .find('.play-button', { timeout: 15000 })
        .should('be.visible')
        .click()


    //Get Balance
    cy.get('iframe[src*="showcase.evo-games.com/entry"]')
        .its('0.contentDocument.body')
        .should('not.be.empty')
        .then(cy.wrap)
        .find('iframe[src*="showcase.evo-games.com/frontend"]', { timeout: 15000 })
        .its('0.contentDocument.body')
        .should('not.be.empty')
        .then(cy.wrap)
        .find('#oss-iframe', { timeout: 15000 })
        .its('0.contentDocument.body')
        .should('not.be.empty')
        .then(cy.wrap)
        .find('[class="statistics-field-value"]', { timeout: 15000 })
        .should('contain.text', "€10,000.00")
    
    //Spin
    cy.get('iframe[src*="showcase.evo-games.com/entry"]')
        .its('0.contentDocument.body')
        .should('not.be.empty')
        .then(cy.wrap)
        .find('iframe[src*="showcase.evo-games.com/frontend"]', { timeout: 15000 })
        .its('0.contentDocument.body')
        .should('not.be.empty')
        .then(cy.wrap)
        .find('#oss-iframe', { timeout: 15000 })
        .its('0.contentDocument.body')
        .should('not.be.empty')
        .then(cy.wrap)
        .find('[class="btn-circle-inner-play-button"]', { timeout: 15000 })
        .should('be.visible')
        .click()

    //Get Balance
    cy.get('iframe[src*="showcase.evo-games.com/entry"]')
        .its('0.contentDocument.body')
        .should('not.be.empty')
        .then(cy.wrap)
        .find('iframe[src*="showcase.evo-games.com/frontend"]', { timeout: 15000 })
        .its('0.contentDocument.body')
        .should('not.be.empty')
        .then(cy.wrap)
        .find('#oss-iframe', { timeout: 15000 })
        .its('0.contentDocument.body')
        .should('not.be.empty')
        .then(cy.wrap)
        .find('[class="statistics-field-value"]', { timeout: 15000 })
        .should('not.contain.text', "€10,000.00")
})