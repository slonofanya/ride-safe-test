describe('Ride Safe App', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should load the application', () => {
    cy.get('.app').should('exist')
  })

  it('should redirect to settings page by default', () => {
    cy.url().should('include', '/settings')
  })

  it('should have navigation between pages', () => {
    // Check if we're on settings page
    cy.url().should('include', '/settings')
    
    // Navigate to passenger page
    cy.navigateToPage('passenger')
    cy.url().should('include', '/passenger')
    
    // Navigate to driver page
    cy.navigateToPage('driver')
    cy.url().should('include', '/driver')
  })
})
