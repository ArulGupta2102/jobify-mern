import { test, expect } from '@playwright/test';
import { userBeforeEach } from '../common.setup';

test.describe('AddJob - UI/UX Scenarios', () => {
  test.beforeEach(async ({ page }) => {
    await userBeforeEach(page);
  });

  test('should have all required fields and submit button', async ({ page }) => {
    await expect(page.getByLabel(/position/i)).toBeVisible();
    await expect(page.getByLabel(/company/i)).toBeVisible();
    await expect(page.getByLabel(/job location/i)).toBeVisible();
    await expect(page.getByLabel(/job status/i)).toBeVisible();
    await expect(page.getByLabel(/job type/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /submit/i })).toBeVisible();
  });
}); 