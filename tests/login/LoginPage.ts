import { Page, Locator, expect, APIResponse } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly demoButton: Locator;
  readonly registerLink: Locator;
  readonly form: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel(/email/i);
    this.passwordInput = page.getByLabel(/password/i);
    this.submitButton = page.getByRole('button', { name: /^submit$/i });
    this.demoButton = page.getByRole('button', { name: /explore the app/i });
    this.registerLink = page.getByRole('link', { name: /register/i });
    this.form = page.locator('form.form');
  }

  async goto() {
    await this.page.goto('http://localhost:5173/login');
  }

  async login({ email, password }: { email: string; password: string }) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async loginDemoUser() {
    await this.demoButton.click();
  }

  async expectSuccess() {
    await expect(this.page).toHaveURL(/dashboard/);
    await expect(this.page.getByText(/dashboard/i)).toBeVisible();
  }

  async expectValidationError() {
    await expect(this.page.getByText(/required|invalid|error/i)).toBeVisible();
  }

  async expectNetworkError() {
    await expect(this.page.getByText(/invalid|error|failed/i)).toBeVisible();
  }

  async expectFormVisible() {
    await expect(this.form).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
    await expect(this.demoButton).toBeVisible();
    await expect(this.registerLink).toBeVisible();
  }

  async checkAccessibility() {
    // Example: check for accessible name, role, and tab order
    await expect(this.emailInput).toHaveAttribute('type', 'email');
    await expect(this.passwordInput).toHaveAttribute('type', 'password');
    // Add more accessibility checks as needed
  }
} 