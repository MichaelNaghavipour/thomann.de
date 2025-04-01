import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { selectRandomElement } from '../utils/randomUtils';

export class CableGuyPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    /**
     * Navigates to the CableGuy page and accepts cookies
     */
    async navigate(): Promise<void> {
        await this.page.goto('https://www.thomann.de/intl/cableguy.html');
        await this.acceptCookies();
    }

    /**
     * Accepts the cookie consent popup
     */
    private async acceptCookies(): Promise<void> {
        const acceptCookiesButton = this.page.locator('.js-accept-all-cookies');
        await acceptCookiesButton.click();
    }

    /**
     * Selects random cable type and connection for the beginning of the cable
     * @returns Selected cable type and connection
     */
    async selectCableBeginning(): Promise<{ type: string; connection: string }> {
        const cableBeginningButton = this.page.locator('.has-focus-visible.cg-plugButton.cg-plugButton--left');
        await cableBeginningButton.click();

        // Wait for cable types to be available and select one
        await this.page.waitForSelector('.cg-plugmodal__category__item:not(.inactive)', { state: 'visible', timeout: 2000 });
        const cableType = await selectRandomElement(this.page, '.cg-plugmodal__category__item:not(.inactive)');

        // Wait for connections to be available and select one
        await this.page.waitForSelector('.cg-plugItem', { state: 'visible', timeout: 4000 });
        const connection = await selectRandomElement(this.page, '.cg-plugItem');

        return { type: cableType, connection };
    }

    /**
     * Selects random cable type and connection for the end of the cable
     * @returns Selected cable type and connection
     */
    async selectCableEnd(): Promise<{ type: string; connection: string }> {
        const cableEndButton = this.page.locator('.has-focus-visible.cg-plugButton.cg-plugButton--right');
        await cableEndButton.click();

        // Wait for cable types to be available and select one
        await this.page.waitForSelector('.cg-plugmodal__category__item:not(.inactive)', { state: 'visible', timeout: 2000 });
        const cableType = await selectRandomElement(this.page, '.cg-plugmodal__category__item:not(.inactive)');

        // Wait for connections to be available and select one
        await this.page.waitForSelector('.cg-plugItem', { state: 'visible', timeout: 4000 });
        const connection = await selectRandomElement(this.page, '.cg-plugItem');

        return { type: cableType, connection };
    }

    /**
     * Selects a random manufacturer and returns its details
     * @returns Manufacturer name and product count
     */
    async selectManufacturer(): Promise<{ name: string; count: number }> {
        await this.waitForTimeout(1000);
        await selectRandomElement(this.page, '.cg-brands__item');
        const name = await this.page.locator('.cg-brands__item.clicked.active img').getAttribute('alt') || '';
        
        const productCount = await this.page.locator('.cg-brands__item.clicked.active + .cg-brands__item__count').first().textContent();
        const count = parseInt(productCount || '0');

        return { name, count };
    }

    /**
     * Validates that the displayed product count matches the manufacturer's count
     * @returns Number of displayed products
     */
    async validateProductCount(): Promise<{ displayedCount: number }> {
        await this.waitForTimeout(1000);
        const displayedProducts = this.page.locator('.cg-articles-list .fx-product-list-entry');
        const displayedCount = await displayedProducts.count();
        
        const productCount = await this.page.locator('.cg-brands__item.clicked.active + .cg-brands__item__count').first().textContent();
        const expectedCount = parseInt(productCount || '0');
        
        expect(displayedCount).toBe(expectedCount);
        return { displayedCount };
    }

    /**
     * Selects a random product from the filtered list
     * @returns Selected product title
     */
    async selectProduct(): Promise<{ title: string }> {
        const product = await selectRandomElement(this.page, '.cg-articles-list .fx-product-list-entry');
        return { title: product };
    }

    /**
     * Gets the product title from the product page
     * @returns Product title
     */
    async getProductTitle(): Promise<string> {
        const productTitle = (await this.page.locator('.fx-content-product__main.product-title h1').textContent())?.trim() || '';
        return productTitle;
    }

    /**
     * Adds the selected product to the shopping basket
     */
    async addToBasket(): Promise<void> {
        const addToBasketButton = this.page.getByRole('button', { name: 'Add to Basket' });
        await addToBasketButton.click();
    }

    /**
     * Gets the basket notification message
     * @returns Notification message
     */
    async getBasketNotification(): Promise<string> {
        await this.page.waitForSelector('.fx-notification__infobox');
        const notification = (await this.page.locator('.fx-notification__content').textContent())?.trim() || '';
        return notification;
    }
} 