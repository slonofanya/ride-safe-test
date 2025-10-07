describe('Passenger Page', () => {
  beforeEach(() => {
    cy.visit('/passenger')
  })

  it('should display passenger page', () => {
    cy.get('.passenger-container').should('exist')
    cy.contains('Passenger Rides').should('be.visible')
  })

  it('should show ride cards', () => {
    cy.get('.rides-list').should('exist')
    cy.get('.ride-card').should('have.length.at.least', 1)
  })

  it('should have map status indicator', () => {
    cy.contains('Map:').should('be.visible')
  })

  it('should have back to settings button', () => {
    cy.contains('Back to Settings').should('be.visible')
  })
})
