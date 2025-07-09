import { test } from "@playwright/test";
import { CustomerAccountPage } from "../../../src/pages/customer/CustomerAccountPage.js";
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage.js';
import { accountOperations } from '../../../src/TestData.js';

let customerAccountPage;
let customerLoginPage;

test.beforeEach(async ({ page }) => {
    customerAccountPage = new CustomerAccountPage(page);
    customerLoginPage = new CustomerLoginPage(page);

    await customerLoginPage.open();
    await customerLoginPage.selectCustomer('Hermoine Granger');
    await customerLoginPage.clickLoginButton();
});

test('Assert changed balance(deposit) is visible after relogin', async ({ page }) => {
    customerAccountPage = new CustomerAccountPage(page);

    await customerAccountPage.open();
    await customerAccountPage.assertAccountLineContainsText('Balance : 5096');
    await customerAccountPage.open();
    await customerAccountPage.clickDepositButton();
    await customerAccountPage.fillAmountInputField(
        accountOperations.amount.toString()
    );
    await customerAccountPage.clickDepositFormButton();
    await customerAccountPage.clickLogoutButton();
    await customerLoginPage.selectCustomer('Hermoine Granger');
    await customerLoginPage.clickLoginButton();
    await customerAccountPage.assertAccountLineContainsText(`Balance : ${5096 + accountOperations.amount}`);
});
