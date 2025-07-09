import { test } from "@playwright/test";
import { BankHomePage } from '../../src/pages/BankHomePage.js';
import { CustomerAccountPage } from "../../src/pages/customer/CustomerAccountPage.js";
import { RandomObject } from '../../src/randomGenerator.js';
import { CustomerLoginPage } from '../../src/pages/customer/CustomerLoginPage.js';

const { users } = require('../../src/TestData.js');
const generatedUser = RandomObject.selectRandomKeyValue(users);

let bankHomePage;
let customerAccountPage;
let customerLoginPage;

test.beforeEach(async ({ page }) => {
    bankHomePage = new BankHomePage(page);
    customerLoginPage = new CustomerLoginPage(page);

    await bankHomePage.open();
    await bankHomePage.clickCustomerLoginButton();
    await customerLoginPage.selectCustomer(generatedUser.value);
    await customerLoginPage.clickLoginButton();
});

test('Assert user can return to Home with button', async ({ page }) => {
    customerAccountPage = new CustomerAccountPage(page);
    bankHomePage = new BankHomePage(page);

    await customerAccountPage.clickHomeButton();
    await bankHomePage.assertBothButtonsAreVisible();
});

test('Assert user can Logout with button', async ({ page }) => {
    customerAccountPage = new CustomerAccountPage(page);
    customerLoginPage = new CustomerLoginPage(page);

    await customerAccountPage.clickLogoutButton();
    await customerLoginPage.assertSelectCustomerDropdownIsVisible();
});

