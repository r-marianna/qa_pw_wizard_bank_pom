import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.searchField = page.getByPlaceholder('Search Customer');
    this.table = page.locator('row');
    this.lastCustomerLocator = page.getByRole('row').last();
    this.lastCustomerFirstName = this.lastCustomerLocator.getByRole('cell').nth(0);
    this.lastCustomerLastName = this.lastCustomerLocator.getByRole('cell').nth(1);
    this.lastCustomerZipCode = this.lastCustomerLocator.getByRole('cell').nth(2);
    this.lastCustomerAccountNumber = this.lastCustomerLocator.getByRole('cell').nth(3);
    this.searchCustomerLocator = page.getByRole('row').nth(1);
    this.searchCustomerFirstName = this.searchCustomerLocator.getByRole('cell').nth(0);
    this.searchCustomerSecondName = this.searchCustomerLocator.getByRole('cell').nth(1);
    this.searchCustomerZipCode = this.searchCustomerLocator.getByRole('cell').nth(2);
    this.lastCustomerDelete = this.lastCustomerLocator.getByRole('button', { name: 'Delete' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async reload() {
    await this.page.reload();
  }

  async clickDeleteCustomer() {
    await this.lastCustomerDelete.click();
  }

  async fillSearch(value) {
    await this.searchField.fill(value);
  }

  async assertCustomersFirstNameIsPresent(firstName) {
    await expect(this.lastCustomerFirstName).toContainText(firstName);
  }

  async assertCustomersLastNameIsPresent(lastName) {
    await expect(this.lastCustomerLastName).toContainText(lastName);
  }

  async assertCustomersZipCodeIsPresent(zipCode) {
    await expect(this.lastCustomerZipCode).toContainText(zipCode);
  }

  async assertCustomersAccountNumberEmpty() {
    await expect(this.lastCustomerAccountNumber).toHaveText('');
  }

  async assertCustomersAccountNumberNotEmpty() {
    await expect(this.lastCustomerAccountNumber).not.toBe('');
  }

  async assertCustomerRowIsNotPresent(firstName, lastName, zipCode) {
    await expect(this.lastCustomerLocator.filter({ hasText: firstName })).toBeHidden();
    await expect(this.lastCustomerLocator.filter({ hasText: lastName })).toBeHidden();
    await expect(this.lastCustomerLocator.filter({ hasText: zipCode })).toBeHidden();
  }

  async assertSearchedCustomerRowIsPresent(firstName, lastName, zipCode) {
    await expect(this.lastCustomerLocator.filter({ hasText: firstName })).toBeVisible();
    await expect(this.lastCustomerLocator.filter({ hasText: lastName })).toBeVisible();
    await expect(this.lastCustomerLocator.filter({ hasText: zipCode })).toBeVisible();
  }

  async assertNoRowsExceptSearched() {
    await expect(this.table).toHaveCount(0);
  }
}
