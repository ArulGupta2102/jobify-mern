import { test, expect } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { invalidLoginData } from './loginFactory';

// [@security]
test.describe('Login Feature - Security Scenarios', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.expectFormVisible();
  });

  test('[@security] should not allow SQL injection in email or password', async ({ page }) => {
    const sqlPayloads = [
      { email: "' OR '1'='1", password: 'password' },
      { email: 'test@test.com', password: "' OR '1'='1" },
      { email: 'admin@admin.com', password: 'admin123; DROP TABLE users;' },
    ];
    for (const creds of sqlPayloads) {
      await loginPage.goto();
      const [response] = await Promise.all([
        page.waitForResponse(resp => resp.url().includes('/auth/login')),
        loginPage.login(creds),
      ]);
      expect(response.status()).not.toBe(200);
      await loginPage.expectNetworkError();
    }
  });

  test('[@security] should not allow XSS in email or password', async ({ page }) => {
    const xssPayloads = [
      { email: '<script>alert(1)</script>@x.com', password: 'xss' },
      { email: 'xss@x.com', password: '<img src=x onerror=alert(1)>' },
    ];
    for (const creds of xssPayloads) {
      await loginPage.goto();
      const [response] = await Promise.all([
        page.waitForResponse(resp => resp.url().includes('/auth/login')),
        loginPage.login(creds),
      ]);
      expect(response.status()).not.toBe(200);
      await loginPage.expectNetworkError();
    }
  });

  test('[@security] should not allow brute force login attempts', async ({ page }) => {
    const creds = invalidLoginData({ email: 'test@test.com', password: 'wrongpass' });
    for (let i = 0; i < 5; i++) {
      await loginPage.goto();
      await loginPage.login(creds);
      await loginPage.expectNetworkError();
    }
    // Optionally, check for lockout message or rate limit
  });
}); 