import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173/';
const VALID_USER = { email: 'john@gmail.com', password: 'secret123', name: 'john' };
async function login(page, { email, password }) {
  await page.goto(BASE_URL);
  await page.getByRole('link', { name: /login/i }).click();
  await page.getByRole('textbox', { name: /email/i }).fill(email);
  await page.getByRole('textbox', { name: /password/i }).fill(password);
  await page.getByRole('button', { name: /submit/i }).click();
}

test.describe('Login - Performance', () => {
  test('should login within 2 seconds', async ({ page }) => {
    const start = Date.now();
    await login(page, VALID_USER);
    await expect(page).toHaveURL(/.*dashboard/);
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(2000);
  });
}); 