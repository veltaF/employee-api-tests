import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './test',
  timeout: 70000,
  workers: 1,
  reporter: [
    ['list'],                
    ['html', { outputFolder: 'playwright-report', open: 'never' }] 
  ],
};

export default config;
