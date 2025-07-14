import { test } from '../common.setup';
import { userBeforeEach } from '../common.setup';

test.describe('EditJob - Security Scenarios', () => {
  test.beforeEach(async ({ page }) => {
    await userBeforeEach(page);
  });

  test('should not allow SQL injection in fields', async ({ page }) => {
    const allJobsBtn = page.getByRole('link', { name: /all jobs/i });
    await allJobsBtn.first().click();
    await page.waitForURL('**/dashboard/all-jobs');
    const editButtons = await page.locator('a.edit-btn').all();
    if ((await editButtons.length) === 0) test.skip();
    await editButtons[0].click();
    await page.fill('input[name="position"]', "' OR 1=1; --");
    await page.click('button[type="submit"]');
    await test.expect(page.locator('.Toastify__toast--error')).toBeVisible();
  });

  test('should not allow XSS in fields', async ({ page }) => {
    const allJobsBtn = page.getByRole('link', { name: /all jobs/i });
    await allJobsBtn.first().click();
    await page.waitForURL('**/dashboard/all-jobs');
    const editButtons = await page.locator('a.edit-btn').all();
    if ((await editButtons.length) === 0) test.skip();
    await editButtons[0].click();
    await page.fill('input[name="position"]', '<script>alert(1)</script>');
    await page.click('button[type="submit"]');
    await test.expect(page.locator('.Toastify__toast--error')).toBeVisible();
  });
}); 