export default class AppScreen {
    protected selector: string;

    constructor(selector: string) {
        this.selector = selector;
    }

    /**
     * Wait for the element to be visible
     *
     * @param {boolean} isShown
     */
    waitForIsShown(isShown = true): Cypress.Chainable {
        if (isShown) {
            return cy.get(this.selector).should('be.visible');
        } else {
            return cy.get(this.selector).should('not.exist');
        }
    }
}