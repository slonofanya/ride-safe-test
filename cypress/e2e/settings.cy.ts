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
    // Test passenger route map toggle - verify it can be clicked
    cy.get('[data-testid="switch-passengerRouteMap"]').should('be.visible')
    cy.get('[data-testid="switch-passengerRouteMap"]').click()
    
    // Test driver route map preview toggle - verify it can be clicked
    cy.get('[data-testid="switch-driverRouteMapPreview"]').should('be.visible')
    cy.get('[data-testid="switch-driverRouteMapPreview"]').click()
  })
})
