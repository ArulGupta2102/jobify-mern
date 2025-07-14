import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173/';
async function login(page, { email, password }) {
  await page.goto(BASE_URL);
  await page.getByRole('link', { name: /login/i }).click();
  await page.getByRole('textbox', { name: /email/i }).fill(email);
  await page.getByRole('textbox', { name: /password/i }).fill(password);
  await page.getByRole('button', { name: /submit/i }).click();
}

test.describe('Login - Negative Scenarios', () => {
  const invalidCases = [
    { email: 'wrong@gmail.com', password: 'secret123', error: 'invalid credentials' },
    { email: 'john@gmail.com', password: 'wrongpass', error: 'invalid credentials' },
    { email: '', password: 'secret123', error: 'email is required' },
    { email: 'john@gmail.com', password: '', error: 'password is required' },
    { email: '', password: '', error: 'email is required' },
    { email: 'notanemail', password: 'secret123', error: 'invalid credentials' },
  ];
  for (const { email, password, error } of invalidCases) {
    test(`should show error for email='${email}' password='${password}'`, async ({ page }) => {
      await page.goto(BASE_URL);
      await page.getByRole('link', { name: /login/i }).click();
      if (email) await page.getByRole('textbox', { name: /email/i }).fill(email);
      if (password) await page.getByRole('textbox', { name: /password/i }).fill(password);
      await page.getByRole('button', { name: /submit/i }).click();
      await expect(page.getByText(/invalid|required/i)).toBeVisible();
    });
  }
}); 