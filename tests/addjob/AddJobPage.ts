import { Page, Locator, expect } from '@playwright/test';

export class AddJobPage {
  readonly page: Page;
  readonly positionInput: Locator;
  readonly companyInput: Locator;
  readonly locationInput: Locator;
  readonly statusSelect: Locator;
  readonly typeSelect: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.positionInput = page.getByLabel(/position/i);
    this.companyInput = page.getByLabel(/company/i);
    this.locationInput = page.getByLabel(/job location/i);
    this.statusSelect = page.getByLabel(/job status/i);
    this.typeSelect = page.getByLabel(/job type/i);
    this.submitButton = page.getByRole('button', { name: /submit/i });
  }

  async goto() {
    await this.page.goto('http://localhost:5173/dashboard/add-job');
  }

  async fillJob({ position, company, location, status, type }: { position: string, company: string, location: string, status: string, type: string }) {
    await this.positionInput.fill(position);
    await this.companyInput.fill(company);
    await this.locationInput.fill(location);
    await this.statusSelect.selectOption(status);
    await this.typeSelect.selectOption(type);
  }

  async submit() {
    await this.submitButton.click();
  }

  async expectSuccess() {
    await expect(this.page.getByText(/job added successfully/i)).toBeVisible();
    await expect(this.page).toHaveURL(/all-jobs/);
  }

  async expectValidationError() {
    await expect(this.page.getByText(/required/i)).toBeVisible();
  }

  async expectInjectionError() {
    await expect(this.page.getByText(/invalid|error/i)).toBeVisible();
  }

  async checkAllFieldsVisible() {
    await expect(this.positionInput).toBeVisible();
    await expect(this.companyInput).toBeVisible();
    await expect(this.locationInput).toBeVisible();
    await expect(this.statusSelect).toBeVisible();
    await expect(this.typeSelect).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }
} 