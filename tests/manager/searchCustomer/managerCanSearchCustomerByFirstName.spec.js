import { test } from '@playwright/test';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage.js';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage.js';

const { person } = require('../../../src/TestData.js');
let addCustomerPage;
let customersListPage;

test.beforeEach(async ({ page }) => {
  addCustomerPage = new AddCustomerPage(page);

  await addCustomerPage.open();
  await addCustomerPage.fillFirstName(person.firstName);
  await addCustomerPage.fillLastName(person.lastName);
  await addCustomerPage.fillZipCode(person.zipCode);
  await addCustomerPage.clickAddCustomerBtn();
  await addCustomerPage.reload();
});

test('Assert manager can search customer by First Name', async ({ page }) => {
  customersListPage = new CustomersListPage(page);

  await customersListPage.open();
  await customersListPage.fillSearch(person.firstName);
  await customersListPage.assertSearchedCustomerRowIsPresent(person.firstName, person.secondName, person.zipCode);
  await customersListPage.assertNoRowsExceptSearched();
});
