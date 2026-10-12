import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  workers: 1,
  reporter: [['list'], ['json', { outputFile: 'node_modules/.cache/browser-report.json' }]],
  outputDir: 'node_modules/.cache/playwright-results',
  use: {
    baseURL: 'http://127.0.0.1:5188',
    channel: process.env.PLAYWRIGHT_CHANNEL || undefined,
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run dev -- --port 5188 --strictPort',
    url: 'http://127.0.0.1:5188',
    reuseExistingServer: !process.env.CI,
  },
});
