import { test, expect } from '@playwright/test';

test.describe('Register - Performance Scenarios', () => {
  test('should submit registration form within acceptable time', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.click('text=Register');
    await page.fill('input[name="name"]', 'Perf');
    await page.fill('input[name="lastName"]', 'Test');
    await page.fill('input[name="location"]', 'LA');
    await page.fill('input[name="email"]', `perf+${Date.now()}@example.com`);
    await page.fill('input[name="password"]', 'Password123!');
    const start = Date.now();
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*login/);
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(2000); // 2 seconds
  });
}); 