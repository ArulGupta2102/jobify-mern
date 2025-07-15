// Data factory for Login tests
export type LoginData = {
  email: string;
  password: string;
};

const validEmails = [
  'testuser1@example.com',
  'testuser2@example.com',
  'demo@demo.com',
];
const validPasswords = [
  'secret123',
  'password123',
  'demopass',
];

export function validLoginData(overrides: Partial<LoginData> = {}): LoginData {
  return {
    email: validEmails[0],
    password: validPasswords[0],
    ...overrides,
  };
}

export function invalidLoginData(overrides: Partial<LoginData> = {}): LoginData {
  // By default, missing required fields
  return {
    email: '',
    password: '',
    ...overrides,
  };
}

export function randomLoginData(overrides: Partial<LoginData> = {}): LoginData {
  const random = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
  return {
    email: `user${Math.random().toString(36).substring(2, 8)}@example.com`,
    password: Math.random().toString(36).substring(2, 10),
    ...overrides,
  };
}

export function edgeCaseLoginData(overrides: Partial<LoginData> = {}): LoginData[] {
  return [
    { email: ' ', password: ' ' }, // whitespace only
    { email: 'invalid-email', password: 'short' }, // invalid email, short password
    { email: 'a@b.c', password: 'a' }, // minimal valid email, minimal password
    { email: 'test@test.com', password: 'wrongpassword' }, // valid email, wrong password
    { email: '"<script>"@malicious.com', password: 'inject' }, // XSS attempt
    ...((overrides as any) || {}),
  ];
} 