import { test, expect } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { invalidLoginData, edgeCaseLoginData } from './loginFactory';

// [@edge] [@regression]
test.describe('Login Feature - Negative & Edge Scenarios', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.expectFormVisible();
  });

  test('[@edge] should show validation error for missing fields', async () => {
    await loginPage.login(invalidLoginData());
    await loginPage.expectValidationError();
  });

  test('[@edge] should show error for invalid credentials', async ({ page }) => {
    const creds = invalidLoginData({ email: 'notarealuser@example.com', password: 'wrongpass' });
    const [response] = await Promise.all([
      page.waitForResponse(resp => resp.url().includes('/auth/login') && resp.status() !== 200),
      loginPage.login(creds),
    ]);
    expect(response.ok()).toBeFalsy();
    await loginPage.expectNetworkError();
  });

  test('[@regression] should handle edge case inputs', async ({ page }) => {
    for (const creds of edgeCaseLoginData()) {
      await loginPage.goto();
      await loginPage.login(creds);
      await loginPage.expectValidationError();
    }
  });
}); 