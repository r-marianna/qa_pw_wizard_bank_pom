import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.managerCustomerDropDown = page.getByTestId('userSelect');
    this.managerCurrencyDropDown = page.getByTestId('currency');
    this.processButton = page.getByRole('button', { name: 'Process' });
    this.customerBtn = page.getByRole('button', { name: 'Customers' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async reload() {
    await this.page.reload();
  }

  async selectCustomerValue(name) {
    await this.managerCustomerDropDown.selectOption(name);
  }

  async selectCurrencyValue(name) {
    await this.managerCurrencyDropDown.selectOption(name);
  }

  async clickProcessBtn() {
    await this.processButton.click();
  }

  async clickCustomerBtn() {
    await this.customerBtn.click();
  }

  async assertCurrencyDropdownHasValue(name) {
    await expect(this.managerCurrencyDropDown).toHaveValue(name);
  }
}
