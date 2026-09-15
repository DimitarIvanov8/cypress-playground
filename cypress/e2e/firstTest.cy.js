/// <reference types="cypress" />

beforeEach('Open test application', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()
})

it('Hello world 1', () => {

    //by Tag - no symbol before the string represents tag
    cy.get('input')

    //by ID value - # represents ID
    cy.get('#inputEmail1')

    //by Class value - . represents a single value from the class
    cy.get('.input-full-width')

    //by Attribute - use [] around the attribute name
    cy.get('[fullwidth]')

    //by Attribute with value
    cy.get('[placeholder="Email"]')

    //by entire class value
    cy.get('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //how to combine several attributes
    cy.get('[placeholder="Email"][fullwidth]')
    cy.get('input[placeholder="Email"]')

    //find by data-cy attribute
    cy.get('[data-cy="inputEmail1"]')
})

it('Cypress Locator Methods', () => {
    //get() - to find elements on the page globally. Get all elements
    //find() - to find only child elements
    //contains() - to find web elements by text. Get the first element

    //cy.contains('Sign in', {matchCase:false})
    cy.contains('[status="warning"]', 'Sign in') //locator and text arguments
    cy.contains('nb-card', 'Horizontal form').find('button')
    cy.contains('nb-card', 'Horizontal form').contains('Sign in')

})

it('Child elements', () => {

    cy.contains('nb-card', 'Using the Grid').find('.row').find('button')

    cy.get('nb-card').find('nb-radio-group').contains('Option 1')

    //putting space tells cypress that it is a child element
    cy.get('nb-card nb-radio-group').contains('Option 1')

    //pulling all the child elements right below nb-card (in this case we can pull nb-card-header or nb-card-body)
    cy.get('nb-card > nb-card-body').contains('Option 1')
})

it('Parent elements', () => {

    cy.get('#inputEmail1').parents('form').find('button')

    cy.contains('Using the Grid').parent().find('button')

    //get parents under a 'nb-card-body object
    cy.get('#inputEmail1').parentsUntil('nb-card-body').find('button')

})

it('Reusing Locators', () => {
    // 1. Cypress Alias
    cy.get('#inputEmail1').as('inputEmail1')
    cy.get('@inputEmail1').parents('form').find('button')
    cy.get('@inputEmail1').parents('form').find('nb-radio')

    // 2. Cypress then() method. inputEmail holds the value returned from the previous
    // function (cy.get('#inputEmail1'))
    cy.get('#inputEmail1').then(inputEmail => {
        // Converts jQuery object to cypress chainable
        cy.wrap(inputEmail).parents('form').find('button')
    })
})

it('Extracting Values', () => {
    //1. using JQuery method
    cy.get('[for="exampleInputEmail1"]').then(label => {
        const emailLabel = label.text()
        console.log(emailLabel)
    })

    //2. using invoke command. Invoke JQuery functions
    cy.get('[for="exampleInputEmail1"]').invoke('text').then(emailLabel => {
        console.log(emailLabel)
    })

    //3. Invoke attribute value
    cy.get('#exampleInputEmail1').invoke('attr', 'class').then(classValue => {
        console.log(classValue)
    })
    //in order to check a value you don't have to invoke anything
    //cy.get('#exampleInputEmail1').should('have.attr', 'class', 'some value')

    //4. Invoke input field value
    cy.get('#exampleInputEmail1').type('hello@test.com')
    cy.get('#exampleInputEmail1').invoke('prop', 'value').then(valueProp => {
        console.log(valueProp)
    })

    //in order to check a value you don't have to invoke anything
    cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')
})

it('Assertions and retry', () => {
    //shoud('have.text', 'Email address')
    cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

    cy.get('[for="exampleInputEmail1"]').then(label => {
        expect(label).to.contain('Email address')
    })
})

it('Timeouts', () => {
    cy.contains('Modal & Overlays').click()
    cy.contains('Dialog').click()

    cy.contains('Open with delay 10 seconds').click()
    cy.get('nb-dialog-container nb-card-header', { timeout: 11000 }).should('have.text', 'Friendly reminder')
    cy.get('nb-dialog-container').find('button').click()
})