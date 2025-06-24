const { defineConfig } = require("cypress");
const { allureCypress } = require("allure-cypress/reporter");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.amazon.in/",
    retries: 2,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      allureCypress(on, config);
      return config;
    },
  },
  video: true,
  screenshotOnRunFailure: true,
});
