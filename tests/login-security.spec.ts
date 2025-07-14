import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173/';
async function login(page, { email, password }) {
  await page.goto(BASE_URL);
  await page.getByRole('link', { name: /login/i }).click();
  await page.getByRole('textbox', { name: /email/i }).fill(email);
  await page.getByRole('textbox', { name: /password/i }).fill(password);
  await page.getByRole('button', { name: /submit/i }).click();
}

test.describe('Login - Security Scenarios', () => {
  const securityCases = [
    { email: "' OR 1=1;--", password: 'secret123' },
    { email: '<script>alert(1)</script>', password: 'secret123' },
    { email: 'john@gmail.com', password: '<script>alert(1)</script>' },
  ];
  for (const { email, password } of securityCases) {
    test(`should not allow injection: email='${email}' password='${password}'`, async ({ page }) => {
      await login(page, { email, password });
      await expect(page.getByText(/invalid|error|credentials/i)).toBeVisible();
    });
  }
}); 