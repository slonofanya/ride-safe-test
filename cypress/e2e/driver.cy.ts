describe('Driver Page', () => {
  beforeEach(() => {
    cy.visit('/driver')
  })

  it('should display driver page', () => {
    cy.get('.driver-container').should('exist')
    cy.contains('Driver Rides').should('be.visible')
  })

  it('should show ride cards', () => {
    cy.get('.rides-list').should('exist')
    cy.get('.ride-card').should('have.length.at.least', 1)
  })

  it('should have map status indicator', () => {
    cy.contains('Map Preview:').should('be.visible')
  })

  it('should navigate back to settings', () => {
    cy.contains('Back to Settings').click()
    cy.url().should('include', '/settings')
  })
})
