import orderScreen from '../Screen_Objects/OrderScreen';
import loginScreen from '../Screen_Objects/LoginScreen';
const textEn = require('../../fixtures/text-locale.json');
require('dotenv').config({ path: './cypress/.env' });

describe('LUMA Order Screen Test Execution', () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.viewport(1366, 768);
        cy.visit('/');
    });
    let savedOrderNumber;

    it("[TC_004]: Given the user signs in correctly, when the user navigates to menu and selects the product to add to cart, then the product should be added to cart", () => {
        // Sign in to the website
        const email = Cypress.env('CYPRESS_GIT_EMAIL');
        const password = Cypress.env('CYPRESS_CONFIRM_PASSWORD');
        const street = Cypress.env('CYPRESS_STREET_ADDRESS');
        const city = Cypress.env('CYPRESS_CITY');
        const zip = Cypress.env('CYPRESS_ZIP');
        const phone = Cypress.env('CYPRESS_PHONE');
        loginScreen.signIn(email, password);

        // Add products to cart
        orderScreen.addWomenProductToCart();
        cy.reload();
        cy.wait(2000);
        orderScreen.addMenProductToCart();
        cy.reload();
        cy.wait(2000);

        // Open cart and proceed to checkout
        orderScreen.cart().should('be.visible').click();
        cy.wait(2000);
        //orderScreen.waitForCartPopupToBeVisible();
        orderScreen.subtotal().should('be.visible');
        cy.wait(2000);
        orderScreen.proceedToCheckoutBtn().should('be.visible').click();
        cy.wait(2000);

        // Fill out shipping form
        orderScreen.shippingAddressTitle().should('contain.text', textEn.ShippingAddress.title);
        orderScreen.streetAddressInput().type(street);
        orderScreen.cityInput().type(city);
        orderScreen.stateDropdown().select(1);
        orderScreen.postalCodeInput().type(zip);
        orderScreen.telephoneInput().type(phone);

        // Select Flat Rate and click Next
        orderScreen.flatRateRadioButton().check({ force: true });
        orderScreen.nextButton().should('be.visible').click();

        // Assert payment section and place order
        orderScreen.paymentMethodTitle().should('contain.text', textEn.Payment.title);
        orderScreen.placeOrderButton().should('be.enabled').click();

        // Assert success message and capture order number
        orderScreen.checkoutSuccessSection().should('be.visible');
        orderScreen.thankYouMessage().should('contain.text', textEn.successMessages.thankyouMessage);
        orderScreen.orderNumber().then(($orderNum) => {
            savedOrderNumber = $orderNum.text().trim();
            cy.log('Captured Order Number:', savedOrderNumber);
        });
    });

    it("[TC_005]: Given the user signs in correctly, when the user navigates to menu and selects the product to wishlist, then the product should be marked wishlisted", () => {
        const email = Cypress.env('CYPRESS_GIT_EMAIL');
        const password = Cypress.env('CYPRESS_NEW_PASSWORD');
        loginScreen.signIn(email, password);
        let savedProductName = '';

        // Navigate to Women's Tops
        orderScreen.womenMenu;
        orderScreen.womenTopsMenu.click();
        orderScreen.switchToListView().click();
        orderScreen.getAllProducts().first().find('.product-item-details .product-item-name a')
            .invoke('text')
            .then((text) => {
                savedProductName = text.trim();
                orderScreen.getAllProducts().first().click();
                orderScreen.getSizeOptions(0).first().click();
                orderScreen.getColorOptions(0).first().click();
                orderScreen.getAddToWishlistButton(0).click();

                // Assert expected message from text-locale.json
                cy.fixture('text-locale.json').then((textLocale) => {
                    const template = textLocale.successMessages.productAddedToWishlist;
                    const expectedMessage = template.replace('{{savedProductName}}', savedProductName);
                    orderScreen.getWishlistSuccessMessage().should('contain.text', expectedMessage);
                });
            });

    });
    it("[TC_006]: Given the user signs in correctly, when the user navigates to my orders menu and search for the order number, then the order number should be available", () => {
        const email = Cypress.env('CYPRESS_GIT_EMAIL');
        const password = Cypress.env('CYPRESS_NEW_PASSWORD');
        loginScreen.signIn(email, password);
        cy.wait(2000);
        cy.reload();
        orderScreen.clickCustomerMenuToggleButton();
        orderScreen.clickMyAccountLink();
        //loginScreen.heading_myAccountTitle().should('contain.text', textEn.MyAccountPage.title);
        cy.wait(2000);
        cy.reload();
        orderScreen.leftNavMenu().should('be.visible');
        orderScreen.myOrdersNavItem().should('be.visible').click();
        orderScreen.ordersTable().should('be.visible');
        orderScreen.orderRows().should('have.length.greaterThan', 0).then(($rows) => {
            const orderNumbers = [];
            $rows.each((index, row) => {
                const orderId = Cypress.$(row).find('td.col.id').text().trim();
                if (orderId) orderNumbers.push(orderId);
            });
            cy.log(`Found Order Numbers: ${orderNumbers}`);
            expect(savedOrderNumber, 'Saved order number must be defined').to.not.be.undefined;
            expect(orderNumbers).to.include(savedOrderNumber);
        });
    });
})