import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const width of [1440, 768, 600, 375, 320]) {
  test(`all pages render without overflow or broken assets at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
    for (const route of ['/', '/stories', '/features', '/pricing']) {
      await page.goto(route);
      await page.evaluate(async () => {
        await document.fonts.ready;
        // Load offscreen assets in order to avoid a burst of image decodes on small machines.
        for (const image of document.images) {
          image.loading = 'eager';
          await image.decode().catch(() => {});
        }
      });
      await expect(page.locator('h1')).toHaveCount(1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      expect(await page.evaluate(() => Array.from(document.images).filter(image => !image.complete || image.naturalWidth === 0).map(image => image.src))).toEqual([]);
      await page.screenshot({ path: `node_modules/.cache/screenshots/${route === '/' ? 'home' : route.slice(1)}-${width}.png`, fullPage: true });
    }
    expect(errors).toEqual([]);
  });
}

test('navigation, browser history and story links follow the challenge', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Stories', exact: true }).click();
  await expect(page).toHaveURL('/stories');
  await expect(page.getByRole('link', { name: /^Read .* by / })).toHaveCount(16);
  await page.getByRole('link', { name: 'Read The Mountains by John Appleseed' }).click();
  await expect(page).toHaveURL('/stories');
  await page.goBack();
  await expect(page).toHaveURL('/');
  await page.getByRole('link', { name: 'View the stories' }).first().click();
  await expect(page).toHaveURL('/stories');
});

test('yearly switch calculates all plans and works with the keyboard', async ({ page }) => {
  await page.goto('/pricing');
  const plans = page.getByRole('region', { name: 'Subscription plans' });
  await expect(plans).toContainText('$19.00');
  const billing = page.getByRole('switch', { name: 'Yearly billing' });
  await billing.focus();
  await page.keyboard.press('Space');
  await expect(billing).toBeChecked();
  for (const amount of ['$190.00', '$390.00', '$990.00']) await expect(plans).toContainText(amount);
  await page.keyboard.press('Enter');
  await expect(billing).not.toBeChecked();
  for (const amount of ['$19.00', '$39.00', '$99.00']) await expect(plans).toContainText(amount);
  await page.getByRole('link', { name: 'Pick Pro plan' }).click();
  await expect(page).toHaveURL('/pricing');
});

test('mobile menu dismisses with Escape, outside click and navigation', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Open navigation', exact: true });
  await toggle.click();
  await expect(page.getByRole('button', { name: 'Close navigation', exact: true }).first()).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('main')).toHaveAttribute('inert', '');
  await page.keyboard.press('Escape');
  await expect(toggle).toBeFocused();
  await expect(page.locator('main')).not.toHaveAttribute('inert', '');
  await toggle.click();
  await page.getByRole('button', { name: 'Close navigation', exact: true }).last().click({ position: { x: 10, y: 650 } });
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();
  await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Pricing', exact: true }).click();
  await expect(page).toHaveURL('/pricing');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('main')).toBeFocused();
  await toggle.click();
  await page.setViewportSize({ width: 1024, height: 900 });
  await expect(page.locator('main')).not.toHaveAttribute('inert', '');
});

for (const route of ['/', '/stories', '/features', '/pricing']) {
  test(`no automated accessibility violations on ${route}`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(results.violations).toEqual([]);
  });
}

test('mobile menu and comparison remain accessible', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/pricing');
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
  await page.getByRole('button', { name: 'Open navigation' }).click();
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
});
