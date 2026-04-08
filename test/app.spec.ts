import { test, expect } from '@playwright/test';

test('app returns 200', async ({ page }) => {
  const response = await page.goto('/');
  expect(response?.status()).toBe(200);
});

test('GET /api/auth/logout/callback clears authjs.* and logout_state', async ({
  request,
  baseURL,
}) => {
  const res = await request.get(
    `${baseURL}/api/auth/logout/callback?state=teststate123`,
    {
      headers: {
        Cookie: [
          'logout_state=teststate123',
          'authjs.session-token=fakesession',
          'authjs.csrf-token=fakecsrf',
          'authjs.callback-url=http://example.com',
        ].join('; '),
      },
      maxRedirects: 0,
    },
  );

  const status = res.status();
  const location = res.headers()['location'];
  const setCookies = res
    .headersArray()
    .filter((h) => h.name.toLowerCase() === 'set-cookie')
    .map((h) => h.value) as string[];

  expect(status).toBe(302);
  expect(location).toMatch(/\/(auth\/)?logout\/success$/);
  expect(setCookies).toBeDefined();
  expect(Array.isArray(setCookies)).toBe(true);

  const wasCleared = (name: string) =>
    setCookies.some(
      (sc) =>
        sc.startsWith(`${name}=`) &&
        (sc.includes('Max-Age=0') || /Expires=Thu, 01 Jan 1970/i.test(sc)),
    );

  expect(wasCleared('authjs.session-token')).toBe(true);
  expect(wasCleared('authjs.csrf-token')).toBe(true);
  expect(wasCleared('authjs.callback-url')).toBe(true);
  expect(wasCleared('logout_state')).toBe(true);

  const logoutStateCookie = setCookies.find((sc) =>
    sc.startsWith('logout_state='),
  );
  expect(logoutStateCookie).toMatch(/Path=\/api\/auth\/logout\/callback/);
});
