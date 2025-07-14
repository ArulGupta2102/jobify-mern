import { test, expect } from '@playwright/test';

const validUsers = [
  { name: 'Alice', lastName: 'Wonder', location: 'Paris', email: `alice+${Date.now()}@example.com`, password: 'Password123!' },
  { name: 'Bob', lastName: 'Builder', location: 'London', email: `bob+${Date.now()}@example.com`, password: 'Password123!' },
];

const invalidUsers = [
  { name: '', lastName: 'NoName', location: 'Berlin', email: 'noname@example.com', password: 'Password123!' },
  { name: 'Eve', lastName: '', location: 'Rome', email: 'eve@example.com', password: 'Password123!' },
  { name: 'Mallory', lastName: 'Hacker', location: '', email: 'mallory@example.com', password: 'Password123!' },
  { name: 'Oscar', lastName: 'Phish', location: 'Madrid', email: 'not-an-email', password: 'Password123!' },
];

test.describe('Register - Data Driven Scenarios', () => {
  for (const user of validUsers) {
    test(`should register successfully for ${user.name}`, async ({ page }) => {
      await page.goto('http://localhost:5173/');
      await page.click('text=Register');
      await page.fill('input[name="name"]', user.name);
      await page.fill('input[name="lastName"]', user.lastName);
      await page.fill('input[name="location"]', user.location);
      await page.fill('input[name="email"]', user.email);
      await page.fill('input[name="password"]', user.password);
      await page.click('button[type="submit"]');
      await expect(page).toHaveURL(/.*login/);
    });
  }

  for (const user of invalidUsers) {
    test(`should show error for invalid data: ${JSON.stringify(user)}`, async ({ page }) => {
      await page.goto('http://localhost:5173/');
      await page.click('text=Register');
      await page.fill('input[name="name"]', user.name);
      await page.fill('input[name="lastName"]', user.lastName);
      await page.fill('input[name="location"]', user.location);
      await page.fill('input[name="email"]', user.email);
      await page.fill('input[name="password"]', user.password);
      await page.click('button[type="submit"]');
      await expect(page.locator('.Toastify__toast--error')).toBeVisible();
    });
  }
}); 