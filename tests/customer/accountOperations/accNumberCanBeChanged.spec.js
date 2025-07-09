import { test } from "@playwright/test";
import { CustomerAccountPage } from "../../../src/pages/customer/CustomerAccountPage.js";
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage.js';

let customerAccountPage;
let customerLoginPage;

test.beforeEach(async ({ page }) => {
    customerLoginPage = new CustomerLoginPage(page);

    await customerLoginPage.open();
    await customerLoginPage.selectCustomer('Hermoine Granger');
    await customerLoginPage.clickLoginButton();
});

test('Assert balance number can be changed', async ({ page }) => {
    customerAccountPage = new CustomerAccountPage(page);

    await customerAccountPage.open();
    await customerAccountPage.assertAccountLineContainsText('Balance : 5096');
    await customerAccountPage.assertAccountIdInDropDownHasValue('number:1001');
    await customerAccountPage.assertAccountIdInDropDownCanBeChanged('1002');
    await customerAccountPage.assertAccountIdInDropDownHasValue('number:1002');
    await customerAccountPage.assertAccountLineContainsText('Account Number : 1002');
    await customerAccountPage.assertAccountLineContainsText('Balance : 0');
    await customerAccountPage.assertAccountLineContainsText('Currency : Pound');
});
