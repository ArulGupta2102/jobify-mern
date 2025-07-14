import { test } from '../common.setup';
import { userBeforeEach } from '../common.setup';

test.describe('EditJob - Negative Scenarios', () => {
  test.beforeEach(async ({ page }) => {
    await userBeforeEach(page);
  });

  test('should show error when required fields are empty', async ({ page }) => {
    const allJobsBtn = page.getByRole('link', { name: /all jobs/i });
    await allJobsBtn.first().click();
    await page.waitForURL('**/dashboard/all-jobs');
    const editButtons = await page.locator('a.edit-btn').all();
    if ((await editButtons.length) === 0) test.skip();
    await editButtons[0].click();
    await test.expect(page.locator('h4.form-title')).toHaveText(/edit job/i);
    await page.fill('input[name="position"]', '');
    await page.fill('input[name="company"]', '');
    await page.click('button[type="submit"]');
    await test.expect(page.locator('.Toastify__toast--error')).toBeVisible();
  });
}); 