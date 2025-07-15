import { test } from '@playwright/test';
import { AddJobPage } from './AddJobPage';
import { randomJobData } from './addJobFactory';

test.describe('AddJob - Positive Scenarios', () => {
  test('should add a job with random valid data and see success', async ({ page }) => {
    const addJob = new AddJobPage(page);
    await addJob.goto();
    // Use the data factory to generate random valid job data
    const job = randomJobData();
    await addJob.fillJob(job);
    await addJob.submit();
    await addJob.expectSuccess();
    // TODO: Clean up created job if API allows
  });
}); 