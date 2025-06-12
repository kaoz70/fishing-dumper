import { chromium } from 'playwright-extra';
import stealth from 'puppeteer-extra-plugin-stealth';
import { randomEmail } from "./generators/email";
import { randomPassword } from "./generators/password";
import { randomNumberBetween, times } from "./utils";
import { Page } from "@playwright/test";

// Add the stealth plugin
chromium.use(stealth());


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

async function run() {
  const browser = await chromium.launch({
    headless: false, // Run in headed mode to see what's happening
  });

  const context = await browser.newContext({
    // Mimic a real user's viewport and locale
    viewport: { width: 1920, height: 1080 },
    locale: 'en-US',
  });

  const page = await context.newPage();

  console.log('Navigating to the site...');
  try {
    // Navigate to the target URL
    await page.goto('https://steamgift.sbs/gift/id=7416904', { waitUntil: 'domcontentloaded' });

    await page.getByText('SIGN IN').click({
      timeout: 1000,
      force: true, // Force the click even if the element is not visible
    });

    await tryMultipleLogins(page, 5);

    // Use page.pause() to inspect the browser state before it closes
    await page.pause();

    // await page.click('button[type="submit"]');

  } catch (error) {
    console.error('An error occurred:', error.message);
    console.log('The page may still be blocking the bot.');
  } finally {
    await browser.close();
  }
}

run().then(
  () => console.log('Script completed successfully.'),
).catch(console.error);
