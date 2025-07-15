import { test, expect } from '@playwright/test';
import { AddJobPage } from './AddJobPage';

test.describe('AddJob - UI/UX Scenarios', () => {
  test('should have all required fields and submit button visible and accessible', async ({ page }) => {
    const addJob = new AddJobPage(page);
    await addJob.goto();
    await addJob.checkAllFieldsVisible();
    // Accessibility check (axe-core or built-in)
    await expect(page).toPassA11y(); // If using @playwright/test-accessibility
  });
}); 