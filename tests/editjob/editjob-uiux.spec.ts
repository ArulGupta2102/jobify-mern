import { test } from '../common.setup';
import { userBeforeEach } from '../common.setup';

test.describe('EditJob - UI/UX Scenarios', () => {
  test.beforeEach(async ({ page }) => {
    await userBeforeEach(page);
  });

  test('should display all required fields and labels on edit job form', async ({ page }) => {
    const allJobsBtn = page.getByRole('link', { name: /all jobs/i });
    await allJobsBtn.first().click();
    await page.waitForURL('**/dashboard/all-jobs');
    const editButtons = await page.locator('a.edit-btn').all();
    if ((await editButtons.length) === 0) test.skip();
    await editButtons[0].click();
    await test.expect(page.locator('h4.form-title')).toHaveText(/edit job/i);
    await test.expect(page.locator('input[name="position"]')).toBeVisible();
    await test.expect(page.locator('input[name="company"]')).toBeVisible();
    await test.expect(page.locator('input[name="jobLocation"]')).toBeVisible();
    await test.expect(page.locator('select[name="jobStatus"]')).toBeVisible();
    await test.expect(page.locator('select[name="jobType"]')).toBeVisible();
    await test.expect(page.locator('button[type="submit"]')).toBeVisible();
  });
}); 