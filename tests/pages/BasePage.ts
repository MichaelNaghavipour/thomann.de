import { Page } from '@playwright/test';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    protected async waitForElement(selector: string, timeout = 5000): Promise<void> {
        await this.page.waitForSelector(selector, { timeout });
    }

    protected async waitForTimeout(ms: number): Promise<void> {
        await this.page.waitForTimeout(ms);
    }
} 