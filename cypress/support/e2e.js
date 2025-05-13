// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

before(() => {
    // disable Cypress's default behavior of logging all XMLHttpRequests and fetches
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
  });
// Import commands.js using ES2015 syntax:
import './commands'
require('dotenv').config();
// Hide all XHR and fetch logs from Command Log
//const hiddenRoutes = ['**/api/*', '**/analytics*', '**/captcha.html'];
//Cypress.on('log:added', (log) => {
  //  const isXhrOrFetch = log.displayName === 'xhr' || log.displayName === 'fetch';
    //const matchesHiddenRoute = hiddenRoutes.some(route => Cypress.minimatch(log.url, route));
  
    //if (isXhrOrFetch && matchesHiddenRoute) {
      //return false; // Block the log
    //}
    //return log; // Keep other logs
  //});
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false;
  });