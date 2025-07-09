import { test } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';

test('Assert manager can Login', async ({ page }) => {
  let bankHomePage = new BankHomePage(page);
  let bankManagerMainPage = new BankManagerMainPage(page);

  await bankHomePage.open();
  await bankHomePage.clickManagerLoginButton();
  await bankManagerMainPage.assertBtnAddCustomerIsVisible();
  await bankManagerMainPage.assertBtnOpenAccountIsVisible();
  await bankManagerMainPage.assertBtnCustomersIsVisible();
});
