import AppScreen from "./AppScreen";

class LoginScreen extends AppScreen {
  constructor() {
    super(".header.links");
  }

  // Home Page Title
  get heading_homePageTitle() {
    return cy.get(".page-title-wrapper .page-title .base");
  }

  // Store Logo Image
  get img_storeLogo() {
    return cy.get(".logo img");
  }

  // Sign In Link
  get link_signIn() {
    return cy.get(".panel > .header > .authorization-link > a");
  }

  // Create an Account Link
  get link_createAccount() {
    return cy.get(".panel > .header > :nth-child(3) > a");
  }

  // Page Title
  get heading_createAccount() {
    return cy.get(".page-title-wrapper .page-title .base");
  }

  // First Name Input
  get input_firstName() {
    return cy.get("#firstname");
  }

  // Last Name Input
  get input_lastName() {
    return cy.get("#lastname");
  }

  // Email Input
  get input_email() {
    return cy.get("#email_address");
  }

  // Password Input
  get input_password() {
    return cy.get("#password");
  }

  // Confirm Password Input
  get input_confirmPassword() {
    return cy.get("#password-confirmation");
  }

  // Create an Account Button
  get button_createAccount() {
    return cy.get("#form-validate > .actions-toolbar > div.primary > .action");
  }

  // My Account Page Title
  get heading_myAccountTitle() {
    return cy.get(".page-title-wrapper .page-title .base");
  }

  // Account success confirmation
  get link_welcomeMessage() {
    return cy.get(".header.links > .greet.welcome > .logged-in");
  }

  // Sign In Link (header)
  get link_signInHeader() {
    return cy.get('li.authorization-link > a[href*="/customer/account/login"]');
  }

  // Sign In Page Title
  get heading_signInTitle() {
    return cy.get(".page-title-wrapper .page-title .base");
  }

  // Email Input (Login)
  get input_emailLogin() {
    return cy.get("#email");
  }

  // Password Input (Login)
  get input_passwordLogin() {
    return cy.get("#pass");
  }

  // Sign In Button (Login)
  get button_signInLogin() {
    return cy.get("#send2");
  }

  // signin method
  signIn(email: string, password: string): void {
    this.link_signInHeader.first().should("be.visible").click();
    this.input_emailLogin.should("be.visible").type(email);
    this.input_passwordLogin.should("be.visible").type(password);
    this.button_signInLogin.click();
  }
}
export default new LoginScreen();
