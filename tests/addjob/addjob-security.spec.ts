import { test, expect } from '@playwright/test';

test.describe('AddJob - Security Scenarios', () => {
  test('should not allow script injection in position field', async ({ page }) => {
    await page.goto('http://localhost:5173/dashboard');
    await page.getByLabel(/position/i).fill('<script>alert(1)</script>');
    await page.getByLabel(/company/i).fill('Acme Corp');
    await page.getByRole('button', { name: /submit/i }).click();
    await expect(page.getByText(/invalid|error/i)).toBeVisible();
  });
}); 