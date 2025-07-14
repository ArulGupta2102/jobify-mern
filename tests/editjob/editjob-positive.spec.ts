import { test } from '../common.setup';
import { userBeforeEach } from '../common.setup';

test.describe('EditJob - Positive Scenarios', () => {
  test.beforeEach(async ({ page }) => {
    await userBeforeEach(page);
  });

  test('should edit a job with valid data', async ({ page }) => {
    // Try to find and click the All Jobs button in the sidebar (case-insensitive)
    const allJobsBtn = page.getByRole('link', { name: /all jobs/i });
    await allJobsBtn.first().click();
    await page.waitForURL('**/dashboard/all-jobs');
    const editButtons = await page.locator('a.edit-btn').all();
    if ((await editButtons.length) === 0) test.skip();
    await editButtons[0].click();
    await test.expect(page.locator('h4.form-title')).toHaveText(/edit job/i);
    await page.fill('input[name="position"]', 'Edited Position');
    await page.fill('input[name="company"]', 'Edited Company');
    await page.fill('input[name="jobLocation"]', 'Edited Location');
    await page.selectOption('select[name="jobStatus"]', 'interview');
    await page.selectOption('select[name="jobType"]', 'part-time');
    await page.click('button[type="submit"]');
    await test.expect(page.getByText(/job edited successfully/i)).toBeVisible();
    await test.expect(page).toHaveURL(/all-jobs/);
  });
}); 