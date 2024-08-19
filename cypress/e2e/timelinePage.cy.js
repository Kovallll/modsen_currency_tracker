describe('the Timeline Page', () => {
    beforeEach(() => {
        cy.visit('/timeline')
    })

    it('count of currency select', () => {
        cy.get('[data-cy="select"]').children().should('have.length', 10)
    })

    it('remove if count inputs equals one', () => {
        cy.get('[data-cy="container-inputs-chart"]')
            .children()
            .should('have.length', 1)
        cy.get('[data-cy="delete-button-inputs-chart"]').click()
        cy.get('[data-cy="container-inputs-chart"]')
            .children()
            .should('have.length', 1)
    })

    it('add, then remove inputs', () => {
        cy.get('[data-cy="add-button-inputs-chart"]').click()
        cy.get('[data-cy="container-inputs-chart"]')
            .children()
            .should('have.length', 2)
        cy.get('[data-cy="delete-button-inputs-chart"]').eq(0).click()
        cy.get('[data-cy="container-inputs-chart"]')
            .children()
            .should('have.length', 1)
    })

    it('create chart', () => {
        cy.get('[data-cy="create-chart-button"]').click()
        cy.get('[data-cy="chart"]')
        cy.get('[data-cy="success-notify"]')
    })

    it('create chart with empty input', () => {
        cy.get('[data-cy="input-chart"]').clear()
        cy.get('[data-cy="create-chart-button"]').click()
        cy.get('[data-cy="error-notify"]')
    })

    it('input', () => {
        cy.get('[data-cy="input-chart"]').clear().type('e')
        cy.get('[data-cy="input-chart"]').should('be.empty')

        cy.get('[data-cy="input-chart"]').clear().type('0')
        cy.get('[data-cy="input-chart"]').should('be.empty')

        cy.get('[data-cy="input-chart"]').clear().type('d')
        cy.get('[data-cy="input-chart"]').should('be.empty')

        cy.get('[data-cy="input-chart"]').clear().type('5e5')
        cy.get('[data-cy="input-chart"]').should('have.value', '5e5')
    })
})
