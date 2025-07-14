import { test, expect } from '@playwright/test';

test.describe('Register - Positive Scenarios', () => {
  test('should register successfully with valid details', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.click('text=Register');
    await page.fill('input[name="name"]', 'John');
    await page.fill('input[name="lastName"]', 'Doe');
    await page.fill('input[name="location"]', 'New York');
    await page.fill('input[name="email"]', `john.doe+${Date.now()}@example.com`);
    await page.fill('input[name="password"]', 'Password123!');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*login/);
    await expect(page.locator('.form h4')).toHaveText(/login/i);
  });
}); 