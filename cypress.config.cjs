const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: `http://${process.env.VITE_HOST || '127.0.0.1'}:${process.env.PREVIEW_PORT || '4173'}/ride_safe`,
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    experimentalStudio: true,
    chromeWebSecurity: false,
    nodeVersion: 'system',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config
    },
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
})
