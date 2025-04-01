import { Page, Locator } from '@playwright/test';

export async function selectRandomElement(page: Page, selector: string): Promise<string> {
    // Get all elements matching the selector
    const elements = page.locator(selector);
    
    const count = await elements.count();
    
    if (count === 0) {
        throw new Error(`No elements found for selector: ${selector}`);
    }

    // Generate a random index
    const randomIndex = Math.floor(Math.random() * count);
    
    // Get the selected element
    const selectedElement = elements.nth(randomIndex);
    
    // Ensure the element is visible
    await selectedElement.waitFor({ state: 'visible' });
    
    // Get the text content before clicking
    const selectedText = await selectedElement.textContent();
    
    // Click the selected element
    await selectedElement.click();
    
    // Wait for any animations or state changes to complete
    await page.waitForTimeout(500);
    
    return selectedText || '';
} 