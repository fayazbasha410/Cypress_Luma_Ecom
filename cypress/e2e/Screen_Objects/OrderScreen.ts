import AppScreen from "./AppScreen";


class OrderScreen extends AppScreen {
    constructor() {
        super(".header.links");
    }

    // Method to get "What's New" menu item
    get whatsNewMenu() {
        return cy.get('a[href="https://magento.softwaretestingboard.com/what-is-new.html"]').first();
    }

    // Method to get "Women" menu and hover to show the dropdown
    get womenMenu() {
        return cy.get('a[href="https://magento.softwaretestingboard.com/women.html"]')
            .first()
            .trigger('mouseover'); // Hover to display submenu
    }

    // Method to get "Tops" submenu under "Women" menu
    get womenTopsMenu() {
        return cy.get('a[href="https://magento.softwaretestingboard.com/women/tops-women.html"]').first();
    }

    // Method to get "Jackets" submenu under "Tops" (Women)
    get womenJacketsMenu() {
        return cy.get('a[href="https://magento.softwaretestingboard.com/women/tops-women/jackets-women.html"]').first();
    }

    // Method to get "Men" menu and hover to show the dropdown
    get menMenu() {
        return cy.get('a[href="https://magento.softwaretestingboard.com/men.html"]')
            .first()
            .trigger('mouseover'); // Hover to display submenu
    }

    // Method to get "Tops" submenu under "Men" menu
    get menTopsMenu() {
        return cy.get('a[href="https://magento.softwaretestingboard.com/men/tops-men.html"]').first();
    }

    // Method to get "Jackets" submenu under "Tops" (Men)
    get menJacketsMenu() {
        return cy.get('a[href="https://magento.softwaretestingboard.com/men/tops-men/jackets-men.html"]').first();
    }

    // Method to get "Sale" menu item
    get saleMenu() {
        return cy.get('a[href="https://magento.softwaretestingboard.com/sale.html"]').first();
    }

    // Method to get "Training" menu and hover to show the dropdown
    get trainingMenu() {
        return cy.get('a[href="https://magento.softwaretestingboard.com/training.html"]')
            .first()
            .trigger('mouseover'); // Hover to display submenu
    }

    // Method to get "Video Download" submenu under "Training" menu
    get videoDownloadMenu() {
        return cy.get('a[href="https://magento.softwaretestingboard.com/training/training-video.html"]').first();
    }

    // Method to get "Gear" menu and hover to show the dropdown
    get gearMenu() {
        return cy.get('a[href="https://magento.softwaretestingboard.com/gear.html"]')
            .first()
            .trigger('mouseover'); // Hover to display submenu
    }

    // Method to get "Bags" submenu under "Gear" menu
    get bagsMenu() {
        return cy.get('a[href="https://magento.softwaretestingboard.com/gear/bags.html"]').first();
    }

    // Method to switch to List View (if it's not already in list view)
    switchToListView() {
        return cy.get(':nth-child(3) > .modes > #mode-list')
        //cy.get('.toolbar-products .view-mode .list').click();
    }

    // Get all products in the list
    getAllProducts() {
        return cy.get('.products.wrapper.list.products-list .product-item');
    }

    // For all product options
    productItem(index: number) {
        return cy.get(`.product-item:eq(${index})`);
    }

    // Sizes
    getSizeOptions(index: number) {
        return this.productItem(index).find('.swatch-attribute.size .swatch-option');
    }

    // Colors
    getColorOptions(index: number) {
        return this.productItem(index).find('.swatch-attribute.color .swatch-option');
    }

    // Add to Cart button
    getAddToCartButton(index: number) {
        return this.productItem(index).find('button.action.tocart');
    }

    // Add to Wishlist button
    getAddToWishlistButton(index: number) {
        return this.productItem(index).find('a.action.towishlist');
    }

    // Add to Compare button
    getAddToCompareButton(index: number) {
        return this.productItem(index).find('a.action.tocompare');
    }

    getWishlistSuccessMessage() {
        return cy.get('.messages .success.message > div');
    }

    addWomenProductToCart() {
        this.womenMenu;
        this.womenTopsMenu.click();
        this.switchToListView().click();
        this.getAllProducts().first().click();
        this.getSizeOptions(0).first().click();
        this.getColorOptions(0).first().click();
        this.getAddToCartButton(0).should('be.visible').click();
    }

    addMenProductToCart() {
        this.menMenu;
        this.menTopsMenu.click();
        this.switchToListView().click();
        this.getAllProducts().first().click();
        this.getSizeOptions(0).first().click();
        this.getColorOptions(0).first().click();
        this.getAddToCartButton(0).should('be.visible').click();
    }
    cart() {
        return cy.get('.showcart')
        //cy.get('.minicart-items');
    }
    waitForCartPopupToBeVisible() {
        return this.cartPopup().should('have.css', 'display', 'block');
    }

    cartPopup() {
        return cy.get('.minicart-wrapper .block-minicart');
    }
    subtotal() {
        return cy.get('.subtotal')
    }
    proceedToCheckoutBtn() {
        return cy.get('#top-cart-btn-checkout')
        //cy.get('.minicart-wrapper .block-minicart .actions .primary.checkout');
    }
    shippingAddressTitle() {
        return cy.get('div.step-title[data-role="title"]');
    }
    streetAddressInput() {
        return cy.get('input[name="street[0]"]');
    }
    cityInput() {
        return cy.get('input[name="city"]');
    }
    stateDropdown() {
        return cy.get('select[name="region_id"]');
    }
    postalCodeInput() {
        return cy.get('input[name="postcode"]');
    }
    telephoneInput() {
        return cy.get('input[name="telephone"]');
    }
    flatRateRadioButton() {
        return cy.get('input[type="radio"][value="flatrate_flatrate"]');
    }

    tableRateRadioButton() {
        return cy.get('input[type="radio"][value="tablerate_bestway"]');
    }
    nextButton() {
        return cy.get('button[data-role="opc-continue"]');
    }
    paymentMethodTitle() {
        return cy.get('div.step-title[data-role="title"]');
    }
    placeOrderButton() {
        return cy.get('button.action.primary.checkout[title="Place Order"]');
    }
    checkoutSuccessSection() {
        return cy.get('div.checkout-success');
    }
    thankYouMessage() {
        return cy.get('span.base[data-ui-id="page-title-wrapper"]');
    }

    orderNumber() {
        return cy.get('a.order-number > strong');
    }
    continueShoppingButton() {
        return cy.get('a.action.primary.continue');
    }
    customerMenuToggleButton() {
        return cy.get('.customer-welcome > .customer-name > .action').eq(0);
    }
    clickCustomerMenuToggleButton() {
        return this.customerMenuToggleButton().should('be.visible').click();
    }
    myAccountLink() {
        return cy.get(':nth-child(2) > .customer-welcome > .customer-menu > .header > :nth-child(1) > a').eq(0);
    }
    clickMyAccountLink() {
        return this.myAccountLink().should('be.visible').click();
    }
    myWishlistLink() {
        return cy.get('ul.header.links a[href$="/wishlist/"]');
    }
    signOutLink() {
        return cy.get('ul.header.links .authorization-link a[href*="/customer/account/logout/"]');
    }
    leftNavMenu() {
        return cy.get('#block-collapsible-nav')
    }
    myOrdersNavItem() {
        return cy.get('.items > :nth-child(2) > a')
        //cy.get('ul.nav.items li.nav.item strong:contains("My Orders")');
    }
    myWishlistNavItem() {
        return cy.get('ul.nav.items li.nav.item a[href$="/wishlist/"]');
    }
    ordersTable() {
        return cy.get('table#my-orders-table');
    }
    orderRows() {
        return cy.get('table#my-orders-table > tbody > tr');
    }
    orderNumbersColumn() {
        return cy.get('table#my-orders-table > tbody > tr > td.col.id');
    }
}
export default new OrderScreen();