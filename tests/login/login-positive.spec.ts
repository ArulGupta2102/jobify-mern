import { test, expect } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { validLoginData } from './loginFactory';

// [@smoke] [@regression]
test.describe('Login Feature - Positive Scenarios', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.expectFormVisible();
  });

  test('[@smoke] should login successfully with valid credentials', async ({ page }) => {
    const creds = validLoginData();
    // Intercept network request for assertion
    const [response] = await Promise.all([
      page.waitForResponse(resp => resp.url().includes('/auth/login') && resp.status() === 200),
      loginPage.login(creds),
    ]);
    expect(response.ok()).toBeTruthy();
    await loginPage.expectSuccess();
  });

  test('[@regression] should login as demo user via demo button', async ({ page }) => {
    // Intercept network request for assertion
    const [response] = await Promise.all([
      page.waitForResponse(resp => resp.url().includes('/auth/login') && resp.status() === 200),
      loginPage.loginDemoUser(),
    ]);
    expect(response.ok()).toBeTruthy();
    await loginPage.expectSuccess();
  });
}); 