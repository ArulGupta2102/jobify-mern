import { test, expect } from '@playwright/test';

test.describe('AddJob - Negative Scenarios', () => {
  test('should show validation errors for empty required fields', async ({ page }) => {
    await page.goto('http://localhost:5173/dashboard');
    await page.getByRole('button', { name: /submit/i }).click();
    await expect(page.getByText(/required/i)).toBeVisible();
  });
}); 