import { test } from '@playwright/test';
import { AddJobPage } from './AddJobPage';

const jobs = [
  { position: 'QA Engineer', company: 'Testers', location: 'Remote', status: 'pending', type: 'full-time' },
  { position: 'DevOps', company: 'CloudOps', location: 'NY', status: 'interview', type: 'part-time' },
];

test.describe('AddJob - Data Driven Scenarios', () => {
  for (const job of jobs) {
    test(`should add job: ${job.position} at ${job.company}`, async ({ page }) => {
      const addJob = new AddJobPage(page);
      await addJob.goto();
      await addJob.fillJob(job);
      await addJob.submit();
      await addJob.expectSuccess();
    });
  }
}); 