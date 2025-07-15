// Data factory for AddJob tests
export type JobData = {
  position: string;
  company: string;
  location: string;
  status: string;
  type: string;
};

const statuses = ['pending', 'interview', 'declined'];
const types = ['full-time', 'part-time', 'internship'];

export function validJobData(overrides: Partial<JobData> = {}): JobData {
  return {
    position: 'Software Engineer',
    company: 'Acme Corp',
    location: 'Remote',
    status: 'pending',
    type: 'full-time',
    ...overrides,
  };
}

export function invalidJobData(overrides: Partial<JobData> = {}): JobData {
  // By default, missing required fields
  return {
    position: '',
    company: '',
    location: '',
    status: 'pending',
    type: 'full-time',
    ...overrides,
  };
}

export function randomJobData(overrides: Partial<JobData> = {}): JobData {
  const random = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
  return {
    position: `Job ${Math.random().toString(36).substring(2, 8)}`,
    company: `Company ${Math.random().toString(36).substring(2, 8)}`,
    location: ['Remote', 'NY', 'SF', 'London'][Math.floor(Math.random() * 4)],
    status: random(statuses),
    type: random(types),
    ...overrides,
  };
} 