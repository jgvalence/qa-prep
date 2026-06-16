import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  baseURL: 'http://localhost:5173',
  use: {
    // Keep traces and screenshots only when a test fails
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  // Start both servers before running tests
  webServer: [
    {
      command: 'npm run dev:back',
      url: 'http://localhost:3000',
      reuseExistingServer: true,
    },
    {
      command: 'npm run dev:front',
      url: 'http://localhost:5173',
      reuseExistingServer: true,
    },
  ],
})
