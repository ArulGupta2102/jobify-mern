import { test, expect } from '@playwright/test';
import { userBeforeEach } from '../common.setup';

test.describe('AddJob - Performance Scenarios', () => {
  test.beforeEach(async ({ page }) => {
    await userBeforeEach(page);
  });

  test('should add a job within 2 seconds', async ({ page }) => {
    await page.getByLabel(/position/i).fill('Performance Test');
    await page.getByLabel(/company/i).fill('Speedy Inc');
    await page.getByLabel(/job location/i).fill('Remote');
    await page.getByLabel(/job status/i).selectOption('pending');
    await page.getByLabel(/job type/i).selectOption('full-time');
    const start = Date.now();
    await page.getByRole('button', { name: /submit/i }).click();
    await expect(page.getByText(/job added successfully/i)).toBeVisible();
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(2000);
  });
}); 