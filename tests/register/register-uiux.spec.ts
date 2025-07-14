import { test, expect } from '@playwright/test';

test.describe('Register - UI/UX Scenarios', () => {
  test('should display all required fields and labels', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.click('text=Register');
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="lastName"]')).toBeVisible();
    await expect(page.locator('input[name="location"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
    await expect(page.locator('text=Already a member?')).toBeVisible();
    await expect(page.locator('a.member-btn')).toHaveAttribute('href', '/login');
  });

  test('should navigate to login page when clicking Login link', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.click('text=Register');
    await page.click('a.member-btn');
    await expect(page).toHaveURL(/.*login/);
  });
}); 