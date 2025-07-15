import { test, expect } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { validLoginData } from './loginFactory';

// [@performance]
test.describe('Login Feature - Performance Scenarios', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.expectFormVisible();
  });

  test('[@performance] login should complete within 2 seconds', async ({ page }) => {
    const creds = validLoginData();
    const start = Date.now();
    const [response] = await Promise.all([
      page.waitForResponse(resp => resp.url().includes('/auth/login') && resp.status() === 200),
      loginPage.login(creds),
    ]);
    const end = Date.now();
    const duration = end - start;
    expect(response.ok()).toBeTruthy();
    await loginPage.expectSuccess();
    expect(duration).toBeLessThan(2000); // 2 seconds
  });
}); 