describe('the Bankcard Page', () => {
    beforeEach(() => {
        cy.visit('#/bankcard')
    })

    it('show search popup', () => {
        cy.get('[type="search"]').click()
        cy.get('[data-cy="search-popup"]')
    })

    it('search currency', () => {
        cy.get('[type="search"]').type('u')
        cy.get('[data-cy="search-popup"]').children().should('have.length', 3)
    })
})
