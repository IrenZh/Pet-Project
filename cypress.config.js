const { defineConfig } = require('cypress');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
    watchForFileChanges: false,
    video: false,
    env: {
        allure: true,
        allureResultsPath: 'allure-results',
    },
    e2e: {
        baseUrl: 'https://la-torta.ua/ua/',
        setupNodeEvents(on, config) {
            allureWriter(on, config);
            return config;
        }
    },
});
