const { defineConfig } = require("cypress");
const dotenv = require("dotenv");
const path = require("path");

const envFile = path.resolve(__dirname, "./cypress/.env");
dotenv.config({ path: envFile });

//dotenv.config({ path: path.resolve(__dirname, './cypress/.env') });

//console.log('CYPRESS_BASE_URL:', process.env.CYPRESS_BASE_URL);
console.log("CYPRESS_FIRST_NAME:", process.env.CYPRESS_FIRST_NAME);

module.exports = defineConfig({
  e2e: {
    reporter: "mochawesome",
    baseUrl: process.env.CYPRESS_BASE_URL,
    env: {
      CYPRESS_NEW_EMAIL: process.env.CYPRESS_NEW_EMAIL,
      CYPRESS_SAMPLE_EMAIL: process.env.CYPRESS_SAMPLE_EMAIL,
      CYPRESS_GIT_EMAIL: process.env.CYPRESS_GIT_EMAIL,
      CYPRESS_NEW_EMAIL2: process.env.CYPRESS_NEW_EMAIL2,
      CYPRESS_NEW_EMAIL3: process.env.CYPRESS_NEW_EMAIL3,
      CYPRESS_NEW_EMAIL4: process.env.CYPRESS_NEW_EMAIL4,
      CYPRESS_NEW_EMAIL5: process.env.CYPRESS_NEW_EMAIL5,
      CYPRESS_NEW_EMAIL6: process.env.CYPRESS_NEW_EMAIL6,
      CYPRESS_NEW_PASSWORD: process.env.CYPRESS_NEW_PASSWORD,
      CYPRESS_CONFIRM_PASSWORD: process.env.CYPRESS_CONFIRM_PASSWORD,
      CYPRESS_FIRST_NAME: process.env.CYPRESS_FIRST_NAME,
      CYPRESS_LAST_NAME: process.env.CYPRESS_LAST_NAME,
      CYPRESS_STREET_ADDRESS: process.env.CYPRESS_STREET_ADDRESS,
      CYPRESS_CITY: process.env.CYPRESS_CITY,
      CYPRESS_ZIP: process.env.CYPRESS_ZIP,
      CYPRESS_PHONE: process.env.CYPRESS_PHONE,
    },
    supportFile: "cypress/support/e2e.js",
    setupNodeEvents(on, config) {
      on("before:run", () => {
        // Mute all logs
        //Cypress.on("log:added", () => false);
      });
      // implement node event listeners here
    },
    watchForFileChanges: false,
  },
});
