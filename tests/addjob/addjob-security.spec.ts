import { test } from '@playwright/test';
import { AddJobPage } from './AddJobPage';

test.describe('AddJob - Security Scenarios', () => {
  test('should not allow script injection in position field', async ({ page }) => {
    const addJob = new AddJobPage(page);
    await addJob.goto();
    await addJob.fillJob({
      position: '<script>alert(1)</script>',
      company: 'Acme Corp',
      location: 'Remote',
      status: 'pending',
      type: 'full-time',
    });
    await addJob.submit();
    await addJob.expectInjectionError();
  });
}); 