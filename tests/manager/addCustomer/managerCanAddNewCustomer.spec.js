import { test } from '@playwright/test';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

const { person } = require('../../../src/TestData.js');

test('Assert manager can add new customer', async ({ page }) => {
  let addCustomerPage = new AddCustomerPage(page);
  let customerListPage = new CustomersListPage(page);

  await addCustomerPage.open();
  await addCustomerPage.fillFirstName(person.firstName);
  await addCustomerPage.fillLastName(person.lastName);
  await addCustomerPage.fillZipCode(person.zipCode);
  await addCustomerPage.clickAddCustomerBtn();
  await addCustomerPage.reload();
  await addCustomerPage.clickCustomerBtn();;
  await customerListPage.assertCustomersFirstNameIsPresent(person.firstName);
  await customerListPage.assertCustomersLastNameIsPresent(person.lastName);
  await customerListPage.assertCustomersZipCodeIsPresent(person.zipCode);
  await customerListPage.assertCustomersAccountNumberEmpty();
});
