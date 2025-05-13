import loginScreen from "../Screen_Objects/LoginScreen";
//const loginScreen = new LoginScreen();
const textEn = require("../../fixtures/text-locale.json");
require("dotenv").config({ path: "./cypress/.env" });

describe("LUMA Login Screen Test Execution", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.viewport(1366, 768);
    //cy.visit('https://magento.softwaretestingboard.com/');
    cy.visit("/");
  });

  it("[TC_001]: Given the user is on the Browser, when the user navigates to the url, then the Home screen logo should be displayed", () => {
    loginScreen.img_storeLogo.should("exist").should("be.visible");
    loginScreen.heading_homePageTitle.should("contain", textEn.HomePage.title);
  });

  it("[TC_002]: Given the user is on the Home Page, when the user clicks on Create an Account, fills the form and submits, then the user should be registered and redirected to My Account page", () => {
    loginScreen.link_createAccount.click();
    loginScreen.heading_createAccount.should("contain",textEn.CreateAccountPage.title);
    loginScreen.input_firstName.type(Cypress.env("CYPRESS_FIRST_NAME"));
    loginScreen.input_lastName.type(Cypress.env("CYPRESS_LAST_NAME"));
    loginScreen.input_email.type(Cypress.env("CYPRESS_GIT_EMAIL"));
    loginScreen.input_password.type(Cypress.env("CYPRESS_NEW_PASSWORD"));
    loginScreen.input_confirmPassword.type(Cypress.env("CYPRESS_CONFIRM_PASSWORD"));
    loginScreen.button_createAccount.click();
    //loginScreen.heading_myAccountTitle.should("contain",textEn.MyAccountPage.title);
  });

  it("[TC_003]: Given the user is on the Home Page, when the user clicks on Sign In, enters valid credentials, and submits, then the user should be logged in and redirected to My Account page", () => {
    loginScreen.signIn(
      Cypress.env("CYPRESS_GIT_EMAIL"),
      Cypress.env("CYPRESS_NEW_PASSWORD")
    );
    loginScreen.heading_myAccountTitle.should("contain", textEn.HomePage.title);
  });
});
