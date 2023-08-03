const { defineConfig } = require('cypress');

module.exports = defineConfig({
    watchForFileChanges: false,
    e2e: {
        baseUrl: 'https://la-torta.ua/ua/',
        setupNodeEvents(on, config) {
        },
        env: {
        },
        specPattern: 'cypress/e2e/*.js',
        supportFile: 'cypress/support/commands.js',
    },
});
