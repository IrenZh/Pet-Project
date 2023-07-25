const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://la-torta.ua/ua/',
    setupNodeEvents(on, config) {
    },
    specPattern: 'cypress/e2e/*.js'
  },
});
