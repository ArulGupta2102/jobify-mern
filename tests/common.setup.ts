
import { test as base } from '@playwright/test';
import * as dotenv from 'dotenv';
import { LoginPage } from './LoginPage';
dotenv.config();

export const test = base.extend({});
export const LOGIN_URL = process.env.LOGIN_URL!;
export const VALID_USERNAME = process.env.VALID_USERNAME!;
export const VALID_PASSWORD = process.env.VALID_PASSWORD!;


// Shared beforeEach for user tests
export async function userBeforeEach(page) {
  await page.goto(LOGIN_URL);
  const loginPage = new LoginPage(page);
  await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
}
