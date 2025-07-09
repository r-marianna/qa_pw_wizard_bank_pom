import { test } from '@playwright/test';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage.js';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage.js';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage.js';
import { RandomObject } from '../../../src/randomGenerator.js';

const { person } = require('../../../src/TestData.js');
const { currency } = require('../../../src/TestData.js');
const randomCurrency = RandomObject.selectRandomKeyValue(currency);

let addCustomerPage;

test.beforeEach(async ({ page }) => {
  addCustomerPage = new AddCustomerPage(page);

  await addCustomerPage.open();
  await addCustomerPage.fillFirstName(person.firstName);
  await addCustomerPage.fillLastName(person.lastName);
  await addCustomerPage.fillZipCode(person.zipCode);
  await addCustomerPage.clickAddCustomerBtn();
  await addCustomerPage.reload();
});

test('Assert manager can add new customer', async ({ page }) => {

  let openAccountPage = new OpenAccountPage(page);
  let customersListPage = new CustomersListPage(page);

  await openAccountPage.open();
  await openAccountPage.selectCustomerValue(person.firstName + ' ' + person.lastName);
  await openAccountPage.selectCurrencyValue(randomCurrency);
  await openAccountPage.clickProcessBtn();
  await openAccountPage.reload();
  await openAccountPage.clickCustomerBtn();
  await customersListPage.assertCustomersAccountNumberNotEmpty();
});
