import { defineConfig, devices } from '@playwright/test';

const testEnv = {
  NODE_ENV: 'test',
  PORT: '3000',
  SESSION_SECRET: 'test-session-secret-for-e2e-tests-only',
  SESSION_DURATION: '3600',
  ZITADEL_DOMAIN: 'https://test.zitadel.cloud',
  ZITADEL_CLIENT_ID: 'test-client-id',
  ZITADEL_CLIENT_SECRET: 'test-client-secret',
  ZITADEL_CALLBACK_URL: 'http://localhost:3000/api/auth/callback',
  ZITADEL_POST_LOGOUT_URL: 'http://localhost:3000/api/auth/logout/callback',
  AUTH_URL: 'http://localhost:3000',
  NEXTAUTH_URL: 'http://localhost:3000',
  NEXTAUTH_SECRET: 'test-nextauth-secret-for-e2e-tests',
};

export default defineConfig({
  testDir: './test',
  outputDir: './build/playwright',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: './build/playwright-report' }],
    ['list'],
    [
      'junit',
      {
        outputFile: './build/reports/junit.xml',
      },
    ],
  ],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
    env: testEnv,
  },
});
