import { test, expect } from '@playwright/test';
import { CableGuyPage } from '../pages/CableGuyPage';

test('CableGuy Product Selection and Basket Verification', async ({ page }) => {
  const cableGuyPage = new CableGuyPage(page);
  
  // Step 1: Select cable beginning type and connection
  await cableGuyPage.navigate();
  const beginning = await cableGuyPage.selectCableBeginning();
  console.log(`Selected beginning cable type: ${beginning.type}`);
  console.log(`Selected beginning cable connection: ${beginning.connection}`);

  // Step 2: Select cable end type and connection
  const end = await cableGuyPage.selectCableEnd();
  console.log(`Selected end cable type: ${end.type}`);
  console.log(`Selected end cable connection: ${end.connection}`);

  // Step 3: Select manufacturer and validate product count
  const manufacturer = await cableGuyPage.selectManufacturer();
  console.log(`Selected manufacturer: ${manufacturer.name}`);
  console.log(`Product count: ${manufacturer.count}`);
  
  const { displayedCount } = await cableGuyPage.validateProductCount();
  console.log(`Number of products displayed: ${displayedCount}`);

  // Step 4: Select and verify product
  const product = await cableGuyPage.selectProduct();
  console.log(`Selected product: ${product.title}`);

  await page.waitForURL('**/*.htm');
  const productTitle = await cableGuyPage.getProductTitle();
  console.log(`Product title: ${productTitle}`);
  
  expect(product.title.trim()).toContain(productTitle);

  // Step 5: Add to basket and verify notification
  await cableGuyPage.addToBasket();
  const notification = await cableGuyPage.getBasketNotification();
  console.log(`Basket Notification Popup: ${notification}`);
  expect(notification).toEqual(`Item ${productTitle} is now in the shopping basket.`);
});