import { test, expect } from '@playwright/test';
import { userBeforeEach } from '../common.setup';

test.describe('AddJob - Positive Scenarios', () => {
  test.beforeEach(async ({ page }) => {
    await userBeforeEach(page);
  });

  test('should add a job with valid data', async ({ page }) => {
    await page.getByLabel(/position/i).fill('Software Engineer');
    await page.getByLabel(/company/i).fill('Acme Corp');
    await page.getByLabel(/job location/i).fill('Remote');
    await page.getByLabel(/job status/i).selectOption('pending');
    await page.getByLabel(/job type/i).selectOption('full-time');
    await page.getByRole('button', { name: /submit/i }).click();
    await expect(page.getByText(/job added successfully/i)).toBeVisible();
    await expect(page).toHaveURL(/all-jobs/);
  });
}); 