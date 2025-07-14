import { test, expect } from '@playwright/test';

test.describe('AddJob - Positive Scenarios', () => {
  test('should add a job with valid data', async ({ page }) => {
    await page.goto('http://localhost:5173/dashboard');
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