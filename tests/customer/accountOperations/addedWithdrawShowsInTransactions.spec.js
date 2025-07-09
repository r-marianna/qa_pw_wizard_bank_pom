import { test } from "@playwright/test";
import { BankHomePage } from '../../../src/pages/BankHomePage.js';
import { CustomerAccountPage } from "../../../src/pages/customer/CustomerAccountPage.js";
import { RandomObject } from '../../../src/randomGenerator.js';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage.js';
import { TransactionsPage } from "../../../src/pages/customer/TransactionsPage.js";

const { users } = require('../../../src/TestData.js');
const { options } = require('../../../src/TestData.js');
const { accountOperations } = require('../../../src/TestData.js');
const generatedUser = RandomObject.selectRandomKeyValue(users);
const todayDate = new Date().toLocaleString('en-US', options);
const formattedDate = new Date().toISOString().slice(0, 16);

let bankHomePage;
let customerAccountPage;
let customerLoginPage;
let transactionsPage;

test.beforeEach(async ({ page }) => {
    bankHomePage = new BankHomePage(page);
    customerLoginPage = new CustomerLoginPage(page);

    await customerLoginPage.open();
    await customerLoginPage.selectCustomer('Hermoine Granger');
    await customerLoginPage.clickLoginButton();
});
test('Assert changed balance(withdraw) is visible in transactions', async ({ page }) => {
    customerAccountPage = new CustomerAccountPage(page);
    transactionsPage = new TransactionsPage(page);

    await transactionsPage.open();
    await transactionsPage.assertFirstRowIsHidden();
    await customerAccountPage.open();
    await customerAccountPage.assertAccountLineContainsText('Balance : 5096');
    await customerAccountPage.open();
    await customerAccountPage.clickWithdrawlButton();
    await customerAccountPage.fillAmountInputField(
        accountOperations.amount.toString()
    );
    await customerAccountPage.clickWithdrawlFormButton();
    await customerAccountPage.assertAccountLineContainsText(`Balance : ${5096 - accountOperations.amount}`);
    await page.waitForTimeout(1000);
    await transactionsPage.open();
    await transactionsPage.fillCalendarFirstDate(formattedDate);
    await transactionsPage.assertLastRowFirstCellContainsText(todayDate);
    await transactionsPage.assertLastRowSecondCellContainsText(accountOperations.amount.toString());
    await transactionsPage.assertLastRowCellThirdContainsText('Debit');
    await page.waitForTimeout(1000);
});
