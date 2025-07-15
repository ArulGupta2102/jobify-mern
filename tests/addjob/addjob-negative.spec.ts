import { test } from '@playwright/test';
import { AddJobPage } from './AddJobPage';

test.describe('AddJob - Negative Scenarios', () => {
  test('should show validation errors for empty required fields', async ({ page }) => {
    const addJob = new AddJobPage(page);
    await addJob.goto();
    await addJob.submit();
    await addJob.expectValidationError();
  });
}); 