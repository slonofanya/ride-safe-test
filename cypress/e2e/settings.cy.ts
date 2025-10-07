describe('Settings Page', () => {
  beforeEach(() => {
    cy.visit('/settings')
  })

  it('should display settings page', () => {
    cy.get('.settings-container').should('exist')
    cy.contains('Feature Settings').should('be.visible')
  })

  it('should have feature flag toggles', () => {
    cy.get('[data-testid="switch-passengerRouteMap"]').should('exist')
    cy.get('[data-testid="switch-driverRouteMapPreview"]').should('exist')
  })

  it('should toggle feature flags', () => {
    // Test passenger route map toggle
    cy.get('[data-testid="switch-passengerRouteMap"]').click()
    cy.get('[data-testid="switch-passengerRouteMap"]').should('be.checked')
    
    // Test driver route map preview toggle
    cy.get('[data-testid="switch-driverRouteMapPreview"]').click()
    cy.get('[data-testid="switch-driverRouteMapPreview"]').should('be.checked')
  })
})
