# Playwright MCP Test Generation Guide

This guide will help you get started with using Playwright MCP (Model-Controlled Playwright) to generate high-quality, maintainable test cases for your project. It is designed for users who are new to Playwright MCP and want to automate the creation of robust test suites.

---

## 1. What is Playwright MCP?

Playwright MCP is an AI-powered tool that generates Playwright test cases based on natural language prompts. It follows best practices such as the Page Object Model (POM), modular test structure, and uses resilient selectors for stable and accessible tests.

---

## 2. How to Use Playwright MCP

### **Step 1: Prepare Your Prompt**
Use the following template prompt to instruct Playwright MCP to generate test cases for a specific feature. Replace `"login"` with your target feature as needed.

```
Generate Playwright test cases for the {target} feature, covering positive, negative, security, performance, UI/UX, and data-driven scenarios.
Follow the project’s modular test structure and best practices as outlined in the README:

Use the Page Object Model for all UI interactions.
Utilize any existing Page Object Model for recurring UI interactions (e.g. for edit user feature, utilize already made login Page object model for login instead of regenerating whole code)
Prefer resilient selectors (getByRole, getByLabel, getByTestId) for stability and accessibility.
Use shared helpers and test data factories for setup and data management. No hard coded data for testing.
Assert both UI and network responses where relevant.
Ensure comprehensive coverage of edge cases.
Place the tests in the appropriate subdirectory.
Use clear, descriptive test names and comments.
Use tags (e.g., [@smoke], [@regression], [@edge], [@security], [@ui], [@performance], [@data]) in test titles for filtering and reporting.
Clean up any test data after tests run.
Include accessibility checks if applicable.

{Mention what data is valid data for positive test cases here}

```

#### **Customizable Fields:**
- **Feature Name:** Change `{target}` to any feature you want to generate tests for (e.g., "register", "add job", "edit profile").
- **Valid Data:** Replace `{Mention what data is valid data for positive test cases here}` with a description of what constitutes valid data for your feature (see section 5 below).
- **Test Types:** You can specify which types of tests to generate (e.g., omit performance or UI/UX if not needed).

---

## 3. Expected Output

- **Test Files:** Playwright MCP will generate test files in the appropriate subdirectory (e.g., `tests/login/`, `tests/addjob/`).
- **Test Structure:** Each file will follow the modular structure, using the Page Object Model and shared helpers/factories.
- **Test Coverage:** The output will include positive, negative, security, performance, UI/UX, and data-driven scenarios, each tagged for easy filtering.
- **Comments & Naming:** Tests will have clear, descriptive names and comments explaining their purpose.
- **Selectors:** Resilient selectors (getByRole, getByLabel, getByTestId) will be used for stability and accessibility.

---

## 4. Important Notes & Best Practices

- **Reuse Page Objects:** Always use existing Page Object Models for recurring UI interactions to avoid code duplication.
- **No Hardcoded Data:** Use shared helpers and test data factories for all test data. Avoid hardcoding values in your tests.
- **Assertions:** Assert both UI changes and network responses where applicable.
- **Tags:** Use tags like [@smoke], [@regression], [@edge], [@security], [@ui], [@performance], [@data] in test titles for filtering and reporting.
- **Accessibility:** Include accessibility checks (e.g., using `expect(page).toHaveAccessibleName()`) if relevant.
- **Test Data Cleanup:** Ensure any data created during tests is cleaned up after the test run.
- **Edge Cases:** Cover edge cases and error scenarios, not just the happy path.

---

## 5. What is Valid Data for Positive Test Cases?

Example
For the **login** feature, valid data for positive test cases typically includes:
- A registered user email that exists in the system.
- The correct password associated with that email.
- The account is active and not locked or disabled.
- The email and password fields are filled in with valid formats (e.g., a properly formatted email address).

**Example:**
- Email: `user@example.com` (already registered)
- Password: `ValidPassword123!`

> **Note:** For other features, define what constitutes valid data in the context of that feature (e.g., for registration, valid data might be a unique email, strong password, and required profile fields filled).

---

## 6. What to Watch Out For

- **Selector Stability:** Avoid brittle selectors (e.g., based on CSS classes or text that may change).
- **Test Data Isolation:** Ensure tests do not depend on each other and can run independently.
- **Environment:** Make sure your test environment is set up with the necessary data and configurations.
- **Review Output:** Always review generated tests for accuracy and completeness before running them in CI/CD.

---

## 7. Example Prompt (Copy & Use)

```
Generate Playwright test cases for the "login" feature, covering positive, negative, security, performance, UI/UX, and data-driven scenarios.
Follow the project’s modular test structure and best practices as mentioned below:

Generate the Page Object Model for all UI interactions.
Utilize any existing Page Object Model for recurring UI interactions (e.g. for edit user feature, utilize already made login Page object model for login instead of regenerating whole code if it exists.)
Prefer resilient selectors (getByRole, getByLabel, getByTestId) for stability and accessibility.
Use shared helpers and test data factories for setup and data management. No hard coded data for testing.
Assert both UI and network responses where relevant.
Ensure comprehensive coverage of edge cases.
Place the tests in the appropriate subdirectory.
Use clear, descriptive test names and comments.
Use tags (e.g., [@smoke], [@regression], [@edge], [@security], [@ui], [@performance], [@data]) in test titles for filtering and reporting.
Clean up any test data after tests run.
Include accessibility checks if applicable.

Here is the valid data for that should be added in data factory file: Email: john@gmail.com. Password: secret123
```

---
