import { test, expect } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { validLoginData, invalidLoginData, edgeCaseLoginData } from './loginFactory';

// [@data]
test.describe('Login Feature - Data-Driven Scenarios', () => {
  let loginPage: LoginPage;

  const validUsers = [
    validLoginData(),
    validLoginData({ email: 'testuser2@example.com', password: 'password123' }),
    validLoginData({ email: 'demo@demo.com', password: 'demopass' }),
  ];

  const invalidUsers = [
    invalidLoginData(),
    ...edgeCaseLoginData(),
    invalidLoginData({ email: 'notarealuser@example.com', password: 'wrongpass' }),
  ];

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.expectFormVisible();
  });

  for (const creds of validUsers) {
    test(`[@data] should login successfully with valid data: ${creds.email}`, async ({ page }) => {
      const [response] = await Promise.all([
        page.waitForResponse(resp => resp.url().includes('/auth/login') && resp.status() === 200),
        loginPage.login(creds),
      ]);
      expect(response.ok()).toBeTruthy();
      await loginPage.expectSuccess();
    });
  }

  for (const creds of invalidUsers) {
    test(`[@data] should fail to login with invalid data: ${creds.email}`, async ({ page }) => {
      const [response] = await Promise.all([
        page.waitForResponse(resp => resp.url().includes('/auth/login')),
        loginPage.login(creds),
      ]);
      expect(response.status()).not.toBe(200);
      await loginPage.expectValidationError();
    });
  }
}); 