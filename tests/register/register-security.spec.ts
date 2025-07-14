import { test, expect } from '@playwright/test';

test.describe('Register - Security Scenarios', () => {
  test('should not allow SQL injection in fields', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.click('text=Register');
    await page.fill('input[name="name"]', "' OR 1=1; --");
    await page.fill('input[name="lastName"]', 'Doe');
    await page.fill('input[name="location"]', 'NY');
    await page.fill('input[name="email"]', `sqlinject+${Date.now()}@example.com`);
    await page.fill('input[name="password"]', 'Password123!');
    await page.click('button[type="submit"]');
    await expect(page.locator('.Toastify__toast--error')).toBeVisible();
  });

  test('should not allow XSS in fields', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.click('text=Register');
    await page.fill('input[name="name"]', '<script>alert(1)</script>');
    await page.fill('input[name="lastName"]', 'Doe');
    await page.fill('input[name="location"]', 'NY');
    await page.fill('input[name="email"]', `xss+${Date.now()}@example.com`);
    await page.fill('input[name="password"]', 'Password123!');
    await page.click('button[type="submit"]');
    await expect(page.locator('.Toastify__toast--error')).toBeVisible();
  });
}); 