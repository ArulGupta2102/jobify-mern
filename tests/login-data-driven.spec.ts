import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173/';
async function login(page, { email, password }) {
  await page.goto(BASE_URL);
  await page.getByRole('link', { name: /login/i }).click();
  await page.getByRole('textbox', { name: /email/i }).fill(email);
  await page.getByRole('textbox', { name: /password/i }).fill(password);
  await page.getByRole('button', { name: /submit/i }).click();
}

const users = [
  { email: 'john@gmail.com', password: 'secret123', shouldSucceed: true },
  { email: 'test@test.com', password: 'secret123', shouldSucceed: true },
  { email: 'wrong@gmail.com', password: 'secret123', shouldSucceed: false },
  { email: 'john@gmail.com', password: 'wrongpass', shouldSucceed: false },
];
test.describe('Login - Data Driven', () => {
  for (const user of users) {
    test(`login with email='${user.email}' password='${user.password}'`, async ({ page }) => {
      await login(page, user);
      if (user.shouldSucceed) {
        await expect(page).toHaveURL(/.*dashboard/);
      } else {
        await expect(page.getByText(/invalid|error|credentials/i)).toBeVisible();
      }
    });
  }
}); 