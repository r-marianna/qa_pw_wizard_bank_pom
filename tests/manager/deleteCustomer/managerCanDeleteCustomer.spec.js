import { test } from '@playwright/test';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { person } from '../../../src/TestData.js';

let addCustomerPage;
let customerListPage;

test.beforeEach(async ({ page }) => {
  addCustomerPage = new AddCustomerPage(page);

  await addCustomerPage.open();
  await addCustomerPage.fillFirstName(person.firstName);
  await addCustomerPage.fillLastName(person.lastName);
  await addCustomerPage.fillZipCode(person.zipCode);
  await addCustomerPage.clickAddCustomerBtn();

});

test('Assert manager can delete customer', async ({ page }) => {
  customerListPage = new CustomersListPage(page);

  await customerListPage.open();
  await customerListPage.clickDeleteCustomer();
  await customerListPage.assertCustomerRowIsNotPresent(person.firstName, person.lastName, person.zipCode);
  await customerListPage.reload();
  await customerListPage.assertCustomerRowIsNotPresent(person.firstName, person.lastName, person.zipCode);
});
