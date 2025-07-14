import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173/';
async function login(page, { email, password }) {
  await page.goto(BASE_URL);
  await page.getByRole('link', { name: /login/i }).click();
  await page.getByRole('textbox', { name: /email/i }).fill(email);
  await page.getByRole('textbox', { name: /password/i }).fill(password);
  await page.getByRole('button', { name: /submit/i }).click();
}

test.describe('Login - UI/UX Scenarios', () => {
  test('should mask password input', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByRole('link', { name: /login/i }).click();
    const passwordInput = await page.getByRole('textbox', { name: /password/i });
    expect(await passwordInput.getAttribute('type')).toBe('password');
  });

  test('should show error message for invalid credentials', async ({ page }) => {
    await login(page, { email: 'wrong@gmail.com', password: 'wrongpass' });
    await expect(page.getByText(/invalid credentials/i)).toBeVisible();
  });
}); 