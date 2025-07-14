import { test } from '../common.setup';
import { userBeforeEach } from '../common.setup';

const editData = [
  { position: 'QA Lead', company: 'Testers', location: 'Remote', status: 'pending', type: 'full-time' },
  { position: 'DevOps', company: 'CloudOps', location: 'NY', status: 'interview', type: 'part-time' },
];

test.describe('EditJob - Data Driven Scenarios', () => {
  test.beforeEach(async ({ page }) => {
    await userBeforeEach(page);
  });

  for (const data of editData) {
    test(`should edit job to ${data.position} at ${data.company}`, async ({ page }) => {
      const allJobsBtn = page.getByRole('link', { name: /all jobs/i });
      await allJobsBtn.first().click();
      await page.waitForURL('**/dashboard/all-jobs');
      const editButtons = await page.locator('a.edit-btn').all();
      if ((await editButtons.length) === 0) test.skip();
      await editButtons[0].click();
      await test.expect(page.locator('h4.form-title')).toHaveText(/edit job/i);
      await page.fill('input[name="position"]', data.position);
      await page.fill('input[name="company"]', data.company);
      await page.fill('input[name="jobLocation"]', data.location);
      await page.selectOption('select[name="jobStatus"]', data.status);
      await page.selectOption('select[name="jobType"]', data.type);
      await page.click('button[type="submit"]');
      await test.expect(page.getByText(/job edited successfully/i)).toBeVisible();
      await test.expect(page).toHaveURL(/all-jobs/);
    });
  }
}); 