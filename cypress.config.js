const { defineConfig } = require('cypress');
const cucumber = require('cypress-cucumber-preprocessor').default;

module.exports = defineConfig({
  env:{
    url_api: 'https://jsonplaceholder.typicode.com',
  },
  e2e: {
    reporter: 'cypress-mochawesome-reporter',
    baseUrl: 'https://jsonplaceholder.typicode.com',
    chromeWebSecurity: false,
    experimentalModifyObstructiveThirdPartyCode: true,
    reporterOptions: {
      code: false,
    },
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber());
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    specPattern: 'cypress/e2e/**/*.feature',
  },
});