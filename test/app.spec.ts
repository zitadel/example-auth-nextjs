import { test, expect } from '@playwright/test';

test('app returns 200', async ({ page }) => {
  const response = await page.goto('/');
  expect(response?.status()).toBe(200);
});
