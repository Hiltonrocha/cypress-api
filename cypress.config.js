const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://reqres.in/",
    screenshotOnRunFailure: false,
    video: false,
  },
});
