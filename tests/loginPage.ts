import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly loginHeader: Locator;
  readonly errorToast: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.submitButton = page.locator('button[type="submit"]');
    this.loginHeader = page.locator('.form h4');
    this.errorToast = page.locator('.Toastify__toast--error');
  }

  async goto() {
    await this.page.goto('http://localhost:5173/');
    await this.page.click('text=Login');
    await expect(this.loginHeader).toHaveText(/login/i);
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async assertLoginSuccess() {
    // Assumes successful login redirects to /dashboard
    await expect(this.page).toHaveURL(/.*dashboard/);
  }

  async assertLoginError() {
    await expect(this.errorToast).toBeVisible();
  }
}
