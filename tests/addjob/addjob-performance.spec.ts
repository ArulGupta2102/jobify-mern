import { test } from '@playwright/test';
import { AddJobPage } from './AddJobPage';

test.describe('AddJob - Performance Scenarios', () => {
  test('should add a job within 2 seconds', async ({ page }) => {
    const addJob = new AddJobPage(page);
    await addJob.goto();
    await addJob.fillJob({
      position: 'Performance Test',
      company: 'Speedy Inc',
      location: 'Remote',
      status: 'pending',
      type: 'full-time',
    });
    const start = Date.now();
    await addJob.submit();
    await addJob.expectSuccess();
    const duration = Date.now() - start;
    test.expect(duration).toBeLessThan(2000);
  });
}); 