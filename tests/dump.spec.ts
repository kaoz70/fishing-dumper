import { Page, test } from "@playwright/test";
import { randomNumberBetween, times } from "../utils";
import { randomEmail } from "../generators/email";
import { randomPassword } from "../generators/password";

const createEmailAndPassword = () => {
  const email = randomEmail();
  const password = randomPassword(randomNumberBetween(8, 16));
  return { email, password };
};

const tryMultipleLogins = async (page: Page, count: number) => {
  const accounts = times(count, createEmailAndPassword) as {email: string, password: string}[];

  for (const { email, password } of accounts) {
    await page.fill('input._input_1v5ke_18', email);
    await page.fill('input[type="password"]', password);
    await page.click('button[type="submit"]');
  }
}

test('https://steamgift.sbs/', async ({ page }) => {
  await page.goto('https://steamgift.sbs/gift/id=7416904');

  await page.getByRole('link', { name: 'SIGN IN' }).click({
    timeout: 1000,
    force: true,
  });

  await tryMultipleLogins(page, 5);
});
