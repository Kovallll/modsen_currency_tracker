describe('the Home Page', () => {
    beforeEach(() => {
        cy.visit('')
    })

    it('toggle theme', () => {
        cy.get('[data-theme="dark"]')
        cy.get('[data-cy="toggle"]').click()
        cy.get('[data-theme="light"]')
        cy.get('[data-cy="toggle"]').click()

        cy.get('[data-cy="card"]').should(
            'have.css',
            'background-color',
            'rgb(32, 32, 37)'
        )
        cy.get('[data-cy="toggle"]').click()
        cy.get('[data-cy="card"]').should(
            'have.css',
            'background-color',
            'rgb(224, 224, 224)'
        )
    })

    it('convert', () => {
        cy.get('[data-cy="card"]').contains('US').click()
        cy.get('[data-cy="modal"]')

        cy.get('[data-cy="convert-input"]').clear()
        cy.get('[data-cy="convert-input"]')
            .type(123456)
            .should('have.value', 12345)

        cy.get('[data-cy="convert-input"]').clear()
        cy.get('[data-cy="convert-input"]').type(-1).should('have.value', 1)

        cy.get('[data-cy="convert-input"]').clear()
        cy.get('[data-cy="convert-input"]').type('asd').should('have.value', 0)
    })

    it('click links', () => {
        cy.get('[data-cy="link"]').contains('Timeline').click()
        cy.url().should('include', '/timeline')

        cy.get('[data-cy="link"]').contains('BankCard').click()
        cy.url().should('include', '/bankcard')

        cy.get('[data-cy="link"]').contains('Contacts').click()
        cy.url().should('include', '#contacts')

        cy.get('[data-cy="link"]').contains('Home').click()
        cy.url().should('include', '/')
    })
})
