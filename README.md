# Jobify App

## About Jobify
Jobify is a modern job tracking application designed to help users manage their job search efficiently. Built with a Vite-powered React frontend and an Express.js backend, Jobify allows users to add, edit, and track job applications, view statistics, and manage their profiles. The application is structured for scalability and maintainability, making it a great starting point for full-stack development projects.

## Project Structure
- **client/**: Contains the frontend codebase built with React and Vite.
- **controllers/**, **models/**, **routes/**, **middleware/**: Backend logic, models, API routes, and middleware for the Express server.
- **server.js**: Entry point for the backend server.

## Setup Instructions

### Prerequisites
- Node.js (v16 or above recommended)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd mern-jobify-v2-main
```

### 2. Install Backend Dependencies
```bash
npm install
```

### 3. Install Frontend Dependencies
```bash
cd client
npm install
```

### 4. Environment Variables
Create a `.env` file in the root directory for backend configuration (e.g., database URI, JWT secret, etc.). Refer to the codebase for required variables.

### 5. Running the Application
#### Start Backend and Frontend
From the project root:
```bash
npm run dev
```
This will automatically start both frontend and backend simultaneously

The frontend will typically run on [http://localhost:5173](http://localhost:5173) and the backend on [http://localhost:5100](http://localhost:5100) by default.

## Playwright MCP Test Case Generation

This project leverages Playwright MCP (Model-based Code Generation Platform) for automated end-to-end testing. Playwright MCP enables the generation of robust test cases for various user flows, including login, registration, job management, and more.

### How to Generate Test Cases
1. **Test Files Location:**
   - All Playwright test cases are located in the `tests/` directory, organized by feature (e.g., `addjob/`, `editjob/`, `register/`, etc.).

2.a **Running Tests:**
   - Ensure both the backend and frontend servers are running.
   - From the project root, run:
     ```bash
     npx playwright test
     ```
   - This will execute all test cases and generate reports.

2.b **Running a single Test:**
   - Ensure both the backend and frontend servers are running.
   - From the project root, run:
     ```bash
     npx playwright test -g "<Description of test you defines under test.describe()>"
     ```
   - This will execute the particular test case and generate report.
   - View the report by typing:
     ```bash
     npx playwright show-report
     ```

3. **Generating New Test Cases with MCP or CLI:**
   - Playwright MCP can generate new test cases based on user flows or requirements.
   - If using MCP, setup the mcp in mcp.json file of Cursor/Windsurf by refering to MCP documentation. Then prompt the Chatbot with the following sample prompt:
    ```
    Generate Playwright test cases for the "editjob" feature, covering positive, negative, security, performance, UI/UX, data driven scenarios. Follow the project's modular test structure. Create different file for different scenario.

    Steps to follow:
    Utlize the userBeforeEach function to first login to server. You will reach to dashboard after login
    Then click Alljobs in sidebar. 
    On each Job list there should be a Edit Button. Click anyone if  any job exists
    Then a form will open where you can change values
    ```
   - You can also use CLI (refer to Playwright MCP documentation for detailed instructions).
   - Example (if using CLI):
     ```bash
     npx playwright codegen <url>
     ```
     This will initialize the recorder and will generate code on every interaction

   - Generated tests can be placed in the appropriate subdirectory under `tests/`.

4. **Test Reports:**
   - After running tests, a server will be running up at http://localhost:9323 which will include all report of all the test cases.

## Additional Notes
- For any issues or contributions, please open an issue or submit a pull request.
- Make sure to configure your environment variables and database before running the backend server.


