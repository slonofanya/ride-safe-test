// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command to navigate to a specific page
Cypress.Commands.add('navigateToPage', (page: string) => {
  cy.visit(`/${page}`)
})

// Custom command to check if feature flag is enabled
Cypress.Commands.add('checkFeatureFlag', (flag: string) => {
  cy.window().its('localStorage').invoke('getItem', `feature-${flag}`)
})

// Custom command to set feature flag
Cypress.Commands.add('setFeatureFlag', (flag: string, value: boolean) => {
  cy.window().its('localStorage').invoke('setItem', `feature-${flag}`, value.toString())
})

declare global {
  namespace Cypress {
    interface Chainable {
      navigateToPage(page: string): Chainable<void>
      checkFeatureFlag(flag: string): Chainable<string | null>
      setFeatureFlag(flag: string, value: boolean): Chainable<void>
    }
  }
}
