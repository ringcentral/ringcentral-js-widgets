import type { Page } from 'puppeteer';

export const checkTheme = async (page: Page) => {
  const darkThemeSelector = '[value="dark"]';
  await page.waitForSelector(darkThemeSelector);
  await page.click(darkThemeSelector);
  const darkThemeCheckbox = await page.waitForSelector(darkThemeSelector);
  const checked = await darkThemeCheckbox!.evaluate(
    (el) => (el as HTMLInputElement).checked,
  );
  expect(checked).toBe(true);
};
