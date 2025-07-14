import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173/';
const VALID_USER = { email: 'john@gmail.com', password: 'secret123', name: 'john' };
const DEMO_USER = { email: 'peter@gmail.com', password: 'secret123', name: 'test user' };

async function login(page, { email, password }) {
  await page.goto(BASE_URL);
  await page.getByRole('link', { name: /login/i }).click();
  await page.getByRole('textbox', { name: /email/i }).fill(email);
  await page.getByRole('textbox', { name: /password/i }).fill(password);
  await page.getByRole('button', { name: /submit/i }).click();
}

test.describe('Login - Positive Scenarios', () => {
  test('should login successfully with valid credentials', async ({ page }) => {
    await login(page, VALID_USER);
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.getByRole('button', { name: VALID_USER.name })).toBeVisible();
    await expect(page.getByText('Login successful')).toBeVisible();
  });

  test('should login successfully as demo user', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByRole('link', { name: /login/i }).click();
    await page.getByRole('button', { name: /explore the app/i }).click();
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.getByText(/test drive/i)).toBeVisible();
  });
}); 