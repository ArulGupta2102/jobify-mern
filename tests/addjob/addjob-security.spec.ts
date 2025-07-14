import { test, expect } from '@playwright/test';
import { userBeforeEach } from '../common.setup';

test.describe('AddJob - Security Scenarios', () => {
  test.beforeEach(async ({ page }) => {
    await userBeforeEach(page);
  });

  test('should not allow script injection in position field', async ({ page }) => {
    await page.getByLabel(/position/i).fill('<script>alert(1)</script>');
    await page.getByLabel(/company/i).fill('Acme Corp');
    await page.getByLabel(/job location/i).fill('Remote');
    await page.getByLabel(/job status/i).selectOption('pending');
    await page.getByLabel(/job type/i).selectOption('full-time');
    await page.getByRole('button', { name: /submit/i }).click();
    await expect(page.getByText(/invalid|error/i)).toBeVisible();
  });
}); 