import { test } from "@playwright/test";
import { BankHomePage } from '../../src/pages/BankHomePage.js';
import { CustomerAccountPage } from "../../src/pages/customer/CustomerAccountPage.js";
import { CustomerLoginPage } from '../../src/pages/customer/CustomerLoginPage.js';

const { users } = require('../../src/TestData.js');

let bankHomePage;
let customerAccountPage;
let customerLoginPage;

test.beforeEach(async ({ page }) => {
    bankHomePage = new BankHomePage(page);
    customerLoginPage = new CustomerLoginPage(page);

    await bankHomePage.open();
    await bankHomePage.clickManagerLoginButton();
});

test('Assert manager can return to Home with button', async ({ page }) => {
    customerAccountPage = new CustomerAccountPage(page);
    bankHomePage = new BankHomePage(page);

    await customerAccountPage.clickHomeButton();
    await bankHomePage.assertBothButtonsAreVisible();
});