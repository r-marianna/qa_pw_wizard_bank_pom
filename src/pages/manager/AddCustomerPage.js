import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.getByPlaceholder('First Name');
    this.lastName = page.getByPlaceholder('Last Name');
    this.zipCode = page.getByPlaceholder('Post Code');
    this.addCustomerBtn = page.getByRole('form').getByRole('button', { name: 'Add Customer' });
    this.customerBtn = page.getByRole('button', { name: 'Customers' });
    this.homeButton = page.getByRole('button', { name: 'Home' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }

  async reload() {
    await this.page.reload();
  }

  async fillFirstName(name) {
    await this.firstName.fill(name);
  }

  async fillLastName(name) {
    await this.lastName.fill(name);
  }

  async fillZipCode(code) {
    await this.zipCode.fill(code);
  }

  async clickAddCustomerBtn() {
    await this.addCustomerBtn.click();
  }

  async clickCustomerBtn() {
    await this.customerBtn.click();
  }

  async clickHomeButton() {
    await this.homeButton.click();
  }

}
