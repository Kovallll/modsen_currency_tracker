describe('the Home Page', () => {
    beforeEach(() => {
        cy.visit('')
    })

    it('toggle theme', () => {
        cy.get('[data-theme="dark"]')
        cy.get('[data-cy="toggle"]').click()
        cy.get('[data-theme="light"]')
    })

    it('click links', () => {
        cy.get('[href="/timeline"]').click()
        cy.url().should('include', '/timeline')

        cy.get('[href="/bankcard"]').click()
        cy.url().should('include', '/bankcard')

        cy.get('[href="#contacts"]').click()
        cy.url().should('include', '#contacts')

        cy.get('[data-cy="home-link"]').click()
        cy.url().should('include', '/')
    })

    it('after click card show modal', () => {
        cy.get('[data-cy="card"]').click()
        cy.get('[data-cy="modal"]')
    })
})
