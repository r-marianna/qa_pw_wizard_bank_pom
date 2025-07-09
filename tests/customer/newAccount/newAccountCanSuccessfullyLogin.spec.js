import { test } from '@playwright/test';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage.js';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage.js';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage.js';
import { RandomObject } from '../../../src/randomGenerator.js';
import { BankHomePage } from '../../../src/pages/BankHomePage.js';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage.js';
import { person, currency } from '../../../src/TestData.js';

const randomCurrency = RandomObject.selectRandomKeyValue(currency);

let addCustomerPage;
let openAccountPage;
let customerLoginPage;
let bankHomePage;
let customerAccountPage;

test.beforeEach(async ({ page }) => {
  addCustomerPage = new AddCustomerPage(page);
  openAccountPage = new OpenAccountPage(page);

  await addCustomerPage.open();
  await addCustomerPage.fillFirstName(person.firstName);
  await addCustomerPage.fillLastName(person.lastName);
  await addCustomerPage.fillZipCode(person.zipCode);
  await addCustomerPage.clickAddCustomerBtn();
  await openAccountPage.open();
  await openAccountPage.selectCustomerValue(person.firstName + ' ' + person.lastName);
  await openAccountPage.selectCurrencyValue(randomCurrency);
  await openAccountPage.clickProcessBtn();
  await addCustomerPage.clickHomeButton();
});

test('Assert that user can enter the new account', async ({ page }) => {
  customerLoginPage = new CustomerLoginPage(page);
  bankHomePage = new BankHomePage(page);
  customerAccountPage = new CustomerAccountPage(page);

  await bankHomePage.clickCustomerLoginButton();
  await customerLoginPage.selectCustomer(person.firstName + ' ' + person.lastName);
  await customerLoginPage.clickLoginButton();
  await customerAccountPage.assertAccountLineContainsText('Account Number : ');
  await customerAccountPage.assertAccountLineContainsText('Balance : 0');
  await customerAccountPage.assertAccountLineContainsText(`Currency : ${randomCurrency.value}`);
});