import { test, expect } from '@playwright/test';
import { userBeforeEach } from '../common.setup';

test.describe('AddJob - Negative Scenarios', () => {
  test.beforeEach(async ({ page }) => {
    await userBeforeEach(page);
  });

  test('should show validation errors for empty required fields', async ({ page }) => {
    await page.getByRole('button', { name: /submit/i }).click();
    await expect(page.getByText(/required/i)).toBeVisible();
  });
}); 