import { test, expect } from '@playwright/test';
import { userBeforeEach } from '../common.setup';

const jobs = [
  { position: 'QA Engineer', company: 'Testers', location: 'Remote', status: 'pending', type: 'full-time' },
  { position: 'DevOps', company: 'CloudOps', location: 'NY', status: 'interview', type: 'part-time' },
];

test.describe('AddJob - Data Driven Scenarios', () => {

  test.beforeEach(async ({ page }) => {
    await userBeforeEach(page);
  });

  for (const job of jobs) {
    test(`should add job: ${job.position} at ${job.company}`, async ({ page }) => {
      await page.getByLabel(/position/i).fill(job.position);
      await page.getByLabel(/company/i).fill(job.company);
      await page.getByLabel(/job location/i).fill(job.location);
      await page.getByLabel(/job status/i).selectOption(job.status);
      await page.getByLabel(/job type/i).selectOption(job.type);
      await page.getByRole('button', { name: /submit/i }).click();
      await expect(page.getByText(/job added successfully/i)).toBeVisible();
    });
  }
}); 