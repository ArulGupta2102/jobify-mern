import { test, expect } from '@playwright/test';

test.describe('AddJob - Performance Scenarios', () => {
  test('should add a job within 2 seconds', async ({ page }) => {
    await page.goto('http://localhost:5173/dashboard');
    await page.getByLabel(/position/i).fill('Performance Test');
    await page.getByLabel(/company/i).fill('Speedy Inc');
    const start = Date.now();
    await page.getByRole('button', { name: /submit/i }).click();
    await expect(page.getByText(/job added successfully/i)).toBeVisible();
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(2000);
  });
}); 