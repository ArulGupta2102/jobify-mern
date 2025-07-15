import { test, expect } from '@playwright/test';
import { LoginPage } from './LoginPage';

// [@ui]
test.describe('Login Feature - UI/UX & Accessibility Scenarios', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.expectFormVisible();
  });

  test('[@ui] login form should be accessible and have correct labels', async () => {
    await loginPage.checkAccessibility();
  });

  test('[@ui] login form should have correct focus order', async ({ page }) => {
    await loginPage.emailInput.focus();
    let activeId = await page.evaluate(() => document.activeElement?.id);
    expect(activeId).toBe('email');
    await page.keyboard.press('Tab');
    activeId = await page.evaluate(() => document.activeElement?.id);
    expect(activeId).toBe('password');
    await page.keyboard.press('Tab');
    const activeType = await page.evaluate(() => document.activeElement?.getAttribute('type'));
    expect(activeType).toBe('submit');
  });

  test('[@ui] error messages should be visible and clear', async () => {
    await loginPage.login({ email: '', password: '' });
    await loginPage.expectValidationError();
  });
}); 