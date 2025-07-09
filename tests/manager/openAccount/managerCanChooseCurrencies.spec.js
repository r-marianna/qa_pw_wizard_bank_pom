import { test } from '@playwright/test';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage.js';
import { currency } from '../../../src/TestData.js';

test('Assert manager can choose currencies for account', async ({ page }) => {
  let openAccountPage = new OpenAccountPage(page);

  await openAccountPage.open();
  await openAccountPage.selectCurrencyValue(currency.dollar);
  await openAccountPage.assertCurrencyDropdownHasValue(currency.dollar);
  await openAccountPage.selectCurrencyValue(currency.pound);
  await openAccountPage.assertCurrencyDropdownHasValue(currency.pound);
  await openAccountPage.selectCurrencyValue(currency.rupee);
  await openAccountPage.assertCurrencyDropdownHasValue(currency.rupee);
});
