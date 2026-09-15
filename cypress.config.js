const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://playground.bondaracademy.com/",
    chromeWebSecurity: false,
    setupNodeEvents(on, config) { },
    viewportWidth: 1280,
    viewportHeight: 720,
    retries: { openMode: 0, runMode: 0 },
    defaultCommandTimeout: 10000, 
  }
});
