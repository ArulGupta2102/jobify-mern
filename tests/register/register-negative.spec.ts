import { test, expect } from '@playwright/test';

test.describe('Register - Negative Scenarios', () => {
  test('should show error for missing required fields', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.click('text=Register');
    await page.click('button[type="submit"]');
    await expect(page.locator('.Toastify__toast--error')).toBeVisible();
  });

  test('should show error for invalid email', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.click('text=Register');
    await page.fill('input[name="name"]', 'Jane');
    await page.fill('input[name="lastName"]', 'Smith');
    await page.fill('input[name="location"]', 'LA');
    await page.fill('input[name="email"]', 'not-an-email');
    await page.fill('input[name="password"]', 'Password123!');
    await page.click('button[type="submit"]');
    await expect(page.locator('.Toastify__toast--error')).toBeVisible();
  });
}); 