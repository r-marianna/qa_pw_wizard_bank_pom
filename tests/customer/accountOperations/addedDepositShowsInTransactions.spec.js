import { test } from "@playwright/test";
import { BankHomePage } from '../../../src/pages/BankHomePage.js';
import { CustomerAccountPage } from "../../../src/pages/customer/CustomerAccountPage.js";
import { RandomObject } from '../../../src/randomGenerator.js';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage.js';
import { TransactionsPage } from "../../../src/pages/customer/TransactionsPage.js";
import { users, options, accountOperations } from '../../../src/TestData.js';

const generatedUser = RandomObject.selectRandomKeyValue(users);
const todayDate = new Date().toLocaleString('en-US', options);

let bankHomePage;
let customerAccountPage;
let customerLoginPage;
let transactionsPage;

test.beforeEach(async ({ page }) => {
    bankHomePage = new BankHomePage(page);
    customerLoginPage = new CustomerLoginPage(page);

    await bankHomePage.open();
    await bankHomePage.clickCustomerLoginButton();
    await customerLoginPage.selectCustomer(generatedUser.value);
    await customerLoginPage.clickLoginButton();
});
test('Assert changed balance(deposit) is visible in transactions', async ({ page }) => {
    customerAccountPage = new CustomerAccountPage(page);
    transactionsPage = new TransactionsPage(page);

    await transactionsPage.open();
    await transactionsPage.assertFirstRowIsHidden();
    await customerAccountPage.open();
    await customerAccountPage.assertAccountLineContainsText('Balance : 0');
    await customerAccountPage.open();
    await customerAccountPage.clickDepositButton();
    await customerAccountPage.fillAmountInputField(
        accountOperations.amount.toString()
    );
    await customerAccountPage.clickDepositFormButton();
    await customerAccountPage.assertAccountLineContainsText(`Balance : ${accountOperations.amount}`);
    await page.waitForTimeout(1000);
    await transactionsPage.open();
    await transactionsPage.reload();
    await transactionsPage.assertLastRowFirstCellContainsText(todayDate);
    await transactionsPage.assertLastRowSecondCellContainsText(accountOperations.amount.toString());
    await transactionsPage.assertLastRowCellThirdContainsText('Credit');

});
